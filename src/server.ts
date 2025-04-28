import express, { Request, Response } from "express";
import path from "path";
import parseListing from "./api/parseListing";

const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, "../public")));

// API Route: Paste a listing URL and parse it
app.post("/api/parse-listing", parseListing);

// Add routes to serve HTML pages manually
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/pages/index.html"));
});

app.get("/learn-more.html", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/pages/learn-more.html"));
});

app.get("/learn.html", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/pages/learn.html"));
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ HomePilot AI server running on http://localhost:${PORT}`);
});
