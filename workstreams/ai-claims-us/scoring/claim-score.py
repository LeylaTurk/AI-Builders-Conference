#!/usr/bin/env python3
"""Mechanical claims-us-1.0 calculator. Does not assess source quality.
Usage: python3 claim-score.py scoring-record.json
Input needs claim and hype_checks; evidence_checks is optional.
Each check is {"answer": "Y|N|NA|NC", ...evidence metadata...}.
"""
import json
import math
import sys

VERSION = "claims-us-1.0"
LABELS = {1: "Grounded", 2: "A little spicy", 3: "Turning it up",
          4: "Overheated", 5: "Off the charts"}
HYPE = {"P": ["P1", "P2", "P3"], "W": ["W1", "W2"]}
GAPS = {"T": ["T1", "T2"], "S": ["S1", "S2", "S3"], "C": ["C1", "C2"]}
ANSWERS = {"Y", "N", "NA", "NC"}

def section(checks, codes):
    values = [checks[code]["answer"] for code in codes]
    yes, no = values.count("Y"), values.count("N")
    if yes + no < 2:
        return {"out": True, "why": "not checked" if "NC" in values else "not applicable"}
    fraction = yes / (yes + no)
    level = 1 if fraction == 1 else 2 if fraction >= .75 else 3 if fraction >= .5 else 4 if fraction >= .25 else 5
    return {"out": False, "level": level, "met": yes, "scored": yes + no}

def rounded_average(levels):
    average = sum(levels) / len(levels)
    floor = math.floor(average)
    return floor if abs(average - floor - .5) < 1e-9 else math.floor(average + .5)

def calculate(checks, sections, kind):
    expected = {code for codes in sections.values() for code in codes}
    if set(checks) != expected:
        raise ValueError(f"{kind}: expected exactly {sorted(expected)}")
    for code, check in checks.items():
        if not isinstance(check, dict) or check.get("answer") not in ANSWERS:
            raise ValueError(f"{kind}: invalid/missing answer for {code}")
    results = {name: section(checks, codes) for name, codes in sections.items()}
    unchecked = [code for code in expected if checks[code]["answer"] == "NC"]
    scoreable = [part["level"] for part in results.values() if not part["out"]]
    if unchecked:
        return {"status": "not_yet_assessable" if kind == "hype" else "partly_checked",
                "level": None, "label": "Not yet assessable" if kind == "hype" else "Partly checked",
                "not_checked": sorted(unchecked), "sections": results, "rule_applied": False}
    if len(scoreable) < 2:
        return {"status": "not_yet_assessable", "level": None,
                "label": "Not yet assessable", "not_checked": [],
                "sections": results, "rule_applied": False}
    level = rounded_average(scoreable)
    floor = kind == "evidence_gaps" and not results["S"]["out"] and results["S"]["level"] == 5 and level < 4
    if floor:
        level = 4
    return {"status": "proposed", "level": level,
            "label": LABELS[level] if kind == "hype" else f"Evidence gaps: {level}/5",
            "not_checked": [], "sections": results, "rule_applied": floor}

def score(record):
    if not isinstance(record.get("claim"), str) or not record["claim"].strip():
        raise ValueError("Exact nonempty claim required")
    result = {"rubric_version": VERSION, "claim": record["claim"],
              "hype": calculate(record["hype_checks"], HYPE, "hype")}
    if "evidence_checks" in record:
        result["evidence_gaps"] = calculate(record["evidence_checks"], GAPS, "evidence_gaps")
    return result

def self_test():
    from itertools import product
    def checks(values, codes):
        return dict(zip(codes, ({"answer": value} for value in values)))
    hype_codes = ["P1", "P2", "P3", "W1", "W2"]
    assert calculate(checks(["Y"] * 5, hype_codes), HYPE, "hype")["level"] == 1
    assert calculate(checks(["N"] * 5, hype_codes), HYPE, "hype")["level"] == 5
    assert calculate(checks(["Y", "N", "Y", "Y", "Y"], hype_codes), HYPE, "hype")["level"] == 2
    assert rounded_average([3, 4]) == 3
    assert rounded_average([4, 5]) == 4
    assert calculate(checks(["NC", "Y", "Y", "Y", "Y"], hype_codes), HYPE, "hype")["level"] is None
    assert calculate(checks(["NA", "NA", "Y", "Y", "Y"], hype_codes), HYPE, "hype")["level"] is None
    gaps_codes = ["T1", "T2", "S1", "S2", "S3", "C1", "C2"]
    result = calculate(checks(["Y", "Y", "N", "N", "N", "Y", "Y"], gaps_codes), GAPS, "evidence_gaps")
    assert result["level"] == 4 and result["rule_applied"]
    # Exhaustive answer combinations: NC never yields a public score.
    for values in product(sorted(ANSWERS), repeat=5):
        result = calculate(checks(values, hype_codes), HYPE, "hype")
        assert "NC" not in values or result["level"] is None
        assert result["level"] is None or 1 <= result["level"] <= 5
    return "Passed: anchors, example, tie-down, minimum coverage, NC suppression, evidence floor, all 1,024 hype answer combinations."

if __name__ == "__main__":
    try:
        if len(sys.argv) == 2 and sys.argv[1] == "--self-test":
            print(self_test())
        elif len(sys.argv) == 2:
            with open(sys.argv[1], encoding="utf-8") as source:
                print(json.dumps(score(json.load(source)), ensure_ascii=False, indent=2))
        else:
            raise ValueError("Usage: python3 claim-score.py RECORD.json | --self-test")
    except (ValueError, KeyError, OSError, TypeError) as error:
        print(f"Scoring error: {error}", file=sys.stderr)
        sys.exit(1)

