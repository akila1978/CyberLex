import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verify() {
  try {
    const userCount = await prisma.user.count();
    const topicCount = await prisma.topic.count();
    const countryCount = await prisma.country.count();
    const statuteCount = await prisma.statute.count();
    const caseCount = await prisma.caseStudy.count();
    const glossaryCount = await prisma.glossaryTerm.count();
    const articleCount = await prisma.article.count();

    const admin = await prisma.user.findUnique({
      where: { email: "editorial@cyberlex.io" },
      select: { email: true, name: true, role: true, passwordHash: true },
    });

    console.log("=== CYBERLEX MYSQL 8.x VERIFICATION ===");
    console.log(`Users:         ${userCount}`);
    console.log(`Topics:        ${topicCount}`);
    console.log(`Countries:     ${countryCount}`);
    console.log(`Statutes:      ${statuteCount}`);
    console.log(`Case Studies:  ${caseCount}`);
    console.log(`Glossary Terms:${glossaryCount}`);
    console.log(`Articles:      ${articleCount}`);
    console.log(`Admin email:   ${admin?.email}`);
    console.log(`Admin role:    ${admin?.role}`);
    console.log(`Admin has hash:${Boolean(admin?.passwordHash)}`);
    console.log("========================================");
  } catch (error) {
    console.error("Verification failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
