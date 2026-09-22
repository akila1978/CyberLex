import { ILexGuideProvider } from "./types";
import { MockLexGuideProvider } from "./providers/mock";

export function getLexGuideProvider(): ILexGuideProvider {
  const configuredProvider = process.env.LEXGUIDE_AI_PROVIDER || "mock";

  switch (configuredProvider.toLowerCase()) {
    case "mock":
    default:
      return new MockLexGuideProvider();
  }
}

export * from "./types";
