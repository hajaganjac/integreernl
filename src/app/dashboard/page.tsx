import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getOverallProgress } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { ModuleIcon } from "@/components/courses/ModuleIcon";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { BadgeShelf } from "@/components/dashboard/BadgeShelf";
import { BookOpenCheck, ClipboardCheck, Flame, ArrowRight } from "lucide-react";
import { MODULE_THEME } from "@/lib/moduleTheme";
import { BADGE_DEFS, computeEarnedBadges } from "@/lib/badges";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user.id;
  const [data, user, allAttempts] = await Promise.all([
    getOverallProgress(userId),
    prisma.user.findUnique({ where: { id: userId }, select: { currentStreak: true, longestStreak: true } }),
    prisma.quizAttempt.findMany({ where: { userId }, select: { score: true, total: true } }),
  ]);

  const nextModule = data.modules.find((m) => m.percent < 100);
  const currentStreak = user?.currentStreak ?? 0;
  const hasPerfectQuiz = allAttempts.some((a) => a.total > 0 && a.score === a.total);

  const earnedBadges = computeEarnedBadges({
    completedLessons: data.completedLessons,
    hasPerfectQuiz,
    modules: data.modules,
    currentStreak,
    overallPercent: data.overallPercent,
  });

  return (
    <Container className="py-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge>Dashboard</Badge>
          <h1 className="mt-3 text-3xl font-semibold text-ink-900">
            Welcome back, {session!.user.name?.split(" ")[0]}
          </h1>
          <p className="mt-1.5 text-slate-500">Here&rsquo;s where your B1 study plan stands today.</p>
        </div>
        {nextModule && (
          <Button href={`/courses/${nextModule.slug}`} size="lg">
            Continue {nextModule.title} <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <StatCard
          icon={<BookOpenCheck className="h-5 w-5" />}
          label="Lessons completed"
          value={`${data.completedLessons} / ${data.totalLessons}`}
        />
        <StatCard
          icon={<ClipboardCheck className="h-5 w-5" />}
          label="Quizzes passed"
          value={`${data.passedQuizzes} / ${data.totalQuizzes}`}
        />
        <StatCard
          icon={<Flame className="h-5 w-5" />}
          label="Day streak"
          value={`${currentStreak}`}
          accent
        />
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 card-shadow">
          <CircularProgress value={data.overallPercent} size={64} strokeWidth={6} color="#1f6469" />
          <div>
            <p className="text-sm font-medium text-ink-900">Overall progress</p>
            <p className="text-xs text-slate-500">across all 5 modules</p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 card-shadow">
          <h2 className="font-semibold text-ink-900">Progress by module</h2>
          <div className="mt-6 space-y-5">
            {data.modules.map((m) => {
              const theme = MODULE_THEME[m.examPart];
              return (
                <Link
                  key={m.id}
                  href={`/courses/${m.slug}`}
                  className="group flex items-center gap-4 rounded-xl p-2 -m-2 hover:bg-slate-50"
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${theme.bgTint} ${theme.text}`}>
                    <ModuleIcon name={m.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-ink-900">{m.title}</span>
                      <span className="text-slate-400">{m.percent}%</span>
                    </div>
                    <ProgressBar value={m.percent} className="mt-2" barClassName={theme.progressBar} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 card-shadow">
          <h2 className="font-semibold text-ink-900">Study snapshot</h2>
          <DashboardCharts
            modules={data.modules.map((m) => ({ name: m.title, percent: m.percent }))}
            attempts={data.recentAttempts
              .slice()
              .reverse()
              .map((a, i) => ({
                name: `#${i + 1}`,
                score: Math.round((a.score / a.total) * 100),
                module: a.quiz.module.title,
              }))}
          />
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 card-shadow">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-ink-900">Achievements</h2>
          <span className="text-xs text-slate-400">{earnedBadges.size}/{BADGE_DEFS.length} unlocked</span>
        </div>
        <div className="mt-5">
          <BadgeShelf badges={BADGE_DEFS} earned={earnedBadges} />
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 card-shadow">
        <h2 className="font-semibold text-ink-900">Recent quiz attempts</h2>
        {data.recentAttempts.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            You haven&rsquo;t taken a quiz yet. Finish a module&rsquo;s lessons, then test yourself —
            it&rsquo;s the fastest way to see what&rsquo;s sticking.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400">
                  <th className="pb-2 font-medium">Module</th>
                  <th className="pb-2 font-medium">Score</th>
                  <th className="pb-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.recentAttempts.map((a) => (
                  <tr key={a.id} className="border-b border-slate-50 last:border-0">
                    <td className="py-2.5 text-ink-900">{a.quiz.module.title}</td>
                    <td className="py-2.5">
                      <Badge color={a.score / a.total >= 0.7 ? "brand" : "slate"}>
                        {a.score}/{a.total}
                      </Badge>
                    </td>
                    <td className="py-2.5 text-slate-400">
                      {new Date(a.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Container>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 card-shadow">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
          accent ? "bg-orange-50 text-accent-500" : "bg-brand-50 text-brand-600"
        }`}
      >
        {icon}
      </span>
      <p className="mt-4 text-2xl font-semibold text-ink-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}
