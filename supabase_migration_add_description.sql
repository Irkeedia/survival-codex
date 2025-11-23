
-- Add description column if it doesn't exist
ALTER TABLE survival_sheets ADD COLUMN IF NOT EXISTS description TEXT;
