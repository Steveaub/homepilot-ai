import { Request, Response } from "express";

export default async function parseListing(
  req: Request,
  res: Response
): Promise<void> {
  // Mock JSON listing data
  const mockData = {
    id: 1,
    title: "Beautiful 3-bedroom house",
    price: "$350,000",
    location: "123 Main St, Springfield, USA",
    description:
      "A lovely 3-bedroom house with a spacious backyard and modern amenities.",
    address: "123 Main St, Springfield, USA",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2000,
  };

  // Send the mock data as a JSON response
  res.json(mockData);
}
