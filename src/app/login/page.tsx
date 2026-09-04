import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { GraduationCap } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white">
            <GraduationCap className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-2xl font-semibold text-ink-900">Welcome back</h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Log in to continue your inburgering study plan.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 card-shadow">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          New to IntegreerNL?{" "}
          <Link href="/register" className="font-medium text-brand-600 hover:text-brand-700">
            Create a free account
          </Link>
        </p>
      </div>
    </div>
  );
}
