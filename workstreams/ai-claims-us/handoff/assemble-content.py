#!/usr/bin/env python3
"""Assemble reviewed local copy without rewriting it. Run after editorial review."""
from pathlib import Path
import hashlib
import importlib.util
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SLUGS = ['water', 'jobs', 'existential-risk', 'energy-climate', 'creativity', 'privacy']
NAMES = ['Water', 'Jobs', 'Existential risk', 'Energy and climate', 'Creativity', 'Privacy']
FIELDS = dict(zip('ABCDEFG', ['claimContextMarkdown', 'shortAnswerMarkdown',
    'meaningMarkdown', 'evidenceMarkdown', 'scoreExplanationMarkdown',
    'actionsMarkdown', 'sourcesAndReviewMarkdown']))
REVIEWED = 'AI evidence review completed; human editorial review pending'
PENDING_LABEL = 'AI rating, not yet reviewed'
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

def check_layer(slug, layer, head, record, text):
    if '?' in layer['headline']:
        raise ValueError(f'{slug}: headline must be a statement, not a question')
    if layer['headline'] not in text.splitlines()[0]:
        raise ValueError(f'{slug}: explainer title does not use the headline')
    if layer['keyWord']['word'] not in layer['headline']:
        raise ValueError(f'{slug}: key word missing from headline')
    if layer['headline'] != head['claim'] or head['claim'] not in text.split('## B.')[0]:
        raise ValueError(f'{slug}: headline must match the headline score record and section A')
    kinds = {v['scoredAs']: v['text'] for v in layer['claimDial'] if v['scoredAs'] in ('headline', 'careful')}
    if kinds != {'headline': layer['headline'], 'careful': layer['carefulHeadline']}:
        raise ValueError(f'{slug}: claim dial needs the headline and careful versions marked as scored')
    expected = {'headline': calculator.score(head)['hype']['level'], 'careful': calculator.score(record)['hype']['level']}
    for v in layer['claimDial']:
        got = expected.get(v['scoredAs']) or calculator.score({'claim': v['text'], 'hype_checks': v['hype_checks']})['hype']['level']
        if v['level'] != got:
            raise ValueError(f'{slug}: dial version scored {got}, labelled {v["level"]}: {v["text"]}')
    if [v['level'] for v in layer['claimDial']] != [1, 2, 3, 4, 5]:
        raise ValueError(f'{slug}: the dial needs one version at each hype level, in order')
    if not 3 <= len(layer['finePrint']) <= 5 or len(layer['quiz']) != 3:
        raise ValueError(f'{slug}: expected 3–5 fine-print items and 3 quiz items')
    if any(not f['label'].startswith('Fact: ') for f in layer['finePrint']):
        raise ValueError(f'{slug}: each fact label must start with "Fact: "')
    if any(q['answer'] not in ('True', 'False') for q in layer['quiz']):
        raise ValueError(f'{slug}: quiz answers must be True or False')

def check_cards(slug, cards):
    items = cards['topics'][slug]
    if [c['role'] for c in items] != cards['roles']:
        raise ValueError(f'{slug}: need one article card per role, in order {cards["roles"]}')
    for c in items:
        if not c['url'].startswith('https://') or not re.fullmatch(r'\d{4}-\d{2}-\d{2}', c['published']):
            raise ValueError(f'{slug}: article card needs an https URL and an ISO date')
        if not all(isinstance(c[k], int) and 1 <= c[k] <= 5 for k in ('hype', 'gaps')):
            raise ValueError(f'{slug}: article card ratings must be 1–5')
        if c['reviewStatus'] not in (PENDING_LABEL, 'Reviewed by Leyla'):
            raise ValueError(f'{slug}: unknown article review label')
        for k in ('whyHere', 'ratingNote'):
            if len(c[k].split()) > 30:
                raise ValueError(f'{slug}: article card {k} over 30 words')
    return [{k: v for k, v in c.items() if k != 'privateRatingFile'} for c in items]

