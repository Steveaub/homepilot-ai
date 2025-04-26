-- SQL schema for the listings table
CREATE TABLE listings (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    price NUMERIC,
    bedrooms INTEGER,
    bathrooms INTEGER,
    square_footage INTEGER,
    lot_size INTEGER,
    year_built INTEGER,
    property_type TEXT,
    description TEXT
);