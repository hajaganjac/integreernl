import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ModuleIcon } from "@/components/courses/ModuleIcon";
import { MODULE_THEME } from "@/lib/moduleTheme";
import { EXAM_PART_META } from "@/lib/utils";
import type { ExamPart } from "@prisma/client";
import { BookOpen, ClipboardCheck, BarChart3, ArrowRight, Info } from "lucide-react";

const EXAM_PARTS: { part: ExamPart; icon: string; desc: string }[] = [
  { part: "READING", icon: "BookOpen", desc: "Understand Dutch letters, forms and notices." },
  { part: "WRITING", icon: "PenLine", desc: "Write short texts, emails and messages." },
  { part: "LISTENING", icon: "Headphones", desc: "Follow spoken Dutch in daily situations." },
  { part: "SPEAKING", icon: "Mic", desc: "Speak confidently in everyday conversations." },
  { part: "KNM", icon: "Landmark", desc: "Know how Dutch society and institutions work." },
];

const STEPS = [
  {
    icon: BookOpen,
    title: "Read a short lesson",
    body: "Each module is broken into short lessons you can finish in about ten minutes.",
  },
  {
    icon: ClipboardCheck,
    title: "Check yourself with a quiz",
    body: "Answer a question and you find out straight away whether you were right, and why.",
  },
  {
    icon: BarChart3,
    title: "See how far you are",
    body: "Your dashboard shows which lessons are done and which quizzes you have passed.",
  },
];

const FAQS = [
  {
    q: "Is IntegreerNL free?",
    a: "Yes. Family-migrants have to pay for their own inburgering course or take a DUO loan, unlike asylum status holders whose course is funded. This platform is free to use.",
  },
  {
    q: "Does this replace the official exam?",
    a: "No. It is a study aid to help you prepare. For official exam registration, rules and deadlines always use inburgeren.nl (DUO).",
  },
  {
    q: "How finished is this?",
    a: "Not very — and that is on purpose. This is the first working version of a student project. What exists today: you can create an account, the five modules are mapped out, and the study assistant answers questions. What does not exist yet: the lessons and quizzes themselves. Writing those is the next piece of work.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink-100 bg-canvas-raised">
        <Container className="py-20 text-center">
          <p className="text-sm font-semibold text-accent-700">
            Free · No course fee, no DUO loan
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold text-ink-900 sm:text-5xl">
            Prepare for your inburgering exam, for free
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-body-muted">
            A simple study platform for people who moved to the Netherlands through
            marriage or family reunification and need to reach Dutch level B1.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/register" size="lg">
              Create a free account
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/login" variant="outline" size="lg">
              Log in
            </Button>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-b border-ink-100">
        <Container className="py-20">
          <h2 className="text-center font-display text-3xl font-bold text-ink-900">
            How it will work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-body-muted">
            The plan for each of the five modules. The accounts, the module
            structure and the study assistant work today; the lessons and quizzes
            are being written now.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className="rounded-lg border border-ink-100 bg-canvas-raised p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-600 text-white">
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">
                  {i + 1}. {s.title}
                </h3>
                <p className="mt-2 text-sm text-body-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Modules */}
      <section className="border-b border-ink-100 bg-canvas-raised">
        <Container className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink-900">
              Five modules, one per exam part
            </h2>
            <p className="mt-4 text-body-muted">
              To pass you need Reading, Writing, Listening and Speaking at B1, plus
              Knowledge of Dutch Society (KNM).
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {EXAM_PARTS.map(({ part, icon, desc }) => {
              const theme = MODULE_THEME[part];
              const meta = EXAM_PART_META[part];
              return (
                <div
                  key={part}
                  className="overflow-hidden rounded-lg border border-ink-100 bg-canvas"
                >
                  <div className={`h-1.5 ${theme.progressBar}`} aria-hidden="true" />
                  <div className="p-6">
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
              );
            })}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section>
        <Container className="py-20">
          <h2 className="text-center font-display text-3xl font-bold text-ink-900">
            Questions
          </h2>

          <div className="mx-auto mt-8 max-w-2xl">
            <div className="flex items-start gap-3 rounded-md border border-accent-200 bg-accent-50 p-5">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" aria-hidden="true" />
              <p className="text-sm text-accent-900">
                <strong className="font-semibold">
                  IntegreerNL is a student project, not an official government service.
                </strong>{" "}
                For official rules and registration, use{" "}
                <a
                  href="https://www.inburgeren.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2"
                >
                  inburgeren.nl
                </a>
                .
              </p>
            </div>

            <div className="mt-6 divide-y divide-ink-100 overflow-hidden rounded-lg border border-ink-100 bg-canvas-raised">
              {FAQS.map((faq) => (
                <details key={faq.q} className="p-6">
                  <summary className="cursor-pointer font-display font-semibold text-ink-900">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm text-body-muted">{faq.a}</p>
                </details>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button href="/register" size="lg">
                Create a free account
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
