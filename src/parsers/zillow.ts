import cheerio from "cheerio";

export async function parseZillowListing(url: string) {
  // Simulate parsing a Zillow listing
  return {
    price: 500000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1500,
    lotSize: 6000,
    yearBuilt: 1990,
    propertyType: "Single Family",
    description: "Sample Zillow listing data.",
  };
}

export async function parseZillow(url: string, html: string) {
  try {
    if (!html) {
      throw new Error("HTML content is empty or undefined.");
    }

    const $ = cheerio.load(html);
    const nextDataScript = $("script#__NEXT_DATA__").html();

    if (!nextDataScript) {
      console.error("__NEXT_DATA__ script not found in Zillow HTML.");
      return null;
    }

    const nextData = JSON.parse(nextDataScript);
    const propertyData = nextData.props?.pageProps?.property;

    if (!propertyData) {
      console.error("Property data missing in __NEXT_DATA__.", nextData);
      return null;
    }

    return {
      address: propertyData.address,
      price: propertyData.price,
      bedrooms: propertyData.bedrooms,
      bathrooms: propertyData.bathrooms,
      squareFeet: propertyData.livingArea,
    };
  } catch (error) {
    console.error("Error parsing Zillow HTML:", error);
    return null;
  }
}
