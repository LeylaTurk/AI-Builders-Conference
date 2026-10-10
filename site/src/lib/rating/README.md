# Rating engine rules

Copied from `engine/` in [LeylaTurk/AI-Builders-Conference](https://github.com/LeylaTurk/AI-Builders-Conference). Use them as they are.

- `rating-prompt.ts` (`RATING_PROMPT`): the system prompt sent to Claude, word for word. `rating-prompt.md` is the same text, for reading.
- `rating-schema.ts` (`RATING_SCHEMA`): the JSON format Claude must answer in. `rating-schema.json` is the same schema.
- `scoring.ts`: turns Claude's answers into the Hype and Evidence gaps ratings (`applySourceRules`, `rateHype`, `rateGaps`, `verifyQuote`, `partlyChecked`). The AI never computes a rating; this code does.

Model: `claude-sonnet-5-5`. Server-side only: never import these into browser code.

`scoring.ts` differs from the engine copy in two lines only, to pass this project's stricter TypeScript settings (an `undefined` guard on the rule section and on the paragraph lookup). Behaviour is the same.
