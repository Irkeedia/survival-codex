
-- Add content column for Markdown support
ALTER TABLE survival_sheets ADD COLUMN IF NOT EXISTS content TEXT;
