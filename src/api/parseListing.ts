import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

function parseZpidFromUrl(url: string): string | null {
  const match = url.match(/\/(\d+)_zpid\//);
  return match ? match[1] : null;
}

async function fetchPropertyFromScrapeak(zpid: string) {
  const apiKey = process.env.SCRAPEAK_API_KEY;
  if (!apiKey) {
    throw new Error(
      "SCRAPEAK_API_KEY is not defined in environment variables."
    );
  }

  const maxRetries = 5;
  let attempt = 0;
  let delay = 1000; // Start with 1 second delay

  while (attempt < maxRetries) {
    try {
      const response = await axios.get(
        `https://app.scrapeak.com/v1/scrapers/zillow/property`,
        {
          params: { api_key: apiKey, zpid },
        }
      );

      console.log("Full Scrapeak API response:", response.data); // Log the full response

      if (!response.data || !response.data.data || Object.keys(response.data.data).length === 0) {
        console.error("Scrapeak returned no property data:", response.data);
        throw new Error("Scrapeak returned no property data.");
      }

      const propertyData = response.data.data;
      const address = propertyData.address?.streetAddress || null;
      const price = propertyData.price || null;
      const bedrooms = propertyData.bedrooms || null;
      const bathrooms = propertyData.bathrooms || null;

      if (!address) console.warn("Missing field: address");
      if (!price) console.warn("Missing field: price");
      if (!bedrooms) console.warn("Missing field: bedrooms");
      if (!bathrooms) console.warn("Missing field: bathrooms");

      return { address, price, bedrooms, bathrooms };
    } catch (error: any) {
      if (error.response?.status === 429) {
        console.warn(
          `Rate limit exceeded. Retrying in ${delay / 1000} seconds... (Attempt ${
            attempt + 1
          }/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
        attempt++;
      } else {
        console.error("Error during Scrapeak API call:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        throw error;
      }
    }
  }

  throw new Error(
    "Failed to fetch property data from Scrapeak after multiple attempts."
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { url } = req.body;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ message: "Missing or invalid URL" });
  }

  const zpid = parseZpidFromUrl(url);
  if (!zpid) {
    return res.status(400).json({ message: "Invalid Zillow URL" });
  }

  try {
    const propertyData = await fetchPropertyFromScrapeak(zpid);
    return res.status(200).json(propertyData);
  } catch (error: any) {
    console.error("Error fetching property data from Scrapeak:", error.message);
    return res.status(500).json({
      message: "Server error fetching property data.",
      error: error.message,
    });
  }
}
