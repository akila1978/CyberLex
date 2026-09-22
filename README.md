# CyberLex

> **Global Cyber Law, Digital Rights & Online Safety Knowledge Platform**

CyberLex is an open, structured knowledge platform bridging the divide between **substantive cyber law**, **software engineering**, and **practical cybersecurity**. In an era where technological innovation regularly outpaces legislative reform, CyberLex provides software engineers, cybersecurity practitioners, legal researchers, students, and citizens with accessible, authoritative, and multi-jurisdictional legal intelligence.

The platform dissects complex legal codes—from computer crime statutes and data protection acts to AI governance directives and online safety regulations—into clear statutory breakdowns, judicial precedents, and practical compliance guidance.

---

> [!IMPORTANT]
> **Educational & Informational Disclaimer**  
> CyberLex is published strictly for educational, informational, and academic research purposes. Content on this platform does **not** constitute legal advice and does **not** create an attorney-client relationship. Cyber laws vary across jurisdictions and evolve rapidly; organizations and individuals should consult licensed legal counsel and primary gazetted statutory authorities for specific legal counsel.

---

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Key Features](#2-key-features)
  - [Public Platform](#public-platform)
  - [Editorial Management Console (CMS)](#editorial-management-console-cms)
- [3. Supported Jurisdictions](#3-supported-jurisdictions)
- [4. Legal Source Integrity](#4-legal-source-integrity)
- [5. Technology Stack](#5-technology-stack)
- [6. System Architecture](#6-system-architecture)
- [7. Database Architecture](#7-database-architecture)
- [8. Project Structure](#8-project-structure)
- [9. Getting Started](#9-getting-started)
- [10. Database Setup](#10-database-setup)
- [11. Running Locally](#11-running-locally)
- [12. Available Scripts](#12-available-scripts)
- [13. API Reference](#13-api-reference)
- [14. Security Architecture](#14-security-architecture)
- [15. SEO & Accessibility](#15-seo--accessibility)
- [16. Quality Assurance & Testing](#16-quality-assurance--testing)
- [17. Production Deployment](#17-production-deployment)
- [18. Interface Overview](#18-interface-overview)
- [19. Responsible Use](#19-responsible-use)
- [20. Contributing](#20-contributing)
- [21. License](#21-license)
- [22. Author & Maintainer](#22-author--maintainer)
- [23. Project Status](#23-project-status)

---

## 1. Project Overview

Modern cyber law is highly fragmented across borders and jurisdictions. A vulnerability disclosure lawful in one state may trigger criminal liability under computer misuse statutes in another. Cross-border data flows, cloud investigations, mandatory breach notifications, and platform liabilities require structured, interdisciplinary analysis.

CyberLex addresses this challenge by organizing cyber law into **17 confirmed statutory domains**:

1. **Cybercrime & Computer Misuse**: Unauthorized access, data interference, ransomware, malware distribution, and computer fraud.
2. **Privacy in Cyberspace**: Constitutional protections, surveillance boundaries, lawful interception, and metadata rights.
3. **Data Protection & Regulatory Compliance**: Global omnibus privacy regimes (GDPR, PDPA, DPDPA), consent rules, and data subject rights.
4. **Digital Evidence & Electronic Records**: Chain of custody, cryptographic hashing, forensic admissibility, and electronic signature validity.
5. **Social Media & Online Speech**: Platform intermediary liability, content moderation, online defamation, and safe harbor frameworks.
6. **Ethical Hacking & Vulnerability Research**: Bug bounty legality, safe harbor policies, coordinated vulnerability disclosure (CVD), and CFAA boundaries.
7. **Electronic Transactions & E-Signatures**: Contract formation online, UNCITRAL model frameworks, digital identity, and non-repudiation.
8. **Artificial Intelligence, Algorithms & Autonomous Systems**: High-risk AI classifications, automated decision-making liability, and AI model governance.
9. **Digital Intellectual Property & Software Copyright**: Reverse engineering, open-source compliance, trade secrets, and digital copyright enforcement.
10. **Cybersecurity Governance & Compliance**: Critical infrastructure mandates, NIS2 directive, board oversight, and incident disclosure timelines.
11. **Digital Rights, Net Neutrality & Internet Freedoms**: Bandwidth throttling, internet shutdowns, censorship jurisprudence, and access rights.
12. **Online Safety & Harms Prevention**: Statutory duties of care, non-consensual imagery prevention, and protection from online harms.
13. **FinTech, Cryptocurrency & Cyber Fraud**: DeFi exploitation, cryptocurrency regulatory frameworks, AML/KYC requirements, and payment fraud.
14. **Children's Digital Safety & Youth Privacy**: COPPA compliance, age-appropriate design codes, and parental consent verifications.
15. **Workplace Technology & Employee Monitoring**: Workplace surveillance legality, employer device policies, bring-your-own-device (BYOD), and labor privacy.
16. **Cloud Computing, Sovereignty & Cross-Border Data**: Shared responsibility models, data residency mandates, and government access mechanisms.
17. **International Cooperation & Cross-Border Cyber Law**: Budapest Convention (ETS 185), UN cybercrime treaties, and Mutual Legal Assistance Treaties (MLATs).

---

## 2. Key Features

CyberLex is architected with a strict separation of concerns between its **public educational surface** and its **server-guarded editorial CMS**.

### Public Platform
- **Cyber Law Explorer**: Categorized navigational hub across cyber law domains, statutes, and regional legal instruments.
- **Interactive Learn Curriculum**: 12 structured educational modules with statutory citations, practical takeaways, and reference guides.
- **In-Depth Technical & Legal Guides**: Comprehensive articles detailing substantive legal elements, case studies, and compliance mechanisms.
- **Landmark Judicial Precedents**: Structured database of transformative court rulings with factual background, legal questions, and court holdings.
- **Real-Time Regulatory Tracker**: Live legal updates detailing new enactments, gazette notices, and regulatory enforcement priorities.
- **Jurisdiction Regulatory Profiles**: Dedicated country pages with details on national DPAs, CSIRTs/CERTs, and governing cyber legislation.
- **Legal Glossary & Cyber Law A–Z**: Searchable terminology index connecting definitions directly to governing statutory provisions.
- **Statutory Comprehension Quizzes**: Assessment questions with structured explanatory feedback and statutory citations.
- **Unified Multi-Facet Search**: Instant client and server query across articles, topics, statutes, and country profiles.
- **Community Corrections System**: Public form allowing researchers to submit citation corrections, broken links, or statutory amendments.
- **Contact & Inquiry Desk**: Direct communication channel with automated input validation and rate limiting.
- **Design System & Accessibility**: Full responsive design across mobile, tablet, and desktop with persistent light/dark themes.

### Editorial Management Console (CMS)
- **Role-Based Server-Side Guard**: Secure authentication gate requiring cryptographic JSON Web Tokens (`jose`) and administrative privileges.
- **Article Lifecycle Management**: Full CRUD capabilities to author, preview, publish, draft, or archive articles.
- **Judicial Precedents Console**: Add and maintain landmark cases with citations, courts, and holdings.
- **Regulatory Alerts CMS**: Publish statutory updates with official source URLs and instrument classifications.
- **Interactive Quiz CMS**: Author multiple-choice assessment items with option selectors and statutory context.
- **Glossary & Taxonomy Management**: Create and maintain technical-legal definitions linked to primary statutes.
- **Country Profile Editor**: Update national regulatory bodies, CERT URLs, and legal system summaries.
- **Editorial Corrections Queue**: Review, triage, investigate, apply, or reject submitted legal corrections.

---

## 3. Supported Jurisdictions

CyberLex maintains jurisdiction profiles grounded in official statutory records:

| Jurisdiction | Primary Cybercrime Authority | Primary Privacy / Data Protection Authority | National CSIRT / CERT Authority |
| :--- | :--- | :--- | :--- |
| **Sri Lanka** *(Flagship)* | Computer Crimes Act No. 24 of 2007 | Personal Data Protection Act No. 9 of 2022 | Sri Lanka CERT\|CC |
| **European Union** | Budapest Convention / Cybercrime Directives | General Data Protection Regulation (EU 2016/679) | ENISA / Computer Emergency Response Team (CERT-EU) |
| **United States** | Computer Fraud and Abuse Act (18 U.S.C. § 1030) | Sectoral (FTC Act, HIPAA, COPPA, State Statutes) | Cybersecurity and Infrastructure Security Agency (CISA) |
| **United Kingdom** | Computer Misuse Act 1990 (c. 18) | Data Protection Act 2018 / UK GDPR | National Cyber Security Centre (NCSC) |
| **India** | Information Technology Act, 2000 | Digital Personal Data Protection Act, 2023 | Indian Computer Emergency Response Team (CERT-In / MeitY) |
| **Singapore** | Computer Misuse Act 1993 | Personal Data Protection Act 2012 | Cyber Security Agency of Singapore (CSA) |
| **Australia** | Cybercrime Act 2001 / Criminal Code 1995 | Privacy Act 1988 / Online Safety Act 2021 | Australian Cyber Security Centre (ACSC) |
| **International** | Council of Europe Budapest Convention (ETS No. 185) | UNCITRAL Model Laws on Electronic Commerce | UNODC Cybercrime Division |

---

## 4. Legal Source Integrity

CyberLex employs a source-backed methodology designed to uphold academic and professional rigor:

1. **Primary Authority Citations**: Every article and guide cites official government gazettes, statutory compilations, or authoritative judicial records.
2. **Automated Source Reachability Auditing**: The repository includes automated verification scripts ([`scripts/verify-legal-sources.ts`](scripts/verify-legal-sources.ts)) that audit every cited official URL against live government portals to verify accessibility.
   > **Note on Reachability vs. Legal Validity**: Automated reachability audits verify that official government URLs return valid HTTP responses (HTTP 200/202). Substantive legal accuracy requires qualitative editorial review by qualified legal researchers.
3. **Jurisdiction Alignment Guard**: Verification tooling cross-checks statutory instrument titles against jurisdiction taxonomies to prevent jurisdiction misattribution.
4. **Transparent Peer Correction**: Readers, researchers, and legal practitioners can submit corrections directly to the editorial desk via `/contact` or the article-level correction trigger.

---

## 5. Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16.3.6** | App Router, Server Components, Route Handlers, Turbopack engine |
| **UI Library** | **React 19.2.8** | Client and server component architecture |
| **Language** | **TypeScript 5** | Strict type safety across application, APIs, and database models |
| **Styling** | **Tailwind CSS v4** | CSS variables, modern utility architecture, fluid typography |
| **Database ORM** | **Prisma 6.19.3** | Schema management, type-safe queries, migration and seeding pipelines |
| **Database Engine** | **MySQL 8.x** | Relational data persistence with foreign keys and InnoDB tables |
| **Authentication** | **jose 6.2.12** | Stateless, cryptographically signed JSON Web Tokens (JWT) |
| **Password Hashing** | **bcryptjs 3.0.3** | Salted password hashing for administrative credentials |
| **Rate Limiting** | **Upstash Redis + Memory** | Distributed REST rate limiting with automated in-memory fallback |
| **Validation** | **Zod 4.6.5** | Runtime schema validation on API request bodies |
| **Icons** | **Lucide React 0.500.0** | Consistent, lightweight SVG icon system |

---

## 6. System Architecture

The following diagram illustrates the request lifecycle, security perimeter, and data pipelines across CyberLex:

```mermaid
flowchart TD
    User([Public User / Legal Researcher])
    Admin([Editorial Administrator])
    
    subgraph EdgeSecurity [Edge & Middleware Layer]
        MW[Next.js Middleware Guard]
        SecHeaders[Security Headers & CSP]
        RateLimiter{Distributed Rate Limiter}
    end

    subgraph AppRouter [Next.js 16 Application Layer]
        PublicRoutes[Public Pages: /learn, /topics, /articles, /countries, /cases]
        AdminRoutes[Admin CMS: /admin, /admin/articles, /admin/cases, /admin/updates]
        APIRoutes[API Endpoints: /api/auth, /api/articles, /api/contact, /api/corrections]
    end

    subgraph ServiceLayer [Business & Integration Layer]
        AuthService[Auth Service: jose JWT + bcryptjs]
        RedisService[(Upstash Redis Pipeline)]
        PrismaClient[Prisma Client v6]
    end

    subgraph StorageLayer [Persistence Layer]
        MySQL[(MySQL 8.x Database)]
    end

    User -->|HTTP Requests| SecHeaders
    Admin -->|Authenticated Sessions| SecHeaders
    SecHeaders --> MW
    MW -->|Check /admin Routes| AuthService
    MW --> RateLimiter
    RateLimiter -->|Rate Limit Checks| RedisService
    RateLimiter -->|Authorized Traffic| AppRouter
    
    PublicRoutes --> PrismaClient
    AdminRoutes --> PrismaClient
    APIRoutes --> PrismaClient
    APIRoutes --> AuthService
    
    PrismaClient -->|Connection Pool| MySQL
```

---

## 7. Database Architecture

CyberLex utilizes an explicit relational schema managed via Prisma for MySQL 8.x. Key models include:

- **`User`**: Administrator, editor, and contributor credentials, bcrypt password hashes, and editorial profiles.
- **`Account` & `Session`**: Authentication relations supporting secure sessions.
- **`Topic`**: 17 core legal categories with icon identifiers and descriptions.
- **`Country`**: National jurisdictions with ISO codes, regional tags, DPA contacts, and CERT links.
- **`Statute`**: Primary enacted legislation with official titles, gazette citations, and structured provisions.
- **`Article`**: In-depth legal analyses and educational guides with editorial review states (`DRAFT`, `PUBLISHED`, `ARCHIVED`).
- **`Citation`**: Source records connecting articles directly to primary statutes and external official URLs.
- **`CaseStudy`**: Landmark court decisions documenting facts, legal questions, holdings, and impact.
- **`LegalUpdate`**: Real-time regulatory alerts tracking bills, amendments, and enforcement actions.
- **`QuizQuestion`**: Multiple-choice assessment items linked to topics and statutory references.
- **`GlossaryTerm`**: Technical-legal definitions tied to statutory provisions.
- **`Correction`**: Editorial queue logging reader-submitted corrections, issue types, and triage resolution.

---

## 8. Project Structure

```text
CyberLex/
├── docs/                                  # Operational & production documentation
│   ├── database-backup-restore.md         # MySQL backup & point-in-time recovery runbook
│   └── production-deployment-checklist.md # Production launch checklist & operational controls
├── prisma/                                # Database schema & seed pipelines
│   ├── schema.prisma                      # Prisma MySQL schema definition
│   └── seed.ts                            # Initial taxonomy, statute, and editorial seeder
├── public/                                # Static media assets and vector graphics
├── scripts/                               # Maintenance, verification & QA toolchain
│   ├── audit-db.ts                        # Database record count auditor
│   ├── cleanup-test-records.ts            # Transient QA test record cleanup
│   ├── create-admin.ts                    # Administrative user creation utility
│   ├── run-qa-audit.ts                    # 35-check automated pre-deployment QA test suite
│   ├── seed-updates-quiz.ts               # Regulatory updates and quiz data seeder
│   ├── test-cms-runtime.ts                # CMS runtime CRUD validation test
│   ├── verify-db.ts                       # Database schema connectivity checker
│   └── verify-legal-sources.ts            # Statutory source URL reachability auditor
├── src/
│   ├── app/                               # Next.js 16 App Router
│   │   ├── (public pages)                 # /, /about, /articles, /cases, /countries, etc.
│   │   ├── admin/                         # Editorial CMS console & /admin/login
│   │   ├── api/                           # Route handlers for auth, articles, contact, etc.
│   │   ├── layout.tsx                     # Root layout with font optimization & theme scripts
│   │   ├── robots.ts                      # Dynamic robots.txt generator
│   │   └── sitemap.ts                     # Dynamic sitemap.xml generator
│   ├── components/                        # Reusable UI & editorial components
│   │   ├── admin/                         # CMS dashboard tables, forms, and editors
│   │   ├── layout/                        # Header, footer, breadcrumbs, search triggers
│   │   └── providers/                     # Theme provider (light/dark mode)
│   ├── config/                            # Site configuration and navigation metadata
│   ├── lib/                               # Core libraries & utilities
│   │   ├── auth.ts                        # JWT signing, verification, and cookie helpers
│   │   ├── db.ts                          # Singleton Prisma client instance
│   │   └── rate-limit.ts                  # Redis and memory rate limiter
│   └── middleware.ts                      # Edge route guard protecting /admin/*
├── .env.example                           # Environment configuration template
├── next.config.ts                         # Next.js configuration & HTTP security headers
├── package.json                           # Dependencies and project scripts
├── tsconfig.json                          # TypeScript configuration
└── README.md                              # Project documentation
```

---

## 9. Getting Started

### Prerequisites
- **Node.js**: `v20.x` or later
- **npm**: `v10.x` or later
- **MySQL**: `8.0+` installed and running locally or accessible via network

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/akila1978/CyberLex.git
   cd CyberLex
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment configuration:
   ```bash
   cp .env.example .env
   ```

   Configure the required variables in `.env`:

   ```ini
   # Database (MySQL 8.x) - Required
   DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/cyberlex_db"

   # Session & Cryptographic Security - Required
   JWT_SECRET="generate-a-64-character-cryptographically-secure-random-key"
   ADMIN_COOKIE_SECRET="generate-a-32-character-secret-key"
   ADMIN_INITIAL_PASSWORD="ChangeMeInProduction_2026!"

   # Canonical Application URL - Required
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"

   # Distributed Rate Limiting (Upstash Redis) - Optional (falls back to memory store)
   UPSTASH_REDIS_REST_URL=""
   UPSTASH_REDIS_REST_TOKEN=""

   # Transactional Email (SMTP) - Optional (for production contact notifications)
   SMTP_HOST=""
   SMTP_PORT="587"
   SMTP_USER=""
   SMTP_PASSWORD=""

   # AI Assistant Provider (LexGuide) - Optional ('mock' for local dev)
   LEXGUIDE_AI_PROVIDER="mock"
   OPENAI_API_KEY=""
   GOOGLE_AI_API_KEY=""
   ```

---

## 10. Database Setup

1. **Create the MySQL Database**:
   Log into MySQL and initialize the database schema:
   ```sql
   CREATE DATABASE cyberlex_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. **Generate Prisma Client Bindings**:
   ```bash
   npx prisma generate
   ```

3. **Synchronize Schema**:
   Apply the Prisma schema to your MySQL instance:
   ```bash
   npx prisma db push
   ```

4. **Seed Database Content**:
   Populate the topics, country profiles, primary statutes, and seed articles:
   ```bash
   npx prisma db seed
   ```

---

## 11. Running Locally

Start the local Next.js development server:

```bash
npm run dev
```

The application is now accessible at:
- **Public Platform**: [http://localhost:3000](http://localhost:3000)
- **Editorial CMS Console**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

To sign in to the editorial console, use the administrative email and the password configured via `ADMIN_INITIAL_PASSWORD` during database seeding.

---

## 12. Available Scripts

The project includes standard build commands and customized verification tooling:

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server with Turbopack |
| `npm run build` | Compiles optimized production bundle and generates static pages |
| `npm run start` | Launches compiled Next.js production server |
| `npm run lint` | Runs ESLint 9 across application source and scripts |
| `npx tsx scripts/run-qa-audit.ts` | Executes the 35-check automated pre-deployment QA test suite |
| `npx tsx scripts/verify-legal-sources.ts` | Pings all official legal authority URLs and checks jurisdiction alignment |
| `npx tsx scripts/cleanup-test-records.ts` | Safely removes transient QA records created during testing |
| `npx tsx scripts/create-admin.ts` | CLI helper to register or reset administrative accounts |

---

## 13. API Reference

All API routes are implemented as Next.js Route Handlers with request validation and security controls:

| Endpoint | Method | Purpose | Authentication |
| :--- | :---: | :--- | :---: |
| `/api/auth/login` | `POST` | Authenticate editorial administrator, issue JWT cookie | Rate Limited |
| `/api/auth/logout` | `POST` | Invalidate and clear session cookie | Public |
| `/api/auth/me` | `GET` | Retrieve authenticated administrator profile | Session Required |
| `/api/articles` | `GET` | List published articles with optional topic/jurisdiction filters | Public |
| `/api/articles` | `POST` | Create a new legal article | Admin Required |
| `/api/articles/[id]` | `PUT` | Update article content, status, or citations | Admin Required |
| `/api/articles/[id]` | `DELETE` | Permanently remove an article | Admin Required |
| `/api/cases` | `GET` | Fetch list of landmark judicial precedents | Public |
| `/api/cases` | `POST` | Add a new landmark case precedent | Admin Required |
| `/api/cases/[id]` | `PUT` / `DELETE` | Modify or delete a case precedent | Admin Required |
| `/api/updates` | `GET` | Retrieve real-time regulatory alerts | Public |
| `/api/updates` | `POST` | Publish a new regulatory alert | Admin Required |
| `/api/updates/[id]` | `PUT` / `DELETE` | Modify or delete a regulatory update | Admin Required |
| `/api/countries` | `GET` | Retrieve country regulatory profiles | Public |
| `/api/countries/[id]` | `PUT` | Update country DPA, CERT, or legal profile details | Admin Required |
| `/api/glossary` | `GET` | List glossary terms and definitions | Public |
| `/api/glossary` | `POST` | Register a new statutory term | Admin Required |
| `/api/quiz` | `GET` | Fetch statutory comprehension quiz items | Public |
| `/api/quiz` | `POST` | Create an interactive assessment question | Admin Required |
| `/api/quiz/[id]` | `PUT` / `DELETE` | Modify or delete a quiz question | Admin Required |
| `/api/corrections` | `POST` | Submit public correction or broken link report | Rate Limited |
| `/api/corrections` | `GET` / `PATCH` | Retrieve or triage submitted corrections | Admin Required |
| `/api/contact` | `POST` | Send an inquiry to the editorial research desk | Rate Limited |
| `/api/search` | `GET` | Multi-table unified search across articles, cases, and laws | Public |
| `/api/lexguide` | `POST` | AI legal assistant query endpoint | Public |

---

## 14. Security Architecture

CyberLex adheres to defense-in-depth principles across transport, authentication, and application layers:

1. **Stateless JWT Authentication**: Sessions are signed using cryptographic keys via `jose` and stored in `HttpOnly`, `SameSite=Lax`, and `Secure` (in production) cookies.
2. **Edge Route Guard**: Next.js Edge Middleware intercepts all `/admin/*` requests (except `/admin/login`), verifying token authenticity and administrative roles before reaching application handlers.
3. **Dual-Tier Rate Limiting**:
   - Authentication endpoint (`/api/auth/login`) is throttled to 5 requests per 15 minutes per IP.
   - Contact form (`/api/contact`) is throttled to 3 submissions per hour per IP.
   - Employs Upstash Redis distributed pipelines with seamless fallback to an in-memory store with automated garbage-collection sweeps.
4. **HTTP Security Headers** (enforced in `next.config.ts`):
   - **`Content-Security-Policy`**: Restrictive policy (`default-src 'self'`, `frame-ancestors 'none'`, `block-all-mixed-content`).
   - **`Strict-Transport-Security`**: `max-age=63072000; includeSubDomains; preload`.
   - **`X-Frame-Options`**: `DENY` (prevents clickjacking attacks).
   - **`X-Content-Type-Options`**: `nosniff` (prevents MIME sniffing).
   - **`Referrer-Policy`**: `strict-origin-when-cross-origin`.
   - **`Permissions-Policy`**: Disables unused browser capabilities (`camera=(), microphone=(), geolocation=()`).
5. **Strict Input Sanitization & Validation**: API endpoints validate request bodies using Zod schemas to reject unexpected or malformed inputs.
6. **Secret Isolation**: Configuration secrets are decoupled from codebase history via `.gitignore` exclusions on `.env*`.

---

## 15. SEO & Accessibility

- **Search Engine Isolation**:
  - [`src/app/robots.ts`](src/app/robots.ts) explicitly blocks web crawlers from indexing `/admin`, `/admin/`, and `/api/`.
  - [`src/app/admin/layout.tsx`](src/app/admin/layout.tsx) and `/admin/login` serve strict `noindex, nofollow, noimageindex` robots metadata.
- **Dynamic Sitemap**:
  - [`src/app/sitemap.ts`](src/app/sitemap.ts) dynamically compiles verified public routes, topics, published articles, country profiles, cases, and updates into standards-compliant XML.
- **Theme Resilience**:
  - Implements an inline head script preventing flash of incorrect theme (FOIT) on page refresh across dark and light preferences.
- **Semantic Hierarchy**:
  - Structured HTML5 elements (`<header>`, `<main>`, `<nav>`, `<article>`, `<footer>`) with descriptive ARIA attributes and keyboard-accessible navigation.

---

## 16. Quality Assurance & Testing

CyberLex maintains an automated pre-deployment QA test suite covering functional, statutory, and security requirements:

```bash
# Execute comprehensive QA suite (35 automated checks)
npx tsx scripts/run-qa-audit.ts

# Execute legal source reachability and jurisdiction alignment audit
npx tsx scripts/verify-legal-sources.ts

# Run production build and lint verification
npm run lint
npm run build
```

### Audit Scope
- **Database Integrity**: Verifies MySQL connectivity, record counts, and taxonomy constraints.
- **Authentication & RBAC**: Tests credential validation, JWT cookie issuance, and unauthorized route redirection.
- **CMS Lifecycle**: Performs programmatic end-to-end CRUD operations (Create, Read, Update, Delete) across articles, cases, updates, and quizzes.
- **Source Verification**: Performs live HTTP status checks (200/202) against cited national gazettes, supreme court archives, and regulatory portals.

---

## 17. Production Deployment

For deploying CyberLex into production environments:

- Consult the [**Production Deployment Checklist**](docs/production-deployment-checklist.md) for domain setup, TLS termination, Upstash Redis provisioning, and monitoring integration.
- Consult the [**Database Backup & Disaster Recovery Guide**](docs/database-backup-restore.md) for `mysqldump` snapshot configurations, binary log point-in-time recovery, and cron backup automation.

---

## 18. Interface Overview

```text
+-----------------------------------------------------------------------------------+
|  [ Shield ]  CYBERLEX     Learn   Topics   Countries   Cases   Updates   [ Search ] |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|   GLOBAL CYBER LAW & DIGITAL RIGHTS KNOWLEDGE PLATFORM                            |
|   Bridging technology, statutory legal analysis, and cybersecurity compliance.     |
|                                                                                   |
|   [ Explore 17 Topics ]    [ Interactive Modules ]    [ Country Profiles ]        |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|   FLAGSHIP JURISDICTIONS              CORE STATUTORY FOCUS AREAS                  |
|   - Sri Lanka (CCA, PDPA, OSA)        - Computer Misuse & Cybercrime              |
|   - European Union (GDPR, AI Act)     - Data Privacy & Regulatory Compliance      |
|   - United States (CFAA, CISA)        - Digital Forensics & Electronic Records    |
|   - United Kingdom (CMA, DPA)         - AI Governance & Algorithm Liability       |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|  (i) Educational Disclaimer: Informational only. Consult licensed legal counsel.  |
+-----------------------------------------------------------------------------------+
```

---

## 19. Responsible Use

CyberLex is developed exclusively for defensive, educational, and compliance applications:
- **Authorized Research**: Assists security researchers in understanding the legal boundaries of vulnerability disclosure, coordinated disclosure, and penetration testing agreements.
- **Compliance Education**: Enables developers and system architects to design applications aligned with data protection and privacy-by-design standards.
- **Legal Literacy**: Fosters informed civic discourse around digital rights, internet governance, and online privacy.

CyberLex materials must **not** be used to facilitate, execute, or justify unauthorized access or malicious computer activity.

---

## 20. Contributing

Contributions from legal practitioners, researchers, cybersecurity professionals, and software engineers are welcomed.

### Contribution Process
1. **Fork the repository** on GitHub.
2. **Create a topic branch**:
   ```bash
   git checkout -b feature/topic-or-statute-enhancement
   ```
3. **Commit your modifications** with clear, descriptive commit messages.
   - For statutory or article contributions, include primary source citations (official gazette numbers, legislation URLs, or court citations).
4. **Validate local quality**:
   ```bash
   npm run lint
   npm run build
   npx tsx scripts/verify-legal-sources.ts
   ```
5. **Open a Pull Request** with a detailed explanation of your changes.

---

## 21. License

This repository does not currently declare a public open-source license. All rights are reserved by the project author and maintainers. An appropriate open-source or academic license may be applied in future releases.

---

## 22. Author & Maintainer

- **Author**: Akila
- **GitHub**: [@akila1978](https://github.com/akila1978)
- **Repository**: [https://github.com/akila1978/CyberLex.git](https://github.com/akila1978/CyberLex.git)

---

## 23. Project Status

**Status: Production Candidate / Active Maintenance**

The technical foundation, relational database, security perimeters, editorial CMS, and primary legal content are fully operational and verified. Ongoing work focuses on expanding statutory depth, international legal comparisons, and judicial precedent coverage.