def main():
    editorial = json.loads((ROOT/'handoff/editorial-metadata.json').read_text())
    cards = json.loads((ROOT/'handoff/article-cards.json').read_text())
    layers = json.loads((ROOT/'handoff/interactive-layers.json').read_text())['topics']
    topics, validations, hashes = [], [], {}
    for slug, name in zip(SLUGS, NAMES):
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
        careful_hype = calculator.score(record)['hype']
        head_path = ROOT/f'research/{slug}-headline-score.json'
        head = json.loads(head_path.read_text())
        hype = calculator.score(head)['hype']
        layer = layers[slug]
        check_layer(slug, layer, head, record, text)
        meta = editorial['topics'][slug]
        for field in ['keyQualification', 'publicEvidenceLimitations', 'aiReviewDate']:
            if not meta.get(field):
                raise ValueError(f'{slug}: missing editorial field {field}')
        item = {
            'slug': slug, 'route': f'/claims/{slug}', 'topic': name,
            'headline': layer['headline'], 'headlineOccurrence': head['occurrence'],
            'claim': record['claim'], 'carefulHeadline': layer['carefulHeadline'],
            'claimExampleCitations': head['occurrence_urls'] + record['occurrence_urls'],
            'scope': meta.get('scope', record['scope']), 'timeHorizon': meta.get('timeHorizon', record['time_horizon']),
            'keyQualification': meta['keyQualification'], **parts,
            'hype': {**hype, 'displayPrefix': 'Headline hype', 'reason': layer['scoreReason'],
                     'checklist': head['hype_checks'], 'reviewStatus': head['review_status']},
            'carefulHype': {**careful_hype, 'displayPrefix': 'Careful version', 'reason': layer['carefulScoreReason'],
                     'checklist': record['hype_checks']},
            'evidenceGaps': {'displayMode': 'qualitative', 'score': None,
                'limitations': meta['publicEvidenceLimitations']},
            'sourceLinks': links(text),
            'researchCutoff': record['research_cutoff'],
            'aiEvidenceReview': {'status': 'completed', 'date': meta['aiReviewDate']},
            'humanEditorialReview': {'status': 'pending', 'reviewer': None, 'date': None},
            'reviewStatusText': PENDING_LABEL,
            'interactive': {k: v for k, v in layer.items() if k not in ('headline', 'carefulHeadline', 'scoreReason', 'carefulScoreReason')},
            'remainingLimitations': record['evidence_limitations'],
            'articleCards': check_cards(slug, cards),
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
        for h in (hype, careful_hype):
            if h['level'] is not None and f"{h['level']}/5" not in parts['scoreExplanationMarkdown']:
                raise ValueError(f'{slug}: displayed and calculated score disagree')
        validations.append({'topic': slug,
            'wordsAThroughF': copy_words,
            'shortAnswerWords': counts['shortAnswerMarkdown'],
            'actions': action_count,
            'externalInlineLinksInEachRequiredSection': True,
            'inlineSourceCount': len(item['sourceLinks']),
            'headlineScore': hype['level'], 'carefulScore': careful_hype['level'], 'label': hype['label'],
            'exactClaimMatch': True, 'sourceCopyUnchanged': True})
        for p in [path, record_path, head_path]:
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
            'Do not show review labels (“AI rating, not yet reviewed” or “Reviewed by Leyla”) anywhere in the Claim Tracker.',
            'The headline statement, score, score reason and key qualification are always visible; interactive layers only add detail.',
            'Dates are stored editorial facts; deployment must not change them.',
            'Article cards show real news coverage of the claim; their article ratings are separate from the claim scores and are not the research evidence base.'
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
    companion = '# Exact website copy: Claim Tracker\n\nThis readable companion preserves the six explainer files; upload claims-content.json with the Lovable prompt.\n\n'
    companion += '\n\n---\n\n'.join(t['websiteCopyMarkdown'].strip() for t in topics)+'\n'
    (ROOT/'handoff/claims-content.md').write_text(companion)
    (ROOT/'review/package-validation.json').write_text(json.dumps({'topics': validations, 'sourceFileSha256': hashes}, indent=2)+'\n')
    print(json.dumps(validations, indent=2))

if __name__ == '__main__':
    main()
