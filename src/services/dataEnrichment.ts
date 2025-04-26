export function enrichData(listingData: any) {
  // Simulate data enrichment with mock public property records
  return {
    ...listingData,
    taxes: 0,
    lotSize: 0,
    additionalInfo: "Mock data enrichment applied.",
  };
}
