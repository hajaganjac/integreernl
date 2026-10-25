import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-100 bg-canvas-raised">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo withTagline size={30} />
            <p className="mt-4 max-w-sm text-sm leading-6 text-body-muted">
              Practical Dutch for expats and internationals who are starting from the
              beginning. Short, realistic conversations instead of grammar drills — built
              and tested as a student project at Fontys ICT.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900">Practise</h3>
            <ul className="mt-4 space-y-3 text-sm text-body-muted">
              <li>
                <Link href="/practice" className="hover:text-brand-600">
                  Everyday situations
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-brand-600">
                  Study assistant
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-brand-600">
                  Your progress
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900">About</h3>
            <ul className="mt-4 space-y-3 text-sm text-body-muted">
              <li>
                <Link href="/#faq" className="hover:text-brand-600">
                  Questions
                </Link>
              </li>
              <li>
                <a
                  href="mailto:ha.jaganjac@gmail.com?subject=IntegreerNL%20research"
                  className="hover:text-brand-600"
                >
                  Take part in the research
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-ink-100 pt-6 text-xs text-body-subtle sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} IntegreerNL. A student project in
            development, not a finished product.
          </p>
          <p>Built in Eindhoven.</p>
        </div>
      </Container>
    </footer>
  );
}
