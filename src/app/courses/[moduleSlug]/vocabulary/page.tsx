import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Flashcards } from "@/components/courses/Flashcards";
import { MODULE_THEME } from "@/lib/moduleTheme";

export default async function VocabularyPage({
  params,
}: {
  params: Promise<{ moduleSlug: string }>;
}) {
  const { moduleSlug } = await params;

  const courseModule = await prisma.module.findUnique({
    where: { slug: moduleSlug },
    include: { vocabulary: { orderBy: { order: "asc" } } },
  });
  if (!courseModule || courseModule.vocabulary.length === 0) notFound();

  const theme = MODULE_THEME[courseModule.examPart];

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-2xl">
        <Link href={`/courses/${courseModule.slug}`} className={`text-sm font-medium ${theme.text} hover:opacity-80`}>
          &larr; {courseModule.title}
        </Link>

        <div className="mt-4">
          <Badge color="accent">Vocabulary</Badge>
          <h1 className="mt-3 text-3xl font-semibold text-ink-900">Flashcards: {courseModule.title}</h1>
          <p className="mt-2 text-body-muted">
            Flip each card, listen to the pronunciation, and mark whether you knew it.
          </p>
        </div>

        <div className="mt-8">
          <Flashcards
            items={courseModule.vocabulary}
            moduleSlug={courseModule.slug}
            theme={{
              gradient: theme.gradient,
              text: theme.text,
              bgTint: theme.bgTint,
              solid: theme.solid,
            }}
          />
        </div>
      </div>
    </Container>
  );
}
