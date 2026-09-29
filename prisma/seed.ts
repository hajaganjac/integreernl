import { PrismaClient, ExamPart } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * At this stage the seed only creates the five modules — one per part of
 * the inburgeringsexamen. They act as the skeleton of the course: the
 * structure is decided, the lessons and quizzes still have to be written.
 */
interface ModuleSeed {
  slug: string;
  examPart: ExamPart;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const MODULES: ModuleSeed[] = [
  {
    slug: "reading",
    examPart: "READING",
    title: "Reading (Lezen)",
    description:
      "Understanding Dutch letters, forms, notices and short articles at B1 level.",
    icon: "BookOpen",
    color: "brand",
  },
  {
    slug: "writing",
    examPart: "WRITING",
    title: "Writing (Schrijven)",
    description:
      "Writing short texts, formal messages and everyday forms with confidence.",
    icon: "PenLine",
    color: "accent",
  },
  {
    slug: "listening",
    examPart: "LISTENING",
    title: "Listening (Luisteren)",
    description:
      "Following everyday spoken Dutch — announcements, phone calls and conversations.",
    icon: "Headphones",
    color: "brand",
  },
  {
    slug: "speaking",
    examPart: "SPEAKING",
    title: "Speaking (Spreken)",
    description:
      "Practising the spoken situations you need for the exam and for daily life.",
    icon: "Mic",
    color: "accent",
  },
  {
    slug: "knm",
    examPart: "KNM",
    title: "Dutch Society (KNM)",
    description:
      "Kennis van de Nederlandse Maatschappij — how Dutch government, housing, healthcare and work fit together.",
    icon: "Landmark",
    color: "brand",
  },
];

async function main() {
  console.log("Seeding IntegreerNL modules...");

  for (let i = 0; i < MODULES.length; i++) {
    const m = MODULES[i];
    await prisma.module.upsert({
      where: { slug: m.slug },
      update: {
        examPart: m.examPart,
        title: m.title,
        description: m.description,
        icon: m.icon,
        color: m.color,
        order: i,
      },
      create: { ...m, order: i },
    });
    console.log(`  ✓ ${m.title}`);
  }

  console.log("Seed complete — 5 modules, no lessons yet.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
