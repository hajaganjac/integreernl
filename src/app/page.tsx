import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ModuleIcon } from "@/components/courses/ModuleIcon";
import { StatsBar } from "@/components/landing/StatsBar";
import { ProgressPreview } from "@/components/landing/ProgressPreview";
import { Term } from "@/components/landing/Term";
import { FadeInUp, StaggerChildren, StaggerItem, ScaleOnHover } from "@/components/motion";
import { MODULE_THEME } from "@/lib/moduleTheme";
import { EXAM_PART_META } from "@/lib/utils";
import type { ExamPart } from "@prisma/client";
import {
  Sparkles,
  BarChart3,
  ArrowRight,
  Check,
  Minus,
  ShieldCheck,
  Info,
  MessageCircle,
  Quote,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const EXAM_PARTS: { part: ExamPart; icon: string; desc: string }[] = [
  { part: "READING", icon: "BookOpen", desc: "Understand Dutch letters, forms and notices." },
  { part: "WRITING", icon: "PenLine", desc: "Write short texts, emails and messages." },
  { part: "LISTENING", icon: "Headphones", desc: "Follow spoken Dutch in daily situations." },
  { part: "SPEAKING", icon: "Mic", desc: "Speak confidently in everyday conversations." },
  { part: "KNM", icon: "Landmark", desc: "Know how Dutch society and institutions work." },
];

const HOW_IT_WORKS = [
  {
    icon: BarChart3,
    title: "Study in small blocks",
    body: "Short lessons and quizzes sized for a tired evening after work — not a three-hour classroom session.",
  },
  {
    icon: Sparkles,
    title: "Ask when you're stuck",
    body: "The AI study buddy explains grammar in plain language at 9pm, so you never lose a week waiting to ask someone.",
  },
  {
    icon: Check,
    title: "Watch it add up",
    body: "Every finished lesson moves a bar. Streaks and badges turn a three-year deadline into this week's small win.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I moved to Eindhoven after getting married, and I have three years to pass B1. Money was tight since we'd just set up a household together — a private course wasn't realistic. I needed a clear place to start.",
    name: "Amina, 29",
    context: "Came through marriage · studying evenings",
    initial: "A",
  },
  {
    quote:
      "I work full-time in a warehouse. Fifteen minutes on the bus each way is my study time now. Being able to do one quiz in that window, and actually see the bar move, is what keeps me going.",
    name: "Marek, 34",
    context: "Balancing full-time work · studies on commute",
    initial: "M",
  },
  {
    quote:
      "I'd looked at a private course and it was more than a month of our rent. Knowing there was something structured I could start the same evening, for nothing, took a lot of pressure off.",
    name: "Farah, 26",
    context: "Self-funding · started before her course budget came through",
    initial: "F",
  },
];

const COMPARISON = {
  columns: ["Municipal course", "Private course", "IntegreerNL"],
  note: [
    "Funded by your gemeente — only if you hold asylum status",
    "What most family-migrants are left with: self-paid or a DUO loan",
    "This platform",
  ],
  rows: [
    { label: "Who it's for", values: ["Asylum status holders", "Anyone who can pay", "Anyone, free"] },
    { label: "Cost to you", values: ["Free", "Paid or DUO loan", "Free"] },
    { label: "Study at your own pace", values: [false, false, true] },
    { label: "Available evenings & weekends", values: [false, false, true] },
    { label: "Instant answers when stuck", values: [false, false, true] },
    { label: "Progress tracking built in", values: [false, false, true] },
  ],
};

const ROADMAP = {
  live: [
    "All 5 exam parts, 25 lessons",
    "Adaptive quizzes with instant feedback",
    "Vocabulary flashcards with pronunciation",
    "Progress dashboard, streaks & badges",
    "AI study buddy (text)",
  ],
  next: [
    "Speaking practice with voice input",
    "Full mock exams under timed conditions",
    "Dutch-language interface option",
    "Downloadable progress report for your gemeente",
  ],
};

const FAQS = [
  {
    q: "Is IntegreerNL really free?",
    a: "Yes. Unlike asylum status holders, family-migrants must pay for their own inburgering course or take a DUO loan. IntegreerNL exists specifically to close that gap — every lesson, quiz and the AI assistant are free to use.",
  },
  {
    q: "Does this replace the official exam?",
    a: "No. IntegreerNL is an independent study aid to help you prepare for the official inburgeringsexamen. Always check DUO / Rijksoverheid for official exam registration and rules.",
  },
  {
    q: "How accurate is the AI study buddy?",
    a: "It's a practice partner, not an authority. It's scoped to everyday Dutch and exam topics, and it's genuinely useful for explaining a grammar rule or rehearsing a conversation — but like any AI tool it can be wrong. Treat its answers as a starting point and cross-check anything that affects a real decision against your course material or the official sources linked on this page. It will never give you legal or immigration advice.",
  },
  {
    q: "What do you do with my data?",
    a: "We store the minimum needed to run your account: your name, email, a securely hashed password, and your study progress. We do not sell your data, we do not share it with advertisers, and we do not pass it to any government body. Your messages to the AI assistant are stored so your conversation history works. You can ask for your account and all its data to be deleted at any time.",
  },
  {
    q: "Who is this platform for?",
    a: "Primarily for people who moved to the Netherlands through marriage or family reunification and must reach Dutch level B1 within three years. Asylum status holders and other self-motivated learners are welcome too.",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ProblemSection />
      <HowItWorksSection />
      <ModulesSection />
      <TestimonialsSection />
      <RoadmapSection />
      <FaqSection />
      <ClosingCta />
    </>
  );
}

/* ---------------------------- Hero -------------------------------- */

function Hero() {
  return (
    <section className="hero-canvas border-b border-ink-100">
      <Container className="relative z-10 grid grid-cols-1 items-center gap-14 py-20 sm:py-24 lg:grid-cols-[1fr_1.05fr]">
        {/* CSS-driven stagger (see .enter-up): keeps the headline paintable
            without waiting for hydration, which is what LCP measures. */}
        <div>
          <div className="enter-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-3.5 py-1.5 text-xs font-semibold text-accent-800 ring-1 ring-inset ring-accent-200">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Free · No course fee, no DUO loan
            </span>
          </div>

          <h1
            className="enter-up mt-6 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl"
            style={{ animationDelay: "60ms" }}
          >
            Pass your{" "}
            <Term definition="Inburgering: the Dutch civic integration requirement for certain newcomers.">
              inburgering
            </Term>{" "}
            exam — <span className="text-accent-600">without paying for a course.</span>
          </h1>

          <p
            className="enter-up mt-6 max-w-xl text-lg text-body-muted"
            style={{ animationDelay: "140ms" }}
          >
            A free, structured study platform for family-migrants working toward Dutch
            B1. Guided lessons, adaptive quizzes, vocabulary flashcards, an AI study
            buddy — and a dashboard that shows the deadline getting closer to done.
          </p>

          <div
            className="enter-up mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "220ms" }}
          >
            <Button href="/register" size="lg">
              Start your first free lesson
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="#how" variant="outline" size="lg">
              See how it works
            </Button>
          </div>

          <p
            className="enter-up mt-6 text-sm text-body-subtle"
            style={{ animationDelay: "300ms" }}
          >
            No payment details, ever. Your first quiz is about two minutes away.
          </p>
        </div>

        <div className="enter-up" style={{ animationDelay: "260ms" }}>
          <BrowserFrame
            src="/product/dashboard.png"
            alt="The IntegreerNL dashboard, showing 18 of 25 lessons completed, a 7-day study streak, and progress bars for each of the five exam parts."
            priority
            label="integreernl.nl/dashboard"
          />
        </div>
      </Container>
    </section>
  );
}

/* --------------------------- Stats -------------------------------- */

function StatsSection() {
  return (
    <section className="border-b border-ink-100 bg-canvas-raised">
      <Container className="py-14">
        <StatsBar />
      </Container>
    </section>
  );
}

/* -------------------------- Problem ------------------------------- */

/** Renders a comparison cell: a tick, a dash, or literal text.
 *  Icons carry an sr-only label so the meaning isn't colour/shape-only. */
function ComparisonValue({ value }: { value: string | boolean }) {
  if (typeof value !== "boolean") return <>{value}</>;
  return value ? (
    <>
      <Check className="text-brand-600" aria-hidden="true" style={{ width: 18, height: 18 }} />
      <span className="sr-only">Yes</span>
    </>
  ) : (
    <>
      <Minus className="text-ink-300" aria-hidden="true" style={{ width: 18, height: 18 }} />
      <span className="sr-only">No</span>
    </>
  );
}

function ProblemSection() {
  return (
    <section className="border-b border-ink-100">
      <Container className="py-20">
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink-900">
            Integration is required by law. Paying for it shouldn&rsquo;t be.
          </h2>
          <p className="mt-4 text-base text-body-muted">
            Asylum status holders get a course funded by their{" "}
            <Term definition="Gemeente: your local municipality — your main point of contact with Dutch government.">
              gemeente
            </Term>
            . People who move here through marriage or family reunification don&rsquo;t —
            they pay out of pocket or borrow from{" "}
            <Term definition="DUO: Dienst Uitvoering Onderwijs, the Dutch government's education executive agency, which administers integration loans and exams.">
              DUO
            </Term>
            , on top of building a new life.
          </p>
        </FadeInUp>

        {/* Mobile: stacked cards. A horizontally scrolling table pushed the
            IntegreerNL column — the whole point of the comparison — off
            screen with no scroll affordance. Same data, no duplication. */}
        <FadeInUp className="mt-10 space-y-4 sm:hidden">
          {COMPARISON.columns.map((col, ci) => {
            const isUs = ci === 2;
            return (
              <div
                key={col}
                className={`rounded-lg border p-5 ${
                  isUs ? "border-accent-200 bg-accent-50/60" : "border-ink-100 bg-canvas-raised"
                }`}
              >
                <h3
                  className={`font-display text-base font-bold ${
                    isUs ? "text-accent-800" : "text-ink-900"
                  }`}
                >
                  {col}
                </h3>
                <p className="mt-1 text-2xs text-body-subtle">{COMPARISON.note[ci]}</p>
                <dl className="mt-4 space-y-2">
                  {COMPARISON.rows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4">
                      <dt className="text-sm text-body-muted">{row.label}</dt>
                      <dd
                        className={`shrink-0 text-sm font-semibold ${
                          isUs ? "text-accent-900" : "text-body"
                        }`}
                      >
                        <ComparisonValue value={row.values[ci]} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </FadeInUp>

        <FadeInUp className="mt-12 hidden overflow-x-auto sm:block">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <caption className="sr-only">
              Comparison of the municipal course, a private course, and IntegreerNL
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[28%] pb-4" />
                {COMPARISON.columns.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={`pb-4 align-bottom ${i === 2 ? "text-accent-800" : "text-ink-900"}`}
                  >
                    <span className="block font-display text-base font-bold">{c}</span>
                    <span className="mt-1 block text-2xs font-normal text-body-subtle">
                      {COMPARISON.note[i]}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row) => (
                <tr key={row.label} className="border-t border-ink-100">
                  <th
                    scope="row"
                    className="py-3.5 pr-4 text-sm font-medium text-body align-middle"
                  >
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={`py-3.5 text-sm align-middle ${
                        i === 2 ? "bg-accent-50/60 font-semibold text-accent-900" : "text-body-muted"
                      }`}
                    >
                      <ComparisonValue value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </FadeInUp>

        <FadeInUp>
          <p className="mt-6 text-xs text-body-subtle">
            Exam fees are charged per part and course costs are set by private providers.
            For current official figures see{" "}
            <a
              href="https://www.inburgeren.nl/inburgeren-betalen/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw font-medium text-brand-700"
            >
              inburgeren.nl (DUO)
            </a>
            .
          </p>
        </FadeInUp>
      </Container>
    </section>
  );
}

/* ------------------------ How it works ---------------------------- */

function HowItWorksSection() {
  return (
    <section id="how" className="scroll-mt-20 border-b border-ink-100 bg-canvas-raised">
      <Container className="py-20">
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand-600">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink-900">
            Built for the evening after a long day
          </h2>
        </FadeInUp>

        <StaggerChildren className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map((f) => (
            <StaggerItem key={f.title}>
              <div className="h-full rounded-lg border border-ink-100 bg-canvas p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-600 text-white">
                  <f.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{f.title}</h3>
                <p className="mt-2 text-sm text-body-muted">{f.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* live preview of the real dashboard behaviour */}
        <FadeInUp className="mt-16">
          <div className="rounded-xl border border-ink-100 bg-canvas p-8 sm:p-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <h3 className="font-display text-2xl font-bold text-ink-900">
                  Three years is a long time to stay motivated
                </h3>
                <p className="mt-3 text-base text-body-muted">
                  So the dashboard makes progress visible in the short term. Finish a
                  lesson, watch the ring move. Keep a streak going. It&rsquo;s the same
                  view you get the moment you sign up.
                </p>
                <Link
                  href="/register"
                  className="link-draw mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700"
                >
                  Start tracking your progress
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <ProgressPreview />
            </div>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

/* -------------------------- Modules ------------------------------- */

function ModulesSection() {
  return (
    <section id="exam" className="scroll-mt-20 border-b border-ink-100">
      <Container className="py-20">
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-700">
            The exam, explained
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink-900">
            Five modules, mapped to the{" "}
            <Term definition="Inburgeringsexamen: the official Dutch civic integration exam.">
              inburgeringsexamen
            </Term>
          </h2>
          <p className="mt-4 text-base text-body-muted">
            To pass you need Reading, Writing, Listening and Speaking at B1, plus Knowledge
            of Dutch Society. Every module targets one part.
          </p>
        </FadeInUp>

        <StaggerChildren className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {EXAM_PARTS.map(({ part, icon, desc }) => {
            const theme = MODULE_THEME[part];
            const meta = EXAM_PART_META[part];
            return (
              <StaggerItem key={part}>
                <ScaleOnHover hover={1} lift={4} className="h-full">
                  <div className="flex h-full flex-col overflow-hidden rounded-lg border border-ink-100 bg-canvas-raised transition-shadow hover:shadow-md">
                    <div className={`h-1.5 bg-gradient-to-r ${theme.gradient}`} aria-hidden="true" />
                    <div className="flex flex-1 flex-col p-6">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-md ${theme.bgTint} ${theme.text}`}
                      >
                        <ModuleIcon name={icon} className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 font-display font-semibold text-ink-900">{meta.label}</h3>
                      <p className={`text-xs font-semibold ${theme.text}`}>{meta.nl}</p>
                      <p className="mt-2 text-sm text-body-muted">{desc}</p>
                    </div>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        <FadeInUp className="mt-14">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <BrowserFrame
              src="/product/quiz.png"
              alt="A Reading module quiz question with the correct answer highlighted and an explanation shown underneath."
              label="integreernl.nl/courses/reading/quiz"
            />
            <div>
              <h3 className="font-display text-2xl font-bold text-ink-900">
                Every quiz explains itself
              </h3>
              <p className="mt-3 text-base text-body-muted">
                Answer a question and you find out immediately whether you were right —
                and, more importantly, why. No waiting for a class, no marking backlog.
              </p>
              <Button href="/register" variant="outline" className="mt-6">
                Try a quiz
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp className="mt-14">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-200">
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Your AI study buddy
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">
                The question you&rsquo;d be embarrassed to ask in class
              </h3>
              <p className="mt-3 text-base text-body-muted">
                Ask it at 9pm in your pyjamas instead. It explains grammar simply, gives
                examples, and never sighs. It&rsquo;s a study aid, not an official source
                — and it says so.
              </p>
              <Button href="/register" variant="outline" className="mt-6">
                Meet the assistant
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <BrowserFrame
              src="/product/assistant.png"
              alt="The AI study buddy answering a question about when to use the Dutch verbs hebben and zijn, with example sentences."
              label="integreernl.nl/assistant"
              className="lg:order-1"
            />
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

/* ------------------------ Testimonials ---------------------------- */

function TestimonialsSection() {
  return (
    <section className="border-b border-ink-100 bg-ink-900">
      <Container className="py-20">
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-white">
            Who this is built for
          </h2>
          <p className="mt-4 text-base text-ink-200">
            Illustrative personas drawn from desk research into the family-migrant
            experience — not yet real user quotes. We&rsquo;ll replace them with real
            ones as testing continues.
          </p>
        </FadeInUp>

        <StaggerChildren className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="flex h-full flex-col rounded-lg bg-ink-800 p-7 ring-1 ring-inset ring-white/10">
                <Quote className="h-7 w-7 text-brand-300" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-100">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 font-display text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    {t.initial}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{t.name}</span>
                    <span className="block text-xs text-ink-300">{t.context}</span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}

/* -------------------------- Roadmap ------------------------------- */

function RoadmapSection() {
  return (
    <section className="border-b border-ink-100">
      <Container className="py-20">
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink-900">
            What&rsquo;s live, and what&rsquo;s next
          </h2>
          <p className="mt-4 text-base text-body-muted">
            This is an actively developed student project. Here&rsquo;s exactly where it
            stands — no roadmap theatre.
          </p>
        </FadeInUp>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          <FadeInUp>
            <div className="h-full rounded-lg border border-brand-200 bg-brand-50/50 p-7">
              <p className="font-display text-sm font-bold uppercase tracking-wider text-brand-700">
                Live now
              </p>
              <ul className="mt-4 space-y-3">
                {ROADMAP.live.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-body">
                    <Check
                      className="mt-0.5 shrink-0 text-brand-600"
                      style={{ width: 16, height: 16 }}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <div className="h-full rounded-lg border border-ink-200 border-dashed bg-canvas-raised p-7">
              <p className="font-display text-sm font-bold uppercase tracking-wider text-body-subtle">
                Coming next
              </p>
              <ul className="mt-4 space-y-3">
                {ROADMAP.next.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-body-muted">
                    <Minus
                      className="mt-0.5 shrink-0 text-ink-300"
                      style={{ width: 16, height: 16 }}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------- FAQ --------------------------------- */

function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 bg-canvas-raised">
      <Container className="py-20">
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink-900">
            Frequently asked questions
          </h2>
        </FadeInUp>

        {/* Disclaimer surfaced at the top, where a sceptical visitor
            can verify it immediately — not buried in the footer. */}
        <FadeInUp className="mx-auto mt-8 max-w-3xl">
          <div className="flex items-start gap-3 rounded-md border border-accent-200 bg-accent-50 p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" aria-hidden="true" />
            <p className="text-sm text-accent-900">
              <strong className="font-semibold">
                IntegreerNL is a student research project, not an official government
                service.
              </strong>{" "}
              It is not affiliated with DUO, the IND or the Rijksoverheid. For official
              rules, registration and deadlines, always use{" "}
              <a
                href="https://www.inburgeren.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw font-semibold underline-offset-2"
              >
                inburgeren.nl
              </a>
              .
            </p>
          </div>
        </FadeInUp>

        <FadeInUp className="mx-auto mt-8 max-w-3xl">
          <div className="divide-y divide-ink-100 overflow-hidden rounded-lg border border-ink-100 bg-canvas">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between font-display font-semibold text-ink-900">
                  {faq.q}
                  <span
                    className="ml-4 shrink-0 text-body-subtle transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </span>
                </summary>
                <p className="mt-3 text-sm text-body-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

/* -------------------------- Closing ------------------------------- */

function ClosingCta() {
  return (
    <section className="bg-canvas-raised">
      <Container className="pb-24">
        <FadeInUp>
          <div className="hero-canvas overflow-hidden rounded-xl border border-ink-100 px-8 py-16 text-center sm:px-16">
            <div className="relative z-10">
              <h2 className="font-display text-3xl font-bold text-ink-900">
                Your B1 journey starts tonight
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-body-muted">
                Make a free account and get a study plan across all five exam parts. No
                course fee, no loan, no waitlist.
              </p>
              <div className="mt-9 flex justify-center">
                <Button href="/register" size="lg">
                  Start your first free lesson
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}
