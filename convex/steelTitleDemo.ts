import { components } from "./_generated/api";
import { action } from "./_generated/server";
import { v } from "convex/values";

const DEFAULT_URL = "https://example.com";
const SCRAPE_TIMEOUT_MS = 5000;

const resolveSteelApiKey = (): string => {
  const apiKey = process.env.STEEL_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "Missing STEEL_API_KEY: set it with `npx convex env set STEEL_API_KEY <key>`.",
    );
  }

  return apiKey;
};

const normalizeUrl = (value: string | undefined): string => {
  const candidate = value?.trim() || DEFAULT_URL;
  let parsed: URL;

  try {
    parsed = new URL(candidate);
  } catch {
    throw new Error(`Invalid URL: ${candidate}`);
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(`URL must be HTTP(S): ${candidate}`);
  }

  return parsed.toString();
};

const extractMetadataTitle = (scrapeResult: unknown): string | null => {
  if (!scrapeResult || typeof scrapeResult !== "object") {
    return null;
  }

  const metadata = (scrapeResult as { metadata?: unknown }).metadata;
  if (!metadata || typeof metadata !== "object") {
    return null;
  }

  const title = (metadata as { title?: unknown }).title;
  if (typeof title !== "string") {
    return null;
  }

  const normalized = title.trim();
  return normalized.length > 0 ? normalized : null;
};

const isResolutionError = (error: unknown): boolean => {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("Couldn't resolve");
};

export const getTitle = action({
  args: {
    ownerId: v.string(),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const targetUrl = normalizeUrl(args.url);
    const scrapePayload = {
      apiKey: resolveSteelApiKey(),
      ownerId: args.ownerId,
      url: targetUrl,
      timeout: SCRAPE_TIMEOUT_MS,
    };

    const scrapeCandidates = [
      { label: "components.steel.scrape", ref: (components as any).steel.scrape },
      { label: "components.steel.topLevel.scrape", ref: (components as any).steel.topLevel?.scrape },
      { label: "components.steel.steel.scrape", ref: (components as any).steel.steel?.scrape },
    ];

    let scrapeResult: unknown = null;
    let routeUsed: string | null = null;
    const resolutionErrors: string[] = [];

    for (const candidate of scrapeCandidates) {
      try {
        scrapeResult = await ctx.runAction(candidate.ref, scrapePayload);
        routeUsed = candidate.label;
        break;
      } catch (error) {
        if (isResolutionError(error)) {
          const message = error instanceof Error ? error.message : String(error);
          resolutionErrors.push(`${candidate.label}: ${message}`);
          continue;
        }
        throw error;
      }
    }

    if (!scrapeResult || !routeUsed) {
      throw new Error(
        `Unable to resolve Steel scrape action from component references. Tried: ${resolutionErrors.join(
          " | ",
        )}`,
      );
    }

    const title = extractMetadataTitle(scrapeResult);
    if (!title) {
      throw new Error(`Steel scrape returned no metadata.title for ${targetUrl}`);
    }

    return {
      url: targetUrl,
      title,
      routeUsed,
      metadata: (scrapeResult as { metadata?: unknown }).metadata ?? null,
    };
  },
});

