import express from "express";
import { parseListing } from "./src/api/parseListing";

const app = express();
app.use(express.json());

app.post("/api/parse-listing", async (req, res) => {
  const { url } = req.body;
  try {
    const data = await parseListing(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
