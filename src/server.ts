import express, { Request, Response } from "express";
import path from "path";
import { parseListing } from "./api/parseListing";

const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, "../public")));

// API Route: Paste a listing URL and parse it
app.post("/api/parse-listing", (async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Missing URL in request body." });
  }

  try {
    const listing = await parseListing(url);
    const nextSteps = [
      "Review the property details.",
      "Schedule an inspection.",
      "Contact the seller or your agent.",
    ];

    res.status(200).json({ listing, nextSteps });
  } catch (error: any) {
    console.error("Error parsing listing:", error.message);
    res.status(500).json({ error: "Failed to parse the listing." });
  }
}) as express.RequestHandler);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ HomePilot AI server running on http://localhost:${PORT}`);
});
