# Development log

A short record of the decisions behind the build, so each one can be traced back
to the Analysis document and so it is clear what is evidence and what is still a
guess.

Reference: **IntegreerNL — Analysis, Version 2 (2 October 2026)**.

Evidence is labelled using four categories:

| Label | Meaning |
|---|---|
| **Finding** | Supported by research already in the Analysis document |
| **Assumption** | Written down in Analysis ch. 5, not yet tested |
| **Hypothesis** | A proposed solution, invented during design, not yet tested |
| **Constraint** | A project decision or scope rule, not a research result |

---

## 2026-10-26 — Repositioned the platform from inburgering B1 to expat beginners

**What changed.** The entire product was aimed at family-migrants preparing for
the civic integration exam at B1. It is now aimed at expat beginners (A0–A2)
learning practical everyday Dutch.

**Why.** Analysis ch. 3 defines the target group as expats and internationals who
are beginners and want Dutch for daily life. Ch. 3.1 states explicitly that
inburgering is *not* the focus, and ch. 3.2 puts "higher levels (B1 and up)" and
"official exam preparation" out of scope.

**Evidence status.** Constraint. This is a documented scope decision, not a
research finding.

**Concretely removed:** the `ExamPart` taxonomy (Reading / Writing / Listening /
Speaking / KNM), all exam-oriented copy on the landing page, the DUO and
Rijksoverheid links, the "free B1 study platform" positioning, and the exam
references in the assistant's prompt and canned answers.

**What remains uncertain.** Nothing about the direction — this is decided. What
is uncertain is everything about *what beginners actually need*, which is what
the interviews are for.

---

## 2026-10-26 — Content organised by everyday situation instead of exam part

**Feature.** Content is now modelled as `Scenario` → `ScenarioStep` →
`ScenarioChoice`: a situation is a short conversation, and the learner picks a
reply at each of their turns.

**Problem it addresses.** The working problem statement (ch. 2.3) says cheaper
apps "may not prepare them for the Dutch they need in daily life".

**Research connection.** Sub-question 2 — *In which daily situations do expats
need Dutch the most?* — and assumption **A2** — *Apps don't prepare expats well
enough for real daily situations.*

**Evidence status.** Hypothesis. Nobody has been interviewed yet (ch. 8–11 are
all marked Planned). Organising content by situation is my proposed answer to A2,
not a validated one.

**How it can be tested.** Put the ordering-coffee conversation in front of
5 participants and watch: do they recognise the situation as one they have been
in, is the feedback understandable, and would they use it again? That is a
usability question *and* a content-relevance question, so it can run inside the
same interview session as sub-questions 1 and 2.

**Design note.** The situation list is stored as data, not hard-coded. After the
interviews the list can be reordered, replaced or cut without touching the player
component — which matters because I expect the interviews to change it.

---

## 2026-10-26 — One situation built in full, five listed as candidates

**What.** "Ordering coffee" is written end to end (4 learner turns). Five more
situations are seeded as unpublished and shown on the site as "situations I am
considering next".

**Why.** Building six half-finished situations before knowing which ones matter
would waste the effort and bias the interviews. Showing the candidates lets me
ask participants which they would actually want.

**Evidence status.** Hypothesis for the content, Constraint for the approach.

**How it can be tested.** The candidate list doubles as an interview prompt:
"which of these would you use, and what is missing?"

---

## 2026-10-26 — Feedback is written as "natural / not natural", not "right / wrong"

**Feature.** A reply that is grammatically fine but socially off (for example
*Ik wil koffie* — blunt) is shown in amber with an explanation, not in red as an
error.

**Problem it addresses.** Beginners who can already get by in English have little
reason to persist (ch. 6.2: 79% say it is easy to live here without Dutch). Being
marked "wrong" for a sentence that would in fact be understood is discouraging and
inaccurate.

**Research connection.** Sub-question 4 — *What keeps expats motivated, and why do
they stop?* — and assumption **A3**.

**Evidence status.** Hypothesis. That this framing helps motivation is my belief,
not a finding.

**How it can be tested.** Ask participants after a run: how did it feel when you
picked a reply that was not the suggested one? Did it feel like a mistake?

