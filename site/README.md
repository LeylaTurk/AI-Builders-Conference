# Decoding the Hype

Build the starting shell of a public website called Decoding the Hype, subtitle "AI news, headlines, and claims". It will later rate AI news stories for Hype and Evidence gaps, but today I only want an empty, working site.

One home page with the site name, the subtitle, and a short line: "Rated stories coming soon." Clean, readable, good contrast, works on a phone. No login, no sign-up, no sample stories.

Use Lovable Cloud as the backend.

Create one backend function called health-check that reads a secret named ANTHROPIC_API_KEY and sends a one-word test message to the Anthropic Claude API using the model claude-sonnet-5-5 (Claude Sonnet 5.5, the model this project uses for all ratings). It returns only "ok" or the error message. Ask me to add the ANTHROPIC_API_KEY secret using the secure secret form. The key must never appear in the page code or the browser.

Add a small "Check connection" button at the bottom of the home page that calls health-check and shows the result. I will remove it later.

Do not use Lovable AI for anything. All AI calls in this project go to Anthropic through backend functions.

Don't add any other features yet.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://hype-decoder-shell.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1add577f-8a94-4b8c-8daf-630ea5273dfe).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
