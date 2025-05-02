import axios from "axios";
import { llmFallback } from "./llmFallback";

/**
 * Fetches the raw HTML of a Zillow listing using Scrapfly's API.
 * Handles 429 Too Many Requests errors by retrying once after a delay,
 * and falls back to the llmFallback service if the retry also fails.
 * @param url - The Zillow listing URL.
 * @returns The raw HTML of the page, fallback data as an object, or null.
 */
export async function getListingHtmlFromScrapfly(
  url: string
): Promise<string | object | null> {
  const apiKey = process.env.SCRAPFLY_API_KEY;
  if (!apiKey) {
    throw new Error(
      "SCRAPFLY_API_KEY is not set in the environment variables."
    );
  }

  const fetchHtml = async (): Promise<string> => {
    try {
      const response = await axios.get("https://api.scrapfly.io/scrape", {
        params: {
          key: apiKey,
          url,
          render_js: true, // Enable JavaScript rendering for dynamic content
          proxy_pool: true, // Use Scrapfly's proxy pool for better reliability
          country: "us", // Set country for geolocation-specific content
        },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });

      if (response.status !== 200 || !response.data) {
        console.error(
          `Failed to fetch HTML from Scrapfly API. Status: ${response.status}`,
          response.data
        );
        throw new Error(
          `Failed to fetch HTML from Scrapfly API. Status: ${response.status}`
        );
      }

      return response.data;
    } catch (error) {
      console.error("Error during Scrapfly API call:", error);
      throw error;
    }
  };

  try {
    return await fetchHtml();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      console.warn("Received 429 Too Many Requests. Retrying after delay...");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds

      try {
        return await fetchHtml();
      } catch (retryError) {
        console.error("Retry failed. Falling back to llmFallback.", retryError);
        return await llmFallback(url); // Return fallback object
      }
    } else {
      console.error("Error fetching listing HTML:", error);
      return null;
    }
  }
}
