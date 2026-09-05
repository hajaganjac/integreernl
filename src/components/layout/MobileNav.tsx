"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { signOutAction } from "@/lib/actions";

const NAV_LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/assistant", label: "AI Assistant" },
  { href: "/dashboard", label: "Dashboard" },
];

export function MobileNav({ loggedIn }: { loggedIn: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-700 hover:bg-brand-50"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-16 border-b border-ink-100 bg-canvas-raised shadow-lg">
          <nav className="flex flex-col p-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-ink-700 hover:bg-brand-50"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-ink-100 pt-3">
              {loggedIn ? (
                <button
                  onClick={() => signOutAction()}
                  className="rounded-lg border border-ink-100 px-4 py-2.5 text-sm font-medium text-ink-700 text-left"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-2.5 text-sm font-medium text-ink-700"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="rounded-lg bg-brand-600 px-4 py-2.5 text-center text-sm font-medium text-white"
                  >
                    Start learning
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
