# IntegreerNL

A free self-study platform to help family-migrants prepare for the Dutch civic
integration exam (**inburgering**, level B1).

This is the **first working prototype (MVP)** of my Fontys ICT Open Learning
personal project. It covers the whole learning loop end to end — sign up, read a
lesson, take a quiz, see your progress — across all five exam parts. It is
deliberately small: the goal of this version is to prove the idea works, not to
be a finished course.

## What works right now

- **Accounts** — register, log in, log out. Pages like the dashboard are only
  reachable when you are signed in.
- **5 modules**, one per exam part: Reading, Writing, Listening, Speaking and
  Knowledge of Dutch Society (KNM).
- **15 lessons** (3 per module) written at B1 level.
- **5 quizzes** (1 per module, 5 questions each) with instant feedback — you
  find out straight away whether you were right, and why.
- **Progress tracking** — lessons completed, quizzes passed, and a bar per
  module on your dashboard.
- **A simple study assistant** — a chat page that answers common questions about
  Dutch grammar and the exam. Right now the answers are pre-written; connecting
  a real language model is the next step.

## Not built yet

These are the obvious next steps, deliberately left out of this first version:

- More lessons per module, and full mock exams
- A real language model behind the study assistant
- Speaking practice with audio
- Vocabulary flashcards

## Tech

- **Next.js** (App Router) with TypeScript — pages and API in one project
- **Tailwind CSS** for styling
- **Prisma + SQLite** for the database
- **NextAuth** for email/password login (passwords hashed with bcrypt)

## Running it locally

```bash
npm install
npx prisma migrate dev   # creates the database and loads the course content
npm run dev              # http://localhost:3000
```

The `.env` file holds two settings:

```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="a long random string"
```

### Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run db:seed` | Load the course content again |
| `npx prisma studio` | Look inside the database |

## How the project is organised

```
prisma/schema.prisma   The database tables
prisma/seed.ts         All the lessons and quiz questions
src/app/               The pages (home, login, register, courses, dashboard, assistant)
src/app/api/           The backend routes (register, save progress, mark quiz answers)
src/components/        Reusable pieces of interface
src/lib/               Login setup, database connection, progress calculations
```

## Important note

IntegreerNL is a student project, **not** an official government service. It is
not connected to DUO, the IND or the Rijksoverheid. For official rules,
registration and deadlines, always use [inburgeren.nl](https://www.inburgeren.nl).
