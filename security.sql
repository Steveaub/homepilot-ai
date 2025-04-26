-- Row-Level Security (RLS) policies for the listings table
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_can_view_own_listings
ON listings
USING (auth.uid() = user_id);

CREATE POLICY user_can_insert_listings
ON listings
FOR INSERT
WITH CHECK (auth.uid() = user_id);