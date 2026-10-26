# IntegreerNL

A prototype platform where expats and internationals in the Netherlands practise
the Dutch they actually need in daily life.

Part of my personal project for Fontys HBO-ICT Open Learning. The research behind
it lives in **IntegreerNL — Analysis, Version 2**; the decisions behind the code
are recorded in [`docs/development-log.md`](docs/development-log.md).

> **Status: early prototype, nothing validated.**
> The user interviews and survey have not happened yet (Analysis ch. 8–11 are all
> marked *Planned*). Everything in this build is either a documented scope
> decision or a design hypothesis waiting to be tested.

## Who it is for

Expats and internationals who live, work or study in the Netherlands, are
beginners in Dutch (roughly A0–A2), and want practical Dutch for everyday life.

It is **not** aimed at people preparing for the inburgering exam. That is a
different level with different content, and Analysis ch. 3.2 puts it out of scope.

## What works today

- **One complete situation** — *Ordering coffee*: a four-turn conversation where
  you read what the barista says, choose how to reply, and get told why that reply
  does or does not sound natural.
- **Five candidate situations** — listed, not built. Which get made depends on the
  interviews.
- **Progress** — which situations you have been through and your best result,
  saved in your browser. No sign-up: a test participant opens the link and
  starts straight away.
- **Study assistant** — a chat page answering common beginner questions. Currently
  pre-written answers matched on keywords; it is wired so a language model can be
  connected by setting `OPENAI_API_KEY`.

## What is deliberately not built

Gamification (points, streaks, levels), more situations, speaking practice with
audio, and any pricing or payment. Each of those depends on research that has not
happened.

## Tech

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS v4** — design tokens defined once in `globals.css`
- **No database and no accounts** — situations are a TypeScript file, progress is kept in the browser

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
```

That is the whole setup. There is nothing to configure: no database, no
environment variables, no account to create.

Deploying is the same story — import the repo on Vercel and it builds. Set
`OPENAI_API_KEY` only if you want the study assistant to use a real language
model instead of its built-in written answers.

## How the code is organised

```
src/content/scenarios.ts  All the situations, including the full Ordering coffee conversation
src/app/practice/         Situation list and the conversation player page
src/app/api/scenario/     Grading a reply (kept server-side on purpose)
src/lib/useProgress.ts    Progress, stored in the browser
src/components/scenarios/ScenarioPlayer.tsx   The interactive conversation
src/lib/levelTheme.ts  Colour per CEFR level (A0 / A1 / A2)
docs/development-log.md  Why each decision was made, and what still needs testing
```

Replies are graded on the server so the correct answer is not sitting in the page
source where a learner would see it first.

## Taking part in the research

I am interviewing expats about what is actually hard about learning Dutch here.
If that is you: **ha.jaganjac@gmail.com**.
