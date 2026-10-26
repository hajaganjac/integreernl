import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScenarioIcon } from "@/components/scenarios/ScenarioIcon";
import { SCENARIOS } from "@/content/scenarios";
import { LEVEL_THEME } from "@/lib/levelTheme";
import { MessageCircle, MousePointerClick, Lightbulb, ArrowRight, Info } from "lucide-react";

const STEPS = [
  {
    icon: MessageCircle,
    title: "A real situation",
    body: "You are in a café, at the counter. The barista says something in Dutch, and you read what it means.",
  },
  {
    icon: MousePointerClick,
    title: "You choose what to say",
    body: "Two or three replies, all of them things a learner might actually say. You pick one.",
  },
  {
    icon: Lightbulb,
    title: "You find out why",
    body: "Not just right or wrong — why one reply sounds natural to a Dutch person and another sounds blunt.",
  },
];

const FAQS = [
  {
    q: "Who is this for?",
    a: "Expats and internationals living, working or studying in the Netherlands who are beginners in Dutch (roughly A0 to A2) and want the Dutch they need in daily life. It is not aimed at people preparing for the inburgering exam — that is a different level with different content.",
  },
  {
    q: "How finished is this?",
    a: "Early. One situation is fully built: ordering coffee. Five more are listed but not written. What gets built next depends on what people tell me they need — I am interviewing expats about this now, and the answers decide the content.",
  },
  {
    q: "What does it cost?",
    a: "Nothing right now. It is a prototype being tested, so there is no payment and no account charge. Whether there is ever a price, and what it would be, is one of the things I am researching — I have not decided.",
  },
  {
    q: "Why build this when Duolingo exists?",
    a: "Honestly, that is the question I am testing. Courses run from roughly €528 to €875 for a single level, while apps cost a few euros a month. My hunch is there is room in between for something that focuses on real situations — but a hunch is not a finding, and if the interviews say otherwise I will change direction.",
  },
];

export default function Home() {
  const scenarios = SCENARIOS.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink-100 bg-canvas-raised">
        <Container className="py-20 text-center">
          <p className="text-sm font-semibold text-accent-700">
            For expats and internationals learning Dutch
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold text-ink-900 sm:text-5xl">
            Practise the Dutch you actually need
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-body-muted">
            Short, realistic conversations — ordering a coffee, talking to a colleague,
            asking where something is. You choose what to say and find out how it lands.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/practice/ordering-coffee" size="lg">
              Try a conversation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/practice" variant="outline" size="lg">
              See the situations
            </Button>
          </div>
          <p className="mt-6 text-sm text-body-subtle">
            Free while it is being tested. No payment details.
          </p>
        </Container>
      </section>

      {/* How a situation works */}
      <section className="border-b border-ink-100">
        <Container className="py-20">
          <h2 className="text-center font-display text-3xl font-bold text-ink-900">
            How a situation works
          </h2>
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

          <div className="mt-10 text-center">
            <Button href="/practice" variant="outline">
              Look at the situations
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Situations */}
      <section className="border-b border-ink-100 bg-canvas-raised">
        <Container className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink-900">
              Situations, not grammar chapters
            </h2>
            <p className="mt-4 text-body-muted">
              The content is organised by what you are trying to do, not by verb tense. One
              is built so far; the rest are candidates.
            </p>
          </div>

          <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scenarios.map((s) => {
              const theme = LEVEL_THEME[s.level];
              return (
                <li
                  key={s.slug}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${
                    s.published
                      ? "border-ink-100 bg-canvas"
                      : "border-dashed border-ink-200 bg-canvas"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${theme.bgTint} ${theme.text}`}
                  >
                    <ScenarioIcon name={s.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-ink-900">{s.title}</span>
                    <span className="block text-xs text-body-subtle">{s.dutchTitle}</span>
                  </span>
                  <span className="text-xs font-semibold text-body-subtle">
                    {s.published ? theme.label : "soon"}
                  </span>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Questions */}
      <section>
        <Container className="py-20">
          <h2 className="text-center font-display text-3xl font-bold text-ink-900">Questions</h2>

          <div className="mx-auto mt-8 max-w-2xl">
            <div className="flex items-start gap-3 rounded-md border border-accent-200 bg-accent-50 p-5">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" aria-hidden="true" />
              <p className="text-sm text-accent-900">
                <strong className="font-semibold">
                  This is a student project in development, not a finished product.
                </strong>{" "}
                I am a Fontys ICT student researching how expats learn Dutch, and this
                prototype is part of that research. It is being tested and will change.
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

            <div className="mt-10 rounded-lg border border-ink-100 bg-canvas-raised p-6 text-center">
              <p className="font-display font-semibold text-ink-900">
                Learning Dutch as an expat? I want to hear from you.
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-body-muted">
                I am interviewing people about what is actually hard about learning Dutch
                here. What you say shapes what gets built next.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href="/practice/ordering-coffee">
                  Try the prototype
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Link
                  href="mailto:ha.jaganjac@gmail.com?subject=IntegreerNL%20research"
                  className="inline-flex items-center justify-center rounded-md border border-ink-200 bg-canvas-raised px-5 py-2.5 text-sm font-semibold text-ink-900 hover:bg-ink-50"
                >
                  Take part in the research
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
