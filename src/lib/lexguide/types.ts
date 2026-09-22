export interface LegalCitation {
  statute: string;
  section?: string;
  jurisdiction: string;
  url?: string;
  verificationStatus: "VERIFIED" | "DRAFT_AWAITING_VERIFICATION";
}

export interface LexGuideMessage {
  id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  citations?: LegalCitation[];
  timestamp?: string;
}

export interface LexGuideRequest {
  query: string;
  history?: LexGuideMessage[];
  jurisdiction?: string;
}

export interface LexGuideResponse {
  answer: string;
  citations: LegalCitation[];
  disclaimer: string;
  provider: string;
  model: string;
}

export interface ILexGuideProvider {
  name: string;
  generateAnswer(
    query: string,
    context: string[],
    history?: LexGuideMessage[]
  ): Promise<LexGuideResponse>;
}
