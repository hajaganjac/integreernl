"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, Loader2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setLoading(false);
      setError("Incorrect email or password. Please try again.");
      return;
    }

    // refresh() BEFORE push(). The App Router prefetches the protected nav
    // links while logged out and caches middleware's redirect back to
    // /login; pushing first replays that stale entry and bounces the user
    // back despite a valid session. Refreshing first invalidates the cache
    // so the push is resolved against the new session cookie.
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    router.refresh();
    router.push(callbackUrl);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600 ring-1 ring-inset ring-red-100">
          {error}
        </div>
      )}

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink-900">Email</span>
        <div className="flex items-center gap-2 rounded-xl border border-ink-100 px-3.5 py-2.5 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
          <Mail className="h-4 w-4 text-body-subtle" />
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="amina@example.com"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink-900">Password</span>
        <div className="flex items-center gap-2 rounded-xl border border-ink-100 px-3.5 py-2.5 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
          <Lock className="h-4 w-4 text-body-subtle" />
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </label>

      <Button type="submit" size="lg" disabled={loading} className="mt-2 w-full">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Signing in..." : "Log in"}
      </Button>

      <p className="text-center text-xs text-body-subtle">
        Demo tip: register a free account to try the full course and AI assistant.
      </p>
    </form>
  );
}
