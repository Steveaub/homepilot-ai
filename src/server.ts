import express, { Request, Response } from "express";
import path from "path";
import parseListing from "./api/parseListing";
import dotenv from "dotenv";
import ReactDOMServer from "react-dom/server";
import React from "react";
import MortgageAgent from "./services/mortgageAgent";

dotenv.config({ path: ".env.local" });

const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, "../public")));

// Wrap the Next.js handler to make it compatible with Express
const expressParseListing = async (req: Request, res: Response) => {
  const nextReq = { body: req.body, method: req.method } as any;
  let responseSent = false;

  const nextRes = {
    status: (statusCode: number) => {
      res.status(statusCode);
      return nextRes;
    },
    json: (data: any) => {
      if (!responseSent) {
        responseSent = true;
        res.json(data);
      }
    },
  } as any;

  await parseListing(nextReq, nextRes);

  if (!responseSent) {
    // Trigger MortgageAgent after parsing completes
    const mortgageAgentHTML = ReactDOMServer.renderToString(
      React.createElement(MortgageAgent)
    );
    res.send(`<!DOCTYPE html><html><body>${mortgageAgentHTML}</body></html>`);
  }
};

// API Route: Paste a listing URL and parse it
app.post("/api/parseListing", expressParseListing);

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
