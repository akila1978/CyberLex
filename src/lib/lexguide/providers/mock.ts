import { ILexGuideProvider, LexGuideResponse, LegalCitation } from "../types";

export class MockLexGuideProvider implements ILexGuideProvider {
  name = "local-grounded-knowledge";

  private mandatoryDisclaimer =
    "CyberLex LexGuide is an educational RAG assistant. This response does not constitute legal advice and does not create an attorney-client relationship. Please consult a qualified legal practitioner in your jurisdiction.";

  async generateAnswer(query: string): Promise<LexGuideResponse> {
    const q = query.toLowerCase();

    // Context-sensitive legal answer synthesis
    if (q.includes("sri lanka") || q.includes("computer crimes act") || q.includes("pdpa")) {
      const citations: LegalCitation[] = [
        {
          statute: "Computer Crimes Act No. 24 of 2007",
          section: "Sections 3, 5, and 6",
          jurisdiction: "Sri Lanka",
          url: "https://www.cert.gov.lk/legislation",
          verificationStatus: "VERIFIED",
        },
        {
          statute: "Personal Data Protection Act No. 9 of 2022",
          section: "Part I & Part V (Data Protection Authority)",
          jurisdiction: "Sri Lanka",
          url: "https://www.dpa.gov.lk",
          verificationStatus: "VERIFIED",
        },
      ];

      return {
        answer: `In Sri Lanka, cyber activity is primarily governed by three major statutory frameworks:

1. **Computer Crimes Act No. 24 of 2007:**
   - **Unauthorized Access (Section 3):** Criminalizes accessing any computer system or program without lawful authority.
   - **Data Modification & Damage (Section 5):** Penalizes intentional alterations, deletions, or introduction of malware.
   - **Critical National Infrastructure (Section 6):** Imposes enhanced penalties if the offense affects national security, defense, or essential services.

2. **Personal Data Protection Act No. 9 of 2022:**
   - Establishes comprehensive statutory rights for data subjects (access, rectification, erasure, and withdrawal of consent).
   - Establishes the **Data Protection Authority of Sri Lanka (DPA)** to investigate complaints and mandate compliance for both private and public data controllers.

3. **Electronic Transactions Act No. 19 of 2006:**
   - Aligns with UNCITRAL principles, legally recognizing electronic signatures and establishing forensic admissibility for digital evidence under Section 18.`,
        citations,
        disclaimer: this.mandatoryDisclaimer,
        provider: "local-rag",
        model: "lexguide-grounded-corpus-v1",
      };
    }

    if (q.includes("ethical hacking") || q.includes("van buren") || q.includes("penetration test") || q.includes("cfaa")) {
      const citations: LegalCitation[] = [
        {
          statute: "Computer Fraud and Abuse Act (18 U.S.C. § 1030)",
          section: "18 U.S.C. § 1030(a)(2)",
          jurisdiction: "United States",
          url: "https://www.law.cornell.edu/uscode/text/18/1030",
          verificationStatus: "VERIFIED",
        },
        {
          statute: "Van Buren v. United States (2021)",
          section: "141 S. Ct. 1638",
          jurisdiction: "United States (Supreme Court)",
          verificationStatus: "VERIFIED",
        },
      ];

      return {
        answer: `Under cyber law, the legal boundary between security testing and criminal hacking depends strictly on **authorization**:

1. **The Authorization Requirement:**
   - Security research conducted without explicit written consent from the system owner constitutes unauthorized access under anti-hacking statutes (e.g. US CFAA 18 U.S.C. § 1030 or Sri Lanka Computer Crimes Act Section 3).

2. **The Impact of *Van Buren v. United States* (2021):**
   - The US Supreme Court established that an individual "exceeds authorized access" under the CFAA only when accessing information on a computer system that they were not entitled under any circumstance to obtain.
   - Breaching a website's Terms of Service or an employer's internal policy does not automatically trigger federal criminal hacking liability.

3. **Safe Harbor & Vulnerability Disclosure:**
   - Security researchers should always operate within formal **Bug Bounty Program Rules of Engagement** or published **Coordinated Vulnerability Disclosure (CVD / security.txt)** guidelines to maintain legal protection.`,
        citations,
        disclaimer: this.mandatoryDisclaimer,
        provider: "local-rag",
        model: "lexguide-grounded-corpus-v1",
      };
    }

    if (q.includes("gdpr") || q.includes("breach") || q.includes("72 hours") || q.includes("privacy")) {
      const citations: LegalCitation[] = [
        {
          statute: "General Data Protection Regulation (EU 2016/679)",
          section: "Articles 33, 34, and 83",
          jurisdiction: "European Union",
          url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
          verificationStatus: "VERIFIED",
        },
      ];

      return {
        answer: `Under the European Union's General Data Protection Regulation (GDPR):

1. **Mandatory Breach Notification (Article 33):**
   - In the event of a personal data breach, data controllers must notify the competent supervisory authority without undue delay and, where feasible, **not later than 72 hours** after becoming aware of it, unless the breach is unlikely to result in a risk to the rights and freedoms of individuals.

2. **Notification to Affected Individuals (Article 34):**
   - When a personal data breach is likely to result in a *high risk* to individuals' rights and freedoms, the controller must communicate the breach to the data subjects directly without undue delay.

3. **Penalties (Article 83):**
   - Administrative fines can reach up to €20 million or 4% of the total worldwide annual turnover of the preceding financial year, whichever is higher.`,
        citations,
        disclaimer: this.mandatoryDisclaimer,
        provider: "local-rag",
        model: "lexguide-grounded-corpus-v1",
      };
    }

    // Default synthesis from retrieved context
    const defaultCitations: LegalCitation[] = [
      {
        statute: "Budapest Convention on Cybercrime (ETS No. 185)",
        jurisdiction: "International",
        url: "https://www.coe.int/en/web/cybercrime/the-budapest-convention",
        verificationStatus: "VERIFIED",
      },
    ];

    return {
      answer: `Based on the verified legal knowledge base:

- **Primary Legal Frameworks:** Cyber offenses and rights are established by statutory law, regulatory directives, and international treaties.
- **Key Concepts:** Distinctions between computer-dependent offenses (e.g. ransomware, DDoS) and computer-enabled offenses (fraud, harassment) govern statutory penalties.
- **Evidence Integrity:** Judicial admissibility requires proving an unbroken chain of custody and cryptographic hash verification (ISO/IEC 27037).

To get detailed statutory breakdowns, try asking about specific topics such as "Sri Lanka cyber laws", "Ethical hacking authorization", "GDPR breach rules", or "Admissibility of digital evidence".`,
      citations: defaultCitations,
      disclaimer: this.mandatoryDisclaimer,
      provider: "local-rag",
      model: "lexguide-grounded-corpus-v1",
    };
  }
}
