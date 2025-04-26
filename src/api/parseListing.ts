// parseListing.ts

import { parseZillowListing } from "../parsers/zillow";
import { llmFallback } from "../services/llmFallback";
import { enrichData } from "../services/dataEnrichment";
import { detectSource } from "../utils/parserUtils";

export async function parseListing(url: string) {
  const source = detectSource(url);
  let listingData;

  try {
    if (source === "zillow") {
      listingData = await parseZillowListing(url);
    } else {
      throw new Error("Unsupported source");
    }
  } catch (error) {
    listingData = await llmFallback(url);
  }

  return enrichData(listingData);
}
