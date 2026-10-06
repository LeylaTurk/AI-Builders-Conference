#!/usr/bin/env python3
"""Assemble reviewed local copy without rewriting it. Run after editorial review."""
from pathlib import Path
import hashlib
import importlib.util
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SLUGS = ['water', 'jobs', 'energy-climate', 'creativity', 'privacy', 'existential-risk']
NAMES = ['Water', 'Jobs', 'Energy and climate', 'Creativity', 'Privacy', 'Existential risk']
QUESTIONS = ['Is AI draining our water supplies?', 'Will AI replace my job?',
             'How bad is AI for the environment?', 'Is AI copying other people’s work?',
             'What happens to the information I give AI?', 'Will AI kill us all?']
FIELDS = dict(zip('ABCDEFG', ['claimContextMarkdown', 'shortAnswerMarkdown',
    'meaningMarkdown', 'evidenceMarkdown', 'scoreExplanationMarkdown',
    'actionsMarkdown', 'sourcesAndReviewMarkdown']))
REVIEWED = 'AI evidence review completed; human editorial review pending'
spec = importlib.util.spec_from_file_location('claim_score', ROOT/'scoring/claim-score.py')
calculator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(calculator)

def sections(text):
    marks = list(re.finditer(r'^##\s+([A-G])[.)]\s+(.+)$', text, re.M))
    if [m[1] for m in marks] != list('ABCDEFG'):
        raise ValueError('Expected one A–G heading each, in order')
    return {FIELDS[m[1]]: text[m.end():marks[i+1].start() if i+1 < len(marks) else len(text)].strip()
            for i, m in enumerate(marks)}

def plain_words(markdown):
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', markdown)
    text = re.sub(r'<[^>]*>', '', text)
    return len(re.findall(r"\b[\w]+(?:[’'–-][\w]+)*\b", text))

def links(text):
    seen, found = set(), []
    for title, url in re.findall(r'\[([^\]]+)\]\((https?://[^\s)]+)\)', text):
        if url not in seen:
            seen.add(url)
            found.append({'title': title, 'url': url})
    return found

def main():
    editorial = json.loads((ROOT/'handoff/editorial-metadata.json').read_text())
    related = json.loads((ROOT/'design/related-stories.json').read_text())
    topics, validations, hashes = [], [], {}
    for slug, name, question in zip(SLUGS, NAMES, QUESTIONS):
        path = ROOT/f'explainers/{slug}.md'
        text = path.read_text()
        record_path = ROOT/f'research/{slug}-score.json'
        record = json.loads(record_path.read_text())
        if record['review_status'] != REVIEWED:
            raise ValueError(f'{slug}: independent AI review not recorded complete')
        parts = sections(text)
        if 'AI research draft; independent AI review' in text:
            raise ValueError(f'{slug}: stale public review status')
        if record['claim'] not in parts['claimContextMarkdown']:
            raise ValueError(f'{slug}: exact scored claim not present in section A')
        hype = calculator.score(record)['hype']
        meta = editorial['topics'][slug]
        for field in ['keyQualification', 'publicEvidenceLimitations', 'aiReviewDate']:
            if not meta.get(field):
                raise ValueError(f'{slug}: missing editorial field {field}')
        item = {
            'slug': slug, 'route': f'/claims/{slug}', 'topic': name,
            'readerQuestion': question, 'claim': record['claim'],
            'claimExampleCitations': record['occurrence_urls'],
            'scope': record['scope'], 'timeHorizon': record['time_horizon'],
            'keyQualification': meta['keyQualification'], **parts,
            'hype': {**hype, 'displayPrefix': 'Proposed claim hype',
                     'checklist': record['hype_checks']},
            'evidenceGaps': {'displayMode': 'qualitative', 'score': None,
                'limitations': meta['publicEvidenceLimitations']},
            'sourceLinks': links(text),
            'researchCutoff': record['research_cutoff'],
            'aiEvidenceReview': {'status': 'completed', 'date': meta['aiReviewDate']},
            'humanEditorialReview': {'status': 'pending', 'reviewer': None, 'date': None},
            'reviewStatusText': REVIEWED,
            'remainingLimitations': record['evidence_limitations'],
            'relatedStoryCandidates': related['topics'].get(slug, []),
            'websiteCopyMarkdown': text,
        }
        topics.append(item)
        counts = {field: plain_words(value) for field, value in parts.items()}
        copy_words = sum(counts[k] for k in list(FIELDS.values())[:6])
        action_count = len(re.findall(r'^-\s', parts['actionsMarkdown'], re.M))
        if not 400 <= copy_words <= 650:
            raise ValueError(f'{slug}: website copy outside 400–650 words: {copy_words}')
        if not 50 <= counts['shortAnswerMarkdown'] <= 80:
            raise ValueError(f'{slug}: short answer outside 50–80 words')
        if not 3 <= action_count <= 5:
            raise ValueError(f'{slug}: expected 3–5 actions')
        for field in list(FIELDS.values())[:6]:
            if not links(parts[field]):
                raise ValueError(f'{slug}: no external inline citation in {field}')
        if hype['level'] is not None and f"{hype['level']}/5" not in parts['scoreExplanationMarkdown']:
            raise ValueError(f'{slug}: displayed and calculated score disagree')
        validations.append({'topic': slug,
            'wordsAThroughF': copy_words,
            'shortAnswerWords': counts['shortAnswerMarkdown'],
            'actions': action_count,
            'externalInlineLinksInEachRequiredSection': True,
            'inlineSourceCount': len(item['sourceLinks']),
            'score': hype['level'], 'label': hype['label'],
            'exactClaimMatch': True, 'sourceCopyUnchanged': True})
        for p in [path, record_path]:
            hashes[str(p.relative_to(ROOT))] = hashlib.sha256(p.read_bytes()).hexdigest()
    content = {
        'contentVersion': editorial['contentVersion'], 'language': 'en-US',
        'audience': 'Nontechnical adults in the United States',
        'section': editorial['section'],
        'editorialInstructions': [
            'Render the supplied content and citations verbatim. Do not generate factual copy.',
            'The claim is under examination, not an endorsement.',
            'Keep the exact claim, key qualification, proposed score and rationale together.',
            'Qualitative evidence limitations are separate from hype and potential harm.',
            'Human review remains pending; never infer Reviewed by Leyla.',
            'Dates are stored editorial facts; deployment must not change them.',
            'Related stories provide context; they are not the research evidence base.'
        ],
        'methodology': {
            'version': calculator.VERSION,
            'rubricMarkdown': (ROOT/'scoring/shared-rubric.md').read_text(),
            'repositoryAuditMarkdown': (ROOT/'scoring/repository-audit.md').read_text(),
            'repository': json.loads((ROOT/'scoring/repository-version.json').read_text())
        },
        'topics': topics, 'sourceFileSha256': hashes,
    }
    (ROOT/'handoff/claims-content.json').write_text(json.dumps(content, ensure_ascii=False, indent=2)+'\n')
    companion = '# Exact website copy: AI claims explained\n\nHuman editorial review pending. This readable companion preserves the six explainer files; upload claims-content.json with the Lovable prompt.\n\n'
    companion += '\n\n---\n\n'.join(t['websiteCopyMarkdown'].strip() for t in topics)+'\n'
    (ROOT/'handoff/claims-content.md').write_text(companion)
    (ROOT/'review/package-validation.json').write_text(json.dumps({'topics': validations, 'sourceFileSha256': hashes}, indent=2)+'\n')
    print(json.dumps(validations, indent=2))

if __name__ == '__main__':
    main()
