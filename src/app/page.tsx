import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import {
  BookOpen,
  PenLine,
  Headphones,
  Mic,
  Landmark,
  Sparkles,
  BarChart3,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  Quote,
  CheckCircle2,
} from "lucide-react";

const EXAM_PARTS = [
  { icon: BookOpen, label: "Reading", nl: "Lezen", desc: "Understand Dutch texts, letters and forms." },
  { icon: PenLine, label: "Writing", nl: "Schrijven", desc: "Write short texts, emails and messages." },
  { icon: Headphones, label: "Listening", nl: "Luisteren", desc: "Follow spoken Dutch in daily situations." },
  { icon: Mic, label: "Speaking", nl: "Spreken", desc: "Speak confidently in everyday conversations." },
  { icon: Landmark, label: "Dutch Society", nl: "KNM", desc: "Know how Dutch society and institutions work." },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI study buddy, any time",
    desc: "Stuck on a grammar rule at 9pm after work? Ask the AI assistant for a simple explanation — no appointment needed.",
  },
  {
    icon: BarChart3,
    title: "Adaptive quizzes",
    desc: "Short quizzes per topic with instant feedback, so a spare 10 minutes is always useful — no wasted study time.",
  },
  {
    icon: CheckCircle2,
    title: "See real progress",
    desc: "A visual dashboard tracks what's done and what's left, so a three-year deadline feels manageable, not overwhelming.",
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
              adaptive quizzes, an AI study buddy, and real progress tracking.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/register" size="lg">
                Start learning free <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="#exam" variant="outline" size="lg">
                See the exam parts
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-500" /> No hidden fees
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-500" /> Study at your own pace
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 card-shadow">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-ink-900">Your progress</p>
                <Badge>B1 track</Badge>
              </div>
              <div className="mt-5 space-y-4">
                {EXAM_PARTS.map((part, i) => (
                  <div key={part.label} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <part.icon className="h-[18px] w-[18px]" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-ink-900">{part.label}</span>
                        <span className="text-slate-400">{[80, 45, 60, 20, 90][i]}%</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-brand-500"
                          style={{ width: `${[80, 45, 60, 20, 90][i]}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-slate-200 bg-white p-4 card-shadow sm:block">
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

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {EXAM_PARTS.map((part) => (
              <div
                key={part.label}
                className="group rounded-2xl border border-slate-200 p-6 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 group-hover:bg-white">
                  <part.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-ink-900">{part.label}</h3>
                <p className="text-xs font-medium text-brand-500">{part.nl}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">{part.desc}</p>
              </div>
            ))}
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
            <p className="mt-6 text-sm text-slate-400">
              Amina, 29 — illustrative persona based on family-migrant research
            </p>
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
          <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-14 text-center text-white sm:px-16">
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
