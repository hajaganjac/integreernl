# IntegreerNL

A free, AI-supported self-study platform to help family-migrants prepare for the Dutch civic integration exam (**inburgering**, B1 level). Built as a full-stack MVP: authentication, a five-module course engine mapped to the official exam parts, adaptive quizzes with instant feedback, a progress dashboard, and an AI study assistant.

> Family-migrants who move to the Netherlands through marriage or family reunification must pay for their own inburgering course or take a DUO loan — unlike asylum status holders, whose course is funded. IntegreerNL exists to close that gap with a free, structured, self-paced alternative.

## Stack

- **Next.js 16** (App Router, TypeScript) — frontend + backend in one codebase
- **Tailwind CSS v4** — design system
- **Prisma + SQLite** — database ORM (swap the `DATABASE_URL` for Postgres/MySQL in production)
- **NextAuth v5** (Credentials provider) — email/password auth with bcrypt hashing, JWT sessions
- **Recharts** — dashboard data visualization
- **react-markdown** — lesson content rendering
- OpenAI-compatible API (optional) — live AI assistant, with a built-in offline fallback

## Features

- **Landing page** explaining the problem, audience, and exam structure
- **Auth** — register / login / logout, protected routes via middleware
- **5 course modules** mapped to the exam: Reading, Writing, Listening, Speaking, Knowledge of Dutch Society (KNM) — each with real lessons and a scored quiz
- **Lesson viewer** with markdown content, mark-as-complete, prev/next navigation
- **Quiz engine** — per-question instant feedback, server-side grading, scored attempts
- **Progress dashboard** — completion stats, per-module bars, quiz score trend chart, recent attempts
- **AI study assistant** — chat UI backed by an LLM (if `OPENAI_API_KEY` is set) or a rule-based offline fallback for common NT2/inburgering questions, with a visible "study aid, not an official source" disclaimer

## Getting started

```bash
npm install
npx prisma migrate dev   # creates prisma/dev.db and applies the schema
npm run db:seed          # seeds the 5 modules, lessons and quizzes
npm run dev              # http://localhost:3000
```

`.env` is already present for local dev — adjust as needed:

```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="replace-with-a-long-random-string-in-production"
OPENAI_API_KEY=""   # optional — leave empty to use the offline assistant fallback
```

### Useful scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Production build & start |
| `npm run db:seed` | Re-seed course content (safe to re-run, upserts by slug) |
| `npm run db:reset` | Drop and recreate the database, then re-seed |
| `npx prisma studio` | Browse the database visually |

## Project structure

```
prisma/schema.prisma       Data model: User, Module, Lesson, Quiz, Question, Option,
                           LessonProgress, QuizAttempt, ChatMessage
prisma/seed.ts             Course content (5 modules, 15 lessons, 26 quiz questions)
src/lib/auth.ts            NextAuth config (credentials provider, JWT)
src/lib/data.ts            Progress-aggregation queries used by dashboard/courses pages
src/lib/assistant.ts       System prompt, OpenAI call, offline fallback replies
src/app/                   Routes (landing, login/register, courses, dashboard, assistant)
src/components/            UI building blocks, grouped by feature area
```

## Notes on scope

This is an MVP built to demonstrate the full product loop end-to-end (auth → structured content → assessment → progress → AI support), following the Design Thinking approach in the original project proposal. Content depth intentionally favours breadth across all five exam parts with a representative set of real lessons and quiz questions per module, rather than an exhaustive multi-year curriculum.

Not a substitute for official exam information — always verify deadlines, fees and procedures with DUO, IND, or your gemeente.
