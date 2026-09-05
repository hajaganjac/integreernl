import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { GraduationCap } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-canvas-sunken px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white">
            <GraduationCap className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-2xl font-semibold text-ink-900">Create your free account</h1>
          <p className="mt-1.5 text-sm text-body-muted">
            No fees, no course loan — just sign up and start studying today.
          </p>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-canvas-raised p-8 card-shadow">
          <RegisterForm />
        </div>

        <p className="mt-6 text-center text-sm text-body-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-brand-600 hover:text-brand-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
