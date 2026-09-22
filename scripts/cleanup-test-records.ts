import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function cleanup() {
  console.log("Cleaning up test and QA records from MySQL...");

  const delGlossary = await prisma.glossaryTerm.deleteMany({
    where: {
      OR: [
        { term: { startsWith: "QA Audit Term" } },
        { term: { startsWith: "Test " } },
      ],
    },
  });
  console.log(`Deleted ${delGlossary.count} test glossary terms`);

  const delArticles = await prisma.article.deleteMany({
    where: {
      OR: [
        { slug: { startsWith: "qa-audit" } },
        { slug: { startsWith: "test-" } },
        { title: { startsWith: "QA " } },
        { title: { startsWith: "Test " } },
      ],
    },
  });
  console.log(`Deleted ${delArticles.count} test articles`);

  const delCorrections = await prisma.correction.deleteMany({
    where: {
      OR: [
        { submitterName: "Audit Tester" },
        { submitterEmail: "tester@cyberlex.io" },
        { description: { contains: "Test submission" } },
      ],
    },
  });
  console.log(`Deleted ${delCorrections.count} test corrections`);

  const delCases = await prisma.caseStudy.deleteMany({
    where: {
      OR: [
        { title: { startsWith: "QA Audit" } },
        { title: { startsWith: "Test " } },
      ],
    },
  });
  console.log(`Deleted ${delCases.count} test cases`);

  const delUpdates = await prisma.legalUpdate.deleteMany({
    where: {
      OR: [
        { title: { startsWith: "QA Audit" } },
        { title: { startsWith: "Test " } },
      ],
    },
  });
  console.log(`Deleted ${delUpdates.count} test updates`);

  const delQuiz = await prisma.quizQuestion.deleteMany({
    where: {
      OR: [
        { question: { startsWith: "QA Audit" } },
        { question: { startsWith: "Under statutory cyber law, what constitutes" } },
      ],
    },
  });
  console.log(`Deleted ${delQuiz.count} test quiz questions`);

  // Deduplicate citations on Sri Lanka guide
  const slArticle = await prisma.article.findUnique({
    where: { slug: "sri-lanka-computer-crimes-act-guide" },
    include: { citations: true },
  });
  if (slArticle && slArticle.citations.length > 1) {
    const deleteIds = slArticle.citations.slice(1).map((c) => c.id);
    await prisma.citation.deleteMany({ where: { id: { in: deleteIds } } });
    console.log(`Deduplicated ${deleteIds.length} redundant citations on Sri Lanka guide`);
  }

  console.log("Cleanup completed.");
}

cleanup()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
