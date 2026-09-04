import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-semibold text-ink-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <GraduationCap className="h-4 w-4" />
              </span>
              <span>
                Integreer<span className="text-brand-600">NL</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
              A free, independent study platform for the Dutch civic integration exam
              (inburgering). Built for family-migrants who fund their own path to B1 —
              structured lessons, adaptive quizzes and an AI study buddy, at no cost.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900">Study</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li><Link href="/courses" className="hover:text-brand-600">All modules</Link></li>
              <li><Link href="/assistant" className="hover:text-brand-600">AI assistant</Link></li>
              <li><Link href="/dashboard" className="hover:text-brand-600">My progress</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900">About</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li><Link href="/#exam" className="hover:text-brand-600">The exam, explained</Link></li>
              <li><Link href="/#faq" className="hover:text-brand-600">FAQ</Link></li>
              <li>
                <a
                  href="https://www.inburgeren.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-600"
                >
                  Official DUO / Rijksoverheid
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} IntegreerNL. A student research project, not an official government service.</p>
          <p>Built with care in Eindhoven.</p>
        </div>
      </Container>
    </footer>
  );
}
