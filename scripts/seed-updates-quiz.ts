import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  const updates = [
    {
      title: 'EU AI Act Enters Into Force (Regulation EU 2024/1689)',
      slug: 'eu-ai-act-entry-into-force',
      datePublished: new Date('2024-08-01'),
      jurisdiction: 'European Union',
      instrumentType: 'REGULATION' as const,
      summary: 'The comprehensive European regulation on artificial intelligence enters force, establishing phased compliance deadlines for prohibited AI practices, general-purpose AI models, and high-risk applications.',
      sourceUrl: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj'
    },
    {
      title: 'Draft United Nations Cybercrime Convention Finalized by Ad Hoc Committee',
      slug: 'un-cybercrime-convention-draft-finalized',
      datePublished: new Date('2024-08-15'),
      jurisdiction: 'United Nations / Global',
      instrumentType: 'TREATY' as const,
      summary: 'UN member states finalized draft text for the international convention on countering cybercrime, setting up a formal vote at the UN General Assembly amidst debates on privacy and human rights safeguards.',
      sourceUrl: 'https://www.unodc.org/unodc/en/cybercrime/ad-hoc-committee/home.html'
    },
    {
      title: 'Online Safety Act No. 9 of 2024 Enacted in Sri Lanka',
      slug: 'sri-lanka-online-safety-act-enacted',
      datePublished: new Date('2024-02-01'),
      jurisdiction: 'Sri Lanka',
      instrumentType: 'LAW' as const,
      summary: 'Parliament enacted legislation establishing the Online Safety Commission to regulate false online statements and user safety, generating legal dialogue around constitutional speech protections.',
      sourceUrl: 'https://www.parliament.lk'
    },
    {
      title: 'EU Member States Transposition Deadline for NIS 2 Directive',
      slug: 'eu-nis2-directive-transposition',
      datePublished: new Date('2024-10-17'),
      jurisdiction: 'European Union',
      instrumentType: 'DIRECTIVE' as const,
      summary: 'Directive (EU) 2022/2555 mandates enhanced risk management, mandatory 24-hour incident notification, and supply chain security controls across essential and important entities.',
      sourceUrl: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj'
    }
  ];

  for (const u of updates) {
    await prisma.legalUpdate.upsert({
      where: { slug: u.slug },
      update: u,
      create: u,
    });
  }
  console.log('Seeded Legal Updates in MySQL');

  const topic = await prisma.topic.findFirst();
  if (topic) {
    const existing = await prisma.quizQuestion.count();
    if (existing === 0) {
      const questions = [
        {
          question: 'Under the CFAA and the precedent set in Van Buren v. United States (2021), when does an individual exceed authorized access?',
          topicId: topic.id,
          difficulty: 'BEGINNER' as const,
          options: [
            'Whenever they violate an employers internal policy or website terms of service',
            'Only when they access information on a computer system that they were not entitled under any circumstance to obtain',
            'Whenever they run an automated vulnerability scanner against an IP address',
            'Whenever they copy proprietary data to an external USB flash drive'
          ],
          correctIndex: 1,
          explanation: 'In Van Buren v. United States (2021), the US Supreme Court resolved a circuit split by holding that a person exceeds authorized access only when accessing information on a computer system that the person is not entitled to obtain.',
          statutoryContext: '18 U.S.C. § 1030(a)(2); Van Buren v. United States, 593 U.S. 374 (2021)'
        },
        {
          question: 'Under the GDPR (Article 33), within how many hours must a data controller report a personal data breach to the supervisory authority after becoming aware of it?',
          topicId: topic.id,
          difficulty: 'INTERMEDIATE' as const,
          options: ['24 hours', '48 hours', '72 hours', '30 business days'],
          correctIndex: 2,
          explanation: 'GDPR Article 33(1) establishes that in the case of a personal data breach, the controller shall without undue delay and, where feasible, not later than 72 hours after having become aware of it, notify the competent supervisory authority.',
          statutoryContext: 'Regulation (EU) 2016/679 (GDPR), Article 33'
        },
        {
          question: 'Under Sri Lankas Personal Data Protection Act No. 9 of 2022, what is the apex statutory regulatory body established to enforce compliance?',
          topicId: topic.id,
          difficulty: 'BEGINNER' as const,
          options: [
            'Sri Lanka Telecom Regulatory Commission (TRCSL)',
            'Data Protection Authority of Sri Lanka (DPA)',
            'Cyber Security Regulatory Authority (CSRA)',
            'Information and Communication Technology Agency (ICTA)'
          ],
          correctIndex: 1,
          explanation: 'The Data Protection Authority of Sri Lanka (DPA), established under Part V of Act No. 9 of 2022, is the independent regulatory body empowered to issue directives, conduct investigations, and sanction non-compliant controllers.',
          statutoryContext: 'Personal Data Protection Act No. 9 of 2022, Part V'
        }
      ];

      for (const q of questions) {
        await prisma.quizQuestion.create({ data: q });
      }
      console.log('Seeded Quiz Questions in MySQL');
    }
  }
}

run().catch(console.error).finally(() => prisma.$disconnect());
