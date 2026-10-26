import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { Logo } from "@/components/ui/Logo";

const NAV_LINKS = [
  { href: "/practice", label: "Practice" },
  { href: "/assistant", label: "Assistant" },
  { href: "/dashboard", label: "Progress" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/70 bg-canvas-raised/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold text-ink-900">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3.5 py-2 text-sm font-medium text-ink-800 transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Button href="/practice" size="sm">
            Try a conversation
          </Button>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
