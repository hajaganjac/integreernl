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
- SQLite does not work on Vercel's serverless hosting. Moving to Postgres is
  required before the prototype can be put online for remote user testing.
