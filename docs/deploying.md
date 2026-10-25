# Putting IntegreerNL online (Vercel)

The code is ready to deploy. What is left are the two things only you can do:
create a database and paste its connection string into Vercel.

Takes about ten minutes.

---

## Why a database change was needed

The prototype used SQLite, which is a single file on disk. Vercel runs each
request in a short-lived serverless function with no permanent filesystem, so
that file cannot live there — and it was never committed to the repo anyway.

The project now uses Postgres instead. Nothing about how the app works changed;
it is the same Prisma code, pointed at a different kind of database.

---

## Step 1 — Create a Postgres database

Either option is free and both give you one connection string.

**Neon** (neon.tech) — sign up, create a project, choose a region in Europe,
then copy the connection string shown on the dashboard. It looks like:

```
postgresql://user:password@ep-something.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

**Or Vercel Postgres** — in your project on Vercel, open the **Storage** tab,
create a Postgres database and attach it. Vercel sets the environment variables
for you, but it names them differently, so add one more variable called
`DATABASE_URL` with the same value as `POSTGRES_PRISMA_URL`.

---

## Step 2 — Set the environment variables in Vercel

Project → **Settings** → **Environment Variables**. Add these for
*Production*, *Preview* and *Development*:

| Name | Value |
|---|---|
| `DATABASE_URL` | the connection string from step 1 |
| `AUTH_SECRET` | a long random string — run `openssl rand -base64 32` |

`OPENAI_API_KEY` is optional. Without it the study assistant uses its built-in
written answers, which is the intended behaviour for now.

> `AUTH_SECRET` signs the login cookie. If it is missing, logging in fails in
> production even though it works locally.

---

## Step 3 — Create the tables and load the content

Run this once from your own machine, with `DATABASE_URL` in your local `.env`
set to the **same** connection string:

```bash
npx prisma migrate deploy   # creates the tables
npm run db:seed             # loads the situations
```

You only need to repeat `npm run db:seed` when you change `prisma/seed.ts`.

---

## Step 4 — Deploy

Push to `main`. Vercel builds automatically.

The build command is set in `vercel.json`:

```
prisma migrate deploy && next build
```

so any future migrations are applied as part of the deploy. `prisma generate`
runs via the `postinstall` script, which matters because Vercel caches
`node_modules` between builds and would otherwise use a stale Prisma Client.

---

## Local development after this change

Your local `.env` now needs a Postgres URL too, because the schema no longer
describes SQLite. While this is a prototype the simplest thing is to point local
development at the same Neon database:

```
DATABASE_URL="postgresql://…"   # same string as Vercel
AUTH_SECRET="any long random string"
```

If you would rather keep test accounts out of the live database, create a second
Neon project (or a Neon branch) and use that string locally instead.

---

## If something goes wrong

| Symptom | Cause |
|---|---|
| Build fails: `@prisma/client did not initialize` | `postinstall` did not run — check it is still in `package.json` |
| Build fails on `migrate deploy` | `DATABASE_URL` is missing or wrong in Vercel |
| Site loads but the situations list is empty | Tables exist but the seed has not been run — step 3 |
| Login works locally, fails in production | `AUTH_SECRET` is not set in Vercel |
| Everything 500s | Database unreachable; check the connection string includes `?sslmode=require` |

The landing page is deliberately built to still render if the database is
unreachable, so a database problem shows up as an empty situations section
rather than a broken site.
