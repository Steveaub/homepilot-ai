-- Enable Row-Level Security (RLS) on the listings table
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow users to SELECT (view) only their own listings
CREATE POLICY user_can_view_own_listings
ON listings
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Allow users to INSERT listings only if user_id matches their own ID
CREATE POLICY user_can_insert_listings
ON listings
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Allow users to UPDATE only their own listings
CREATE POLICY user_can_update_own_listings
ON listings
FOR UPDATE
USING (auth.uid() = user_id);

-- Policy: Allow users to DELETE only their own listings
CREATE POLICY user_can_delete_own_listings
ON listings
FOR DELETE
USING (auth.uid() = user_id);
