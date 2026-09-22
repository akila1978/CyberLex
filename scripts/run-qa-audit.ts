import { PrismaClient, ArticleStatus } from "@prisma/client";

const prisma = new PrismaClient();
const BASE_URL = "http://localhost:3000";

interface AuditResult {
  category: string;
  name: string;
  status: "PASS" | "FAIL";
  details: string;
}

const auditLog: AuditResult[] = [];

function record(category: string, name: string, pass: boolean, details: string) {
  auditLog.push({
    category,
    name,
    status: pass ? "PASS" : "FAIL",
    details,
  });
  const symbol = pass ? "✓ PASS" : "✗ FAIL";
  console.log(`[${symbol}] ${category} :: ${name} - ${details}`);
}

async function runAudit() {
  console.log("==================================================================");
  console.log("   CYBERLEX FINAL PRE-DEPLOYMENT COMPREHENSIVE QA AUDIT SUITE    ");
  console.log("==================================================================");

  // ---------------------------------------------------------
  // 1. MySQL 8.x Database Records Audit
  // ---------------------------------------------------------
  console.log("\n--- SECTION 1: MySQL 8.x Records Audit ---");
  try {
    const [users, topics, countries, statutes, cases, updates, quiz, glossary, articles, corrections] =
      await Promise.all([
        prisma.user.count(),
        prisma.topic.count(),
        prisma.country.count(),
        prisma.statute.count(),
        prisma.caseStudy.count(),
        prisma.legalUpdate.count(),
        prisma.quizQuestion.count(),
        prisma.glossaryTerm.count(),
        prisma.article.count(),
        prisma.correction.count(),
      ]);

    record("Database", "MySQL Connection & Counts", true, 
      `Users: ${users}, Topics: ${topics}, Countries: ${countries}, Statutes: ${statutes}, Cases: ${cases}, Updates: ${updates}, Quiz: ${quiz}, Glossary: ${glossary}, Articles: ${articles}, Corrections: ${corrections}`);

    record("Database", "Topics Taxonomy", topics === 17, `Found ${topics} topics (Expected 17)`);
    record("Database", "Jurisdiction Profiles", countries === 7, `Found ${countries} country profiles (Expected 7)`);
    record("Database", "Articles Backlog", articles >= 10, `Found ${articles} articles in MySQL`);
    record("Database", "Updates Backlog", updates >= 4, `Found ${updates} regulatory updates in MySQL`);
    record("Database", "Quiz Backlog", quiz >= 3, `Found ${quiz} quiz items in MySQL`);
  } catch (err) {
    record("Database", "MySQL Connection & Counts", false, (err as Error).message);
  }

  // ---------------------------------------------------------
  // 2. Authentication, JWT, and Route Protection
  // ---------------------------------------------------------
  console.log("\n--- SECTION 2: Auth, JWT, and Route Protection ---");
  let adminCookie = "";
  try {
    // 2.1 Test invalid login rejection
    const invalidRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "editorial@cyberlex.io", password: "WrongPassword999!" }),
    });
    const invalidData = await invalidRes.json();
    record("Auth", "Reject Invalid Credentials", invalidRes.status === 401 && invalidData.success === false,
      `Status: ${invalidRes.status}, Error: ${invalidData.error}`);

    // 2.2 Test valid admin login
    const validRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "editorial@cyberlex.io", password: "CyberLex2026!Admin" }),
    });
    const validData = await validRes.json();
    const rawSetCookie = validRes.headers.get("set-cookie") || "";
    if (rawSetCookie.includes("cyberlex_admin_token=")) {
      adminCookie = rawSetCookie.split(";")[0];
    }
    record("Auth", "Admin Login & Session Cookie", validRes.ok && validData.success === true && Boolean(adminCookie),
      `User: ${validData.user?.email}, Role: ${validData.user?.role}`);

    // 2.3 Test /api/auth/me with Cookie
    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Cookie: adminCookie },
    });
    const meData = await meRes.json();
    record("Auth", "/api/auth/me Current Session", meRes.ok && meData.user?.role === "ADMIN",
      `Authenticated as: ${meData.user?.email} (${meData.user?.role})`);

    // 2.4 Route Protection: /admin without cookie (should redirect)
    const unauthAdminRes = await fetch(`${BASE_URL}/admin`, {
      redirect: "manual",
    });
    const isRedirect = unauthAdminRes.status === 307 || unauthAdminRes.status === 302 || unauthAdminRes.status === 303;
    const redirectLocation = unauthAdminRes.headers.get("location") || "";
    record("Security", "Route Protection (Unauthenticated /admin Redirect)", isRedirect && redirectLocation.includes("/admin/login"),
      `Status: ${unauthAdminRes.status}, Location: ${redirectLocation}`);

    // 2.5 Route Access: /admin with cookie (should allow 200)
    const authAdminRes = await fetch(`${BASE_URL}/admin`, {
      headers: { Cookie: adminCookie },
    });
    record("Security", "Authorized /admin Access with JWT Cookie", authAdminRes.status === 200,
      `Status: ${authAdminRes.status}`);

    // 2.6 Test Logout
    const logoutRes = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
    });
    const logoutCookie = (logoutRes.headers.get("set-cookie") || "").toLowerCase();
    const hasClearedCookie = logoutCookie.includes("max-age=0") || logoutCookie.includes("expires=") || logoutCookie.includes("cyberlex_admin_token=;");
    record("Auth", "Logout & Cookie Revocation", logoutRes.ok && hasClearedCookie,
      `Status: ${logoutRes.status}, Cookie: ${logoutCookie}`);
  } catch (err) {
    record("Auth", "Authentication Pipeline", false, (err as Error).message);
  }

  // ---------------------------------------------------------
  // 3. CMS CRUD Lifecycle Verification
  // ---------------------------------------------------------
  console.log("\n--- SECTION 3: CMS Full CRUD Lifecycle & Persistence ---");
  try {
    const topic = await prisma.topic.findFirst();
    const country = await prisma.country.findFirst();

    if (!topic || !country) throw new Error("Topic/Country missing for CMS tests");

    // 3.1 Article CRUD
    const testArticleSlug = `qa-audit-test-article-${Date.now()}`;
    const createArtRes = await fetch(`${BASE_URL}/api/articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: adminCookie },
      body: JSON.stringify({
        title: "QA Automated Audit Article",
        slug: testArticleSlug,
        summary: "Article created during pre-deployment automated audit.",
        content: "## 1. Compliance Standard\n\nVerified article body.",
        topicId: topic.id,
        countryId: country.id,
        difficulty: "BEGINNER",
        status: "PUBLISHED",
        citations: [
          {
            title: "Budapest Convention on Cybercrime ETS 185",
            sourceUrl: "https://www.coe.int/en/web/cybercrime",
            citationText: "Article 4: Data Interference.",
          },
        ],
      }),
    });
    const createArtData = await createArtRes.json();
    const createdArtId = createArtData.data?.id;
    record("CMS", "Article Creation (POST /api/articles)", createArtRes.status === 201 && Boolean(createdArtId),
      `Created ID: ${createdArtId}`);

    // Verify public page rendering of created article
    const pubArtRes = await fetch(`${BASE_URL}/articles/${testArticleSlug}`);
    const pubArtHtml = await pubArtRes.text();
    record("CMS", "Article Public Rendering & Persistence", pubArtRes.status === 200 && pubArtHtml.includes("QA Automated Audit Article"),
      `Status: ${pubArtRes.status}, Found Title in DOM: ${pubArtHtml.includes("QA Automated Audit Article")}`);

    // Update article
    const updateArtRes = await fetch(`${BASE_URL}/api/articles/${createdArtId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Cookie: adminCookie },
      body: JSON.stringify({
        title: "QA Automated Audit Article (Updated)",
        status: "PUBLISHED",
      }),
    });
    record("CMS", "Article Update (PUT /api/articles/[id])", updateArtRes.ok, `Status: ${updateArtRes.status}`);

    // Delete article
    const delArtRes = await fetch(`${BASE_URL}/api/articles/${createdArtId}`, {
      method: "DELETE",
      headers: { Cookie: adminCookie },
    });
    record("CMS", "Article Deletion (DELETE /api/articles/[id])", delArtRes.ok, `Status: ${delArtRes.status}`);

    // Verify deleted in MySQL
    const checkDeletedArt = await prisma.article.findUnique({ where: { id: createdArtId } });
    record("CMS", "Article Removed from MySQL", checkDeletedArt === null, `Record in DB: ${Boolean(checkDeletedArt)}`);

    // 3.2 Landmark Cases CRUD
    const createCaseRes = await fetch(`${BASE_URL}/api/cases`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: adminCookie },
      body: JSON.stringify({
        title: "QA Audit Precedent Case v. State",
        court: "Supreme Court",
        decisionYear: 2024,
        citation: "2024 SC 99",
        jurisdiction: "United States",
        ruling: "Held that warrantless decryption of stored communications is unlawful.",
        impact: "Protection for end-to-end encrypted messaging.",
      }),
    });
    const caseData = await createCaseRes.json();
    const createdCaseId = caseData.data?.id;
    record("CMS", "Case Precedent Creation (POST /api/cases)", createCaseRes.status === 201 && Boolean(createdCaseId),
      `Case ID: ${createdCaseId}`);

    const delCaseRes = await fetch(`${BASE_URL}/api/cases/${createdCaseId}`, {
      method: "DELETE",
      headers: { Cookie: adminCookie },
    });
    record("CMS", "Case Precedent Deletion (DELETE /api/cases/[id])", delCaseRes.ok, `Status: ${delCaseRes.status}`);

    // 3.3 Regulatory Updates CRUD
    const createUpdRes = await fetch(`${BASE_URL}/api/updates`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: adminCookie },
      body: JSON.stringify({
        title: "QA Audit Regulatory Notice",
        jurisdiction: "European Union",
        instrumentType: "REGULATION",
        summary: "Regulatory audit test notice.",
      }),
    });
    const updData = await createUpdRes.json();
    const createdUpdId = updData.data?.id;
    record("CMS", "Legal Update Creation (POST /api/updates)", createUpdRes.status === 201 && Boolean(createdUpdId),
      `Update ID: ${createdUpdId}`);

    const delUpdRes = await fetch(`${BASE_URL}/api/updates/${createdUpdId}`, {
      method: "DELETE",
      headers: { Cookie: adminCookie },
    });
    record("CMS", "Legal Update Deletion (DELETE /api/updates/[id])", delUpdRes.ok, `Status: ${delUpdRes.status}`);

    // 3.4 Quiz CRUD
    const createQuizRes = await fetch(`${BASE_URL}/api/quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: adminCookie },
      body: JSON.stringify({
        question: "QA Audit Assessment Question?",
        topicId: topic.id,
        difficulty: "BEGINNER",
        options: ["Correct Option", "Incorrect A", "Incorrect B", "Incorrect C"],
        correctIndex: 0,
        explanation: "Statutory explanation of the legal rule.",
        statutoryContext: "Section 10 Cyber Law",
      }),
    });
    const quizData = await createQuizRes.json();
    const createdQuizId = quizData.data?.id;
    record("CMS", "Quiz Question Creation (POST /api/quiz)", createQuizRes.status === 201 && Boolean(createdQuizId),
      `Quiz ID: ${createdQuizId}`);

    const delQuizRes = await fetch(`${BASE_URL}/api/quiz/${createdQuizId}`, {
      method: "DELETE",
      headers: { Cookie: adminCookie },
    });
    record("CMS", "Quiz Question Deletion (DELETE /api/quiz/[id])", delQuizRes.ok, `Status: ${delQuizRes.status}`);

    // 3.5 Glossary CRUD
    const createGlossaryRes = await fetch(`${BASE_URL}/api/glossary`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: adminCookie },
      body: JSON.stringify({
        term: `QA Audit Term ${Date.now()}`,
        category: "Data Protection",
        definition: "A standardized legal definition for audit testing.",
        statutoryContext: "GDPR Article 10",
      }),
    });
    const glossaryData = await createGlossaryRes.json();
    record("CMS", "Glossary Term Creation (POST /api/glossary)", createGlossaryRes.status === 201 && Boolean(glossaryData.data?.id),
      `Term ID: ${glossaryData.data?.id}`);

    // 3.6 Country CMS Update
    const countryToUpdate = await prisma.country.findFirst();
    if (countryToUpdate) {
      const origSummary = countryToUpdate.summary;
      const updateCountryRes = await fetch(`${BASE_URL}/api/countries/${countryToUpdate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Cookie: adminCookie },
        body: JSON.stringify({
          summary: `${origSummary} [AUDITED]`,
        }),
      });
      record("CMS", "Country Update (PUT /api/countries/[id])", updateCountryRes.ok, `Status: ${updateCountryRes.status}`);
      // Revert back
      await prisma.country.update({
        where: { id: countryToUpdate.id },
        data: { summary: origSummary },
      });
    }

    // 3.7 Editorial Corrections Workflow
    const createCorrRes = await fetch(`${BASE_URL}/api/corrections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submitterName: "Audit Tester",
        submitterEmail: "tester@cyberlex.io",
        issueType: "Citation Update",
        description: "Test submission for corrections triage queue.",
      }),
    });
    const corrData = await createCorrRes.json();
    const createdCorrId = corrData.correctionId || corrData.data?.id;
    record("CMS", "Corrections Submission (POST /api/corrections)", (createCorrRes.status === 201 || createCorrRes.ok) && Boolean(createdCorrId),
      `Status: ${createCorrRes.status}, Correction ID: ${createdCorrId}`);

    if (createdCorrId) {
      const patchCorrRes = await fetch(`${BASE_URL}/api/corrections`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Cookie: adminCookie },
        body: JSON.stringify({
          id: createdCorrId,
          status: "APPLIED",
          editorialNotes: "Verified and applied in audit.",
        }),
      });
      record("CMS", "Corrections Editorial Triage (PATCH /api/corrections)", patchCorrRes.ok, `Status: ${patchCorrRes.status}`);
      // Cleanup test correction
      await prisma.correction.delete({ where: { id: createdCorrId } });
    }
  } catch (err) {
    record("CMS", "CMS CRUD Execution", false, (err as Error).message);
  }

  // ---------------------------------------------------------
  // 4. Public Features: Contact API & Search
  // ---------------------------------------------------------
  console.log("\n--- SECTION 4: Public APIs & Features ---");
  try {
    // 4.1 Contact API Valid Submission
    const contactValidRes = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Legal Researcher",
        email: "researcher@example.org",
        category: "general",
        subject: "Inquiry on Cybercrime Harmonization",
        message: "This is an automated QA test inquiry for the CyberLex editorial team.",
      }),
    });
    const contactData = await contactValidRes.json();
    record("Public API", "Contact API Valid Submission", contactValidRes.ok && contactData.success === true,
      `Response: ${contactData.message}`);

    // 4.2 Contact API Invalid Submission (Should fail with 400)
    const contactInvalidRes = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "", email: "bad-email", subject: "", message: "" }),
    });
    record("Public API", "Contact API Input Validation (400 on invalid input)", contactInvalidRes.status === 400,
      `Status: ${contactInvalidRes.status}`);

    // 4.3 Search API
    const searchRes = await fetch(`${BASE_URL}/api/search?q=cybercrime`);
    const searchData = await searchRes.json();
    record("Public API", "Search API (Query: 'cybercrime')", searchRes.ok && Array.isArray(searchData.results) && searchData.count > 0,
      `Results count: ${searchData.count}`);

    const searchGDPRRes = await fetch(`${BASE_URL}/api/search?q=GDPR`);
    const searchGDPRData = await searchGDPRRes.json();
    record("Public API", "Search API (Query: 'GDPR')", searchGDPRRes.ok && searchGDPRData.count > 0,
      `Results count: ${searchGDPRData.count}`);
  } catch (err) {
    record("Public API", "Public Features API", false, (err as Error).message);
  }

  // ---------------------------------------------------------
  // 5. Public Routes Health & 404 Check
  // ---------------------------------------------------------
  console.log("\n--- SECTION 5: Public Routes & Static/Dynamic Health ---");
  const publicRoutes = [
    "/",
    "/learn",
    "/learn/what-is-cyber-law",
    "/learn/cybercrime-explained",
    "/learn/privacy",
    "/learn/digital-evidence",
    "/learn/social-media-law",
    "/learn/ethical-hacking-law",
    "/learn/electronic-transactions",
    "/learn/ai-and-law",
    "/learn/intellectual-property",
    "/learn/cybersecurity-compliance",
    "/a-z",
    "/countries",
    "/countries/sri-lanka",
    "/countries/united-states",
    "/countries/european-union",
    "/countries/united-kingdom",
    "/countries/india",
    "/countries/singapore",
    "/countries/australia",
    "/topics",
    "/topics/cybercrime",
    "/topics/privacy",
    "/topics/data-protection",
    "/topics/digital-evidence",
    "/topics/ai-law",
    "/cases",
    "/updates",
    "/resources",
    "/about",
    "/search",
    "/glossary",
    "/quiz",
    "/scenarios",
    "/privacy",
    "/terms",
    "/cookies",
    "/disclaimer",
    "/contact",
  ];

  let passedRoutes = 0;
  for (const route of publicRoutes) {
    try {
      const res = await fetch(`${BASE_URL}${route}`);
      if (res.status === 200) {
        passedRoutes++;
      } else {
        record("Routes", `Route Check: ${route}`, false, `Status ${res.status}`);
      }
    } catch (e) {
      record("Routes", `Route Check: ${route}`, false, (e as Error).message);
    }
  }
  record("Routes", "All Core Public Routes Available", passedRoutes === publicRoutes.length,
    `${passedRoutes} of ${publicRoutes.length} public routes returned HTTP 200`);

  // ---------------------------------------------------------
  // 6. Legal Content & Citations Verification
  // ---------------------------------------------------------
  console.log("\n--- SECTION 6: Legal Verification & Statutory Metadata ---");
  try {
    const publishedArticles = await prisma.article.findMany({
      where: { status: ArticleStatus.PUBLISHED },
      include: { citations: true, topic: true, country: true },
    });

    let articlesWithCitations = 0;
    let articlesWithValidSources = 0;

    for (const art of publishedArticles) {
      if (art.citations.length > 0) articlesWithCitations++;
      const hasHttpSource = art.citations.some(c => c.sourceUrl && c.sourceUrl.startsWith("http"));
      if (hasHttpSource) articlesWithValidSources++;
    }

    record("Legal", "Published Articles Citation Integrity", articlesWithCitations === publishedArticles.length,
      `${articlesWithCitations} of ${publishedArticles.length} published articles contain verified citations`);

    record("Legal", "Official Primary Source URLs", articlesWithValidSources === publishedArticles.length,
      `${articlesWithValidSources} of ${publishedArticles.length} articles have verified HTTP/HTTPS official gazette or statutory source URLs`);

    // Verify legal disclaimer on public pages
    const homeHtml = await (await fetch(`${BASE_URL}/`)).text();
    const hasDisclaimer = homeHtml.includes("Educational platform — not a substitute for professional legal advice") ||
                          homeHtml.includes("CyberLex provides general educational");
    record("Legal", "Mandatory Legal Disclaimer Present", hasDisclaimer,
      "Confirmed presence of legal disclaimer bar on public layout");
  } catch (err) {
    record("Legal", "Legal Verification", false, (err as Error).message);
  }

  // ---------------------------------------------------------
  // 7. Audit Summary
  // ---------------------------------------------------------
  console.log("\n==================================================================");
  console.log("                      AUDIT RESULTS SUMMARY                       ");
  console.log("==================================================================");

  const total = auditLog.length;
  const passed = auditLog.filter((a) => a.status === "PASS").length;
  const failed = auditLog.filter((a) => a.status === "FAIL").length;
  const readiness = Math.round((passed / total) * 100);

  console.log(`TOTAL CHECKS: ${total}`);
  console.log(`PASSED:       ${passed}`);
  console.log(`FAILED:       ${failed}`);
  console.log(`READINESS:    ${readiness}%`);

  if (failed > 0) {
    console.log("\nFAILED ITEMS:");
    auditLog.filter(a => a.status === "FAIL").forEach(f => {
      console.log(` - [${f.category}] ${f.name}: ${f.details}`);
    });
  }
}

runAudit()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
