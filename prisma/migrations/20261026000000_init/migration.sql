-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('A0', 'A1', 'A2');

-- CreateEnum
CREATE TYPE "Speaker" AS ENUM ('PARTNER', 'LEARNER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scenario" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dutchTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "setting" TEXT NOT NULL DEFAULT '',
    "level" "Level" NOT NULL DEFAULT 'A1',
    "icon" TEXT NOT NULL DEFAULT 'MessageCircle',
    "minutes" INTEGER NOT NULL DEFAULT 5,
    "order" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Scenario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScenarioStep" (
    "id" TEXT NOT NULL,
    "scenarioId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "speaker" "Speaker" NOT NULL,
    "dutch" TEXT NOT NULL,
    "english" TEXT NOT NULL,
    "hint" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ScenarioStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScenarioChoice" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "dutch" TEXT NOT NULL,
    "english" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "feedback" TEXT NOT NULL,

    CONSTRAINT "ScenarioChoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScenarioProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scenarioId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "bestCorrect" INTEGER NOT NULL DEFAULT 0,
    "totalChoices" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ScenarioProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Scenario_slug_key" ON "Scenario"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ScenarioProgress_userId_scenarioId_key" ON "ScenarioProgress"("userId", "scenarioId");

-- AddForeignKey
ALTER TABLE "ScenarioStep" ADD CONSTRAINT "ScenarioStep_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScenarioChoice" ADD CONSTRAINT "ScenarioChoice_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "ScenarioStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScenarioProgress" ADD CONSTRAINT "ScenarioProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScenarioProgress" ADD CONSTRAINT "ScenarioProgress_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

