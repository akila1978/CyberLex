import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const articles = await prisma.article.findMany({
    include: { citations: true, topic: true, country: true }
  });
  console.log('ARTICLES_COUNT:', articles.length);
  for (const a of articles) {
    console.log(JSON.stringify({
      id: a.id,
      title: a.title,
      slug: a.slug,
      status: a.status,
      topic: a.topic?.name,
      country: a.country?.name,
      citationsCount: a.citations.length,
      citations: a.citations.map(c => ({ title: c.title, url: c.sourceUrl, isVerified: c.isVerified }))
    }));
  }

  const statutes = await prisma.statute.findMany({ include: { country: true } });
  console.log('STATUTES_COUNT:', statutes.length);

  const cases = await prisma.caseStudy.findMany();
  console.log('CASES_COUNT:', cases.length);

  const updates = await prisma.legalUpdate.findMany();
  console.log('UPDATES_COUNT:', updates.length);

  const quiz = await prisma.quizQuestion.findMany();
  console.log('QUIZ_COUNT:', quiz.length);

  const glossary = await prisma.glossaryTerm.findMany();
  console.log('GLOSSARY_COUNT:', glossary.length);

  const corrections = await prisma.correction.findMany();
  console.log('CORRECTIONS_COUNT:', corrections.length);
}

check().catch(console.error).finally(() => prisma.$disconnect());
