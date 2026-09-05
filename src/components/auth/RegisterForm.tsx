"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { User, Mail, Lock, Loader2 } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        setError("Account created, but automatic sign-in failed. Please log in.");
        setLoading(false);
        router.push("/login");
        return;
      }

      // refresh() before push() — see the note in LoginForm: the client
      // router caches middleware's logged-out redirect for prefetched
      // protected routes and would otherwise bounce us back to /login.
      router.refresh();
      router.push("/dashboard");
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600 ring-1 ring-inset ring-red-100">
          {error}
        </div>
      )}

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink-900">Full name</span>
        <div className="flex items-center gap-2 rounded-xl border border-ink-100 px-3.5 py-2.5 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
          <User className="h-4 w-4 text-body-subtle" />
          <input
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Amina Yilmaz"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </label>

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
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </label>

      <Button type="submit" size="lg" disabled={loading} className="mt-2 w-full">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Creating account..." : "Create free account"}
      </Button>

      <p className="text-center text-xs text-body-subtle">
        By signing up you agree this is a study aid, not official government advice.
      </p>
    </form>
  );
}
