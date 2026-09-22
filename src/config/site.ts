/* ============================================================
   CyberLex Configuration — Site-wide constants
   ============================================================ */

export const siteConfig = {
  name: "CyberLex",
  tagline: "Understand the Laws of the Digital World.",
  description:
    "Explore cybercrime, privacy, digital rights, cybersecurity regulation and emerging technology law through clear explanations backed by trusted sources.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://cyberlex.io",

  disclaimer:
    "CyberLex provides general educational and informational content. It does not constitute legal advice and does not create a lawyer-client relationship. Laws differ by jurisdiction and change over time. For advice concerning a specific situation, consult a qualified legal professional or the relevant authority.",
} as const;

export const navigation = {
  main: [
    { label: "Home", href: "/" },
    { label: "Learn", href: "/learn" },
    { label: "Cyber Law Explorer", href: "/a-z" },
    { label: "Countries", href: "/countries" },
    {
      label: "Topics",
      href: "/topics",
      megaMenu: true,
      children: [
        { label: "Cybercrime", href: "/topics/cybercrime", icon: "Shield" },
        { label: "Privacy", href: "/topics/privacy", icon: "Lock" },
        { label: "Data Protection", href: "/topics/data-protection", icon: "Database" },
        { label: "Digital Evidence", href: "/topics/digital-evidence", icon: "FileSearch" },
        { label: "Social Media", href: "/topics/social-media", icon: "MessageCircle" },
        { label: "Ethical Hacking", href: "/topics/ethical-hacking", icon: "Terminal" },
        { label: "Electronic Transactions", href: "/topics/electronic-transactions", icon: "CreditCard" },
        { label: "AI & Law", href: "/topics/ai-law", icon: "Brain" },
        { label: "Intellectual Property", href: "/topics/intellectual-property", icon: "Copyright" },
        { label: "Cybersecurity Compliance", href: "/topics/cybersecurity-compliance", icon: "CheckCircle" },
        { label: "Digital Rights", href: "/topics/digital-rights", icon: "Scale" },
        { label: "Online Safety", href: "/topics/online-safety", icon: "ShieldCheck" },
        { label: "FinTech & Cybercrime", href: "/topics/fintech-cybercrime", icon: "Wallet" },
        { label: "Children Online", href: "/topics/children-online", icon: "Users" },
        { label: "Workplace Technology", href: "/topics/workplace-technology", icon: "Building" },
        { label: "Cloud & Data", href: "/topics/cloud-data", icon: "Cloud" },
        { label: "International Cooperation", href: "/topics/international-cooperation", icon: "Globe" },
      ],
    },
    { label: "Cases", href: "/cases" },
    { label: "News & Updates", href: "/updates" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
  ],
  footer: {
    explore: [
      { label: "Cyber Law Explorer", href: "/a-z" },
      { label: "Topics", href: "/topics" },
      { label: "Countries", href: "/countries" },
      { label: "Case Studies", href: "/cases" },
      { label: "Resources", href: "/resources" },
    ],
    learn: [
      { label: "Guides", href: "/learn" },
      { label: "Glossary", href: "/glossary" },
      { label: "Quiz", href: "/quiz" },
      { label: "Learning Paths", href: "/learn/cyber-law-foundations" },
      { label: "Scenarios", href: "/scenarios" },
    ],
    about: [
      { label: "About CyberLex", href: "/about" },
      { label: "Editorial Policy", href: "/about/editorial-policy" },
      { label: "How We Research", href: "/about/how-we-research" },
      { label: "Corrections", href: "/about/corrections" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
} as const;

export const legalInstrumentTypes = [
  { value: "LAW", label: "Law", color: "bg-blue-600" },
  { value: "REGULATION", label: "Regulation", color: "bg-indigo-600" },
  { value: "DIRECTIVE", label: "Directive", color: "bg-violet-600" },
  { value: "TREATY", label: "Treaty", color: "bg-emerald-600" },
  { value: "BILL", label: "Bill", color: "bg-yellow-600" },
  { value: "PROPOSED_LAW", label: "Proposed Law", color: "bg-orange-500" },
  { value: "GUIDANCE", label: "Guidance", color: "bg-sky-500" },
  { value: "STANDARD", label: "Standard", color: "bg-teal-500" },
  { value: "FRAMEWORK", label: "Framework", color: "bg-cyan-600" },
  { value: "CASE_LAW", label: "Case Law", color: "bg-amber-600" },
  { value: "POLICY", label: "Policy", color: "bg-slate-500" },
] as const;

export const articleStatuses = [
  { value: "CURRENT", label: "Current", color: "text-green-400" },
  { value: "AMENDED", label: "Amended", color: "text-yellow-400" },
  { value: "REPEALED", label: "Repealed", color: "text-red-400" },
  { value: "PROPOSED", label: "Proposed", color: "text-orange-400" },
  { value: "AWAITING_COMMENCEMENT", label: "Awaiting Commencement", color: "text-blue-400" },
  { value: "UNDER_REVIEW", label: "Under Review", color: "text-purple-400" },
  { value: "ARCHIVED", label: "Archived", color: "text-gray-400" },
  { value: "DRAFT", label: "Draft", color: "text-amber-400" },
] as const;

export const sourceTypes = [
  { value: "PRIMARY", label: "Primary Source", icon: "✦" },
  { value: "OFFICIAL_REGULATOR", label: "Official Regulator", icon: "◆" },
  { value: "INTERNATIONAL_ORG", label: "International Organization", icon: "◇" },
  { value: "ACADEMIC", label: "Academic Source", icon: "○" },
  { value: "SECONDARY", label: "Secondary Source", icon: "·" },
] as const;

export const countries = [
  { code: "LK", name: "Sri Lanka", region: "South Asia", flag: "🇱🇰" },
  { code: "EU", name: "European Union", region: "Europe", flag: "🇪🇺" },
  { code: "US", name: "United States", region: "North America", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", region: "Europe", flag: "🇬🇧" },
  { code: "IN", name: "India", region: "South Asia", flag: "🇮🇳" },
  { code: "SG", name: "Singapore", region: "Southeast Asia", flag: "🇸🇬" },
  { code: "AU", name: "Australia", region: "Oceania", flag: "🇦🇺" },
] as const;