---

## 2026-10-26 — No pricing claim anywhere on the site

**What changed.** The old site said "Free · no course fee, no DUO loan" in several
places. The site now says only that it is free while being tested, and the FAQ
says plainly that whether there is ever a price is still being researched.

**Why.** Assumption **A4** — *Expats would pay a small monthly amount for something
better than a free app* — is untested, and ch. 1.2 describes the goal as an
*affordable* platform, not a free one. Advertising "free" would quietly commit the
project to a business model the research has not reached yet, and would bias any
interview question about willingness to pay.

**Evidence status.** Assumption (A4), deliberately left open.

**Competitor figures used.** The FAQ cites €528–€875 per level for courses versus
a few euros a month for apps. These come from ch. 2.2 and are desk-research
**findings**, so they are quoted as they appear in the document.

**Open item.** The logo tagline still reads "Learn Dutch. For free." That is
accurate today but it bakes a pricing position into the brand mark. Flagged for a
decision; not changed unilaterally since the logo is a supplied asset.

---

## Known gaps

- No user research has been carried out yet. Nothing in the product is validated.
- There is no persona, so no design decision here is justified by one.
- Progress tracking is deliberately minimal (completed yes/no plus best score).
  Anything more elaborate — streaks, points, levels — is gamification, which
  Analysis ch. 5 does not cover and which the prompt correctly treats as a
  hypothesis. Not built.
- Progress is stored per browser, so it is lost if someone clears their site
  data and is not shared between devices. Acceptable for a prototype handed to a
  handful of testers; it would need real accounts for anything beyond that.

---

## 2026-10-26 — Moved from SQLite to Postgres so the prototype can go online

**What changed.** The datasource is now `postgresql`. A Postgres migration
replaces the SQLite one, `postinstall: prisma generate` was added, and
`vercel.json` runs `prisma migrate deploy` as part of the build.

**Why.** Vercel runs each request in a serverless function with no persistent
filesystem, so a SQLite `.db` file cannot work there — and it was gitignored, so
the deployed app had no database at all.

**Evidence status.** Constraint. A hosting limitation, not a research result.

**Why it matters for the research.** Analysis ch. 1.5 lists finding five
interview participants as the next step. Remote participants need a URL they can
open; this unblocks that.

**Side effect.** Local development now also needs a Postgres connection string,
because one schema cannot describe two database engines. While this is a
prototype, pointing local development at the same hosted database is the
simplest option. Documented in `docs/deploying.md`.

**Also hardened.** The landing page now catches a failed database query and
hides the situations list instead of returning a 500, so a database problem does
not take down the page an interview participant opens first.

---

## 2026-10-26 — Removed the database and the accounts entirely

**What changed.** Prisma, Postgres and NextAuth are gone, along with the login
and registration pages and the `/api/auth` and `/api/register` routes. The
situations now live in `src/content/scenarios.ts` as plain TypeScript, and
progress is kept in the browser via `localStorage`. Dependencies went from 16 to
8, and the app needs no environment variables at all.

**Why.** The previous entry solved the wrong problem. Getting the prototype
online had grown into: create a Neon account, copy a connection string, set
`DATABASE_URL` and `AUTH_SECRET` in Vercel, run `prisma migrate deploy` in the
build, then seed the database. All of that existed to support accounts — and
accounts appear nowhere in the Analysis document as a requirement. The content
was already static data sitting in `seed.ts`; it was being loaded into a database
at build time only so it could be read straight back out.

**Evidence status.** Constraint. A scope decision, not a research result.

**Why it matters for the research.** Analysis ch. 1.5 needs five interview
participants to try the prototype. They now open a link and are in a conversation
immediately — no sign-up form between them and the thing being tested. Removing
the registration wall is a net gain for the testing goal, not a compromise for it.

**Trade-off, stated plainly.** Progress does not follow a person across devices
and disappears with their site data, and nothing can be measured centrally about
how testers used it — observation in the interviews has to cover that. If the
research shows accounts are wanted, this is one commit to reverse.

**Kept.** Replies are still graded server-side in `/api/scenario/answer`, so the
correct answers are not in the page source. That was never a database feature.
