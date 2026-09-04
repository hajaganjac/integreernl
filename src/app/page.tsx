import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  BarChart3,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { MODULE_THEME, MODULE_IMAGE } from "@/lib/moduleTheme";
import { ModuleIcon } from "@/components/courses/ModuleIcon";
import { EXAM_PART_META } from "@/lib/utils";
import type { ExamPart } from "@prisma/client";

const EXAM_PART_ORDER: { part: ExamPart; icon: string; desc: string }[] = [
  { part: "READING", icon: "BookOpen", desc: "Understand Dutch texts, letters and forms." },
  { part: "WRITING", icon: "PenLine", desc: "Write short texts, emails and messages." },
  { part: "LISTENING", icon: "Headphones", desc: "Follow spoken Dutch in daily situations." },
  { part: "SPEAKING", icon: "Mic", desc: "Speak confidently in everyday conversations." },
  { part: "KNM", icon: "Landmark", desc: "Know how Dutch society and institutions work." },
];

const MOCK_PROGRESS = [80, 45, 60, 20, 90];

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI study buddy, any time",
    desc: "Stuck on a grammar rule at 9pm after work? Ask the AI assistant for a simple explanation — no appointment needed.",
  },
  {
    icon: BarChart3,
    title: "Adaptive quizzes & flashcards",
    desc: "Short quizzes with instant feedback, plus flip-card vocabulary practice with pronunciation — so a spare 10 minutes is always useful.",
  },
  {
    icon: CheckCircle2,
    title: "See real progress",
    desc: "A visual dashboard, streaks and achievement badges track what's done and what's left — so three years feels manageable, not overwhelming.",
  },
];

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
    q: "Is the AI assistant always correct?",
    a: "The assistant is trained to help with everyday Dutch and exam topics, but it can make mistakes like any tool. Treat it as a practice partner, not an official source — cross-check important grammar rules with your course material.",
  },
  {
    q: "Who is this platform for?",
    a: "Primarily for people who moved to the Netherlands through marriage or family reunification and must reach Dutch level B1 within three years. Asylum status holders and other self-motivated learners are welcome too.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="grid-fade border-b border-slate-200">
        <Container className="grid grid-cols-1 items-center gap-12 py-20 sm:py-28 lg:grid-cols-2">
          <div>
            <Badge color="accent">Free &middot; No DUO loan needed</Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
              Pass your inburgering exam — <span className="text-brand-600">without paying for a course.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              IntegreerNL is a free, structured self-study platform for family-migrants
              working toward the Dutch B1 civic integration exam — with guided lessons,
              adaptive quizzes, vocabulary flashcards, an AI study buddy, and real progress tracking.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/register" size="lg">
                Start learning free <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="#exam" variant="outline" size="lg">
                See the exam parts
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-500" /> No hidden fees
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-500" /> Study at your own pace
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-80 w-full overflow-hidden rounded-3xl shadow-xl sm:h-96">
              <Image
                src="/images/hero-amsterdam.jpg"
                alt="Amsterdam canal houses at dusk"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-ink-900/5 to-transparent" />
            </div>

            <div className="absolute -bottom-8 -left-6 w-64 rounded-2xl border border-slate-200 bg-white p-5 card-shadow sm:-left-10">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-ink-900">Your progress</p>
                <Badge>B1 track</Badge>
              </div>
              <div className="mt-4 space-y-3">
                {EXAM_PART_ORDER.map(({ part, icon }, i) => {
                  const theme = MODULE_THEME[part];
                  return (
                    <div key={part} className="flex items-center gap-2.5">
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${theme.bgTint} ${theme.text}`}>
                        <ModuleIcon name={icon} className="h-3.5 w-3.5" />
                      </span>
                      <div className="h-1.5 w-full rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${theme.progressBar}`}
                          style={{ width: `${MOCK_PROGRESS[i]}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="absolute -top-6 -right-4 hidden rounded-xl border border-slate-200 bg-white p-4 card-shadow sm:block">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-accent-500">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-ink-900">AI assistant</p>
                  <p className="text-[11px] text-slate-400">&ldquo;Wanneer gebruik ik &lsquo;hebben&rsquo;?&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Problem stats */}
      <section className="border-b border-slate-200 bg-white">
        <Container className="py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-ink-900 sm:text-3xl">
              Integration is required by law. Paying for it shouldn&rsquo;t be required too.
            </h2>
            <p className="mt-4 text-slate-600">
              Asylum status holders get a municipality-funded course. Family-migrants who
              move here through marriage or reunification don&rsquo;t — they pay out of
              pocket or take a DUO loan, on top of building a new life.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <StatCard value="3 years" label="Legal deadline to reach B1 from your obligation letter" />
            <StatCard value="~€250" label="Exam fees alone (€50 per part) — before any course" />
            <StatCard value="€0" label="What it costs to study with IntegreerNL" accent />
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="border-b border-slate-200">
        <Container className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge>How it works</Badge>
            <h2 className="mt-4 text-2xl font-semibold text-ink-900 sm:text-3xl">
              Everything you need to study independently
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-7 card-shadow">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Exam parts */}
      <section id="exam" className="scroll-mt-20 border-b border-slate-200 bg-white">
        <Container className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge color="accent">The exam, explained</Badge>
            <h2 className="mt-4 text-2xl font-semibold text-ink-900 sm:text-3xl">
              Five modules, mapped directly to the inburgeringsexamen
            </h2>
            <p className="mt-4 text-slate-600">
              To pass, you need Reading, Writing, Listening and Speaking at B1, plus
              Knowledge of Dutch Society (KNM). Every IntegreerNL module targets one part.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {EXAM_PART_ORDER.map(({ part, icon, desc }) => {
              const theme = MODULE_THEME[part];
              const meta = EXAM_PART_META[part];
              const image = MODULE_IMAGE[part];
              return (
                <div
                  key={part}
                  className={`group overflow-hidden rounded-2xl border border-slate-200 transition-all hover:-translate-y-1 ${theme.borderHover}`}
                >
                  <div className="relative h-24 w-full overflow-hidden">
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 20vw, 50vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-75`} />
                    <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm">
                      <ModuleIcon name={icon} className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-ink-900">{meta.label}</h3>
                    <p className={`text-xs font-medium ${theme.text}`}>{meta.nl}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Button href="/register" size="lg">
              Explore the full course <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Persona / quote */}
      <section className="border-b border-slate-200">
        <Container className="py-20">
          <div className="mx-auto max-w-3xl rounded-2xl bg-ink-900 p-10 text-white sm:p-12">
            <Quote className="h-8 w-8 text-brand-300" />
            <p className="mt-4 text-lg leading-8 text-slate-100 sm:text-xl">
              &ldquo;I moved to Eindhoven after getting married, and I have three years to
              pass B1. Money is tight since we just set up a household together — a
              private course wasn&rsquo;t realistic. I just needed a clear place to start,
              and something that fits into a tired evening after work.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                A
              </span>
              <p className="text-sm text-slate-400">
                Amina, 29 — illustrative persona based on family-migrant research
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20">
        <Container className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-ink-900 sm:text-3xl">Frequently asked questions</h2>
          </div>

          <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white card-shadow">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-ink-900">
                  {faq.q}
                  <span className="ml-4 text-slate-400 transition-transform group-open:rotate-45">
                    <ArrowRight className="h-4 w-4 rotate-[-45deg]" />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA banner */}
      <section>
        <Container className="pb-24">
          <div className="relative overflow-hidden rounded-2xl px-8 py-16 text-center text-white sm:px-16">
            <Image
              src="/images/tulips-field.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 80vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900/80 via-ink-900/55 to-brand-800/80" />
            <div className="relative">
              <h2 className="text-2xl font-semibold sm:text-3xl">Your B1 journey starts today</h2>
              <p className="mx-auto mt-3 max-w-xl text-brand-100">
                Create a free account and get a personalised study plan across all five exam
                parts — no course fee, no loan, no waitlist.
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="/register" variant="secondary" size="lg">
                  Create free account <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function StatCard({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-8 text-center">
      <p className={`text-3xl font-semibold ${accent ? "text-accent-500" : "text-ink-900"}`}>{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{label}</p>
    </div>
  );
}
