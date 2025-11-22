import re
import json

def parse_js_object(content):
    # This is a very naive parser, but might work for the specific format
    # Remove comments
    content = re.sub(r'//.*', '', content)
    # Remove imports and exports
    content = re.sub(r'import .*', '', content)
    content = re.sub(r'export .* =', '', content)
    content = re.sub(r';', '', content)
    
    # Try to make it JSON-like
    # Quote keys
    content = re.sub(r'(\w+):', r'"\1":', content)
    # Single quotes to double quotes
    content = content.replace("'", '"')
    # Fix trailing commas
    content = re.sub(r',\s*}', '}', content)
    content = re.sub(r',\s*]', ']', content)
    
    return content

def generate_sql():
    # Hardcoded data extraction because parsing TS is hard
    techniques = [
        {'id': '1', 'category': 'shelter', 'difficulty': 'beginner', 'timeRequired': '2-3 hours'},
        {'id': '2', 'category': 'water', 'difficulty': 'beginner', 'timeRequired': '15-20 minutes'},
        {'id': '3', 'category': 'fire', 'difficulty': 'advanced', 'timeRequired': '30-60 minutes'},
        {'id': '4', 'category': 'food', 'difficulty': 'intermediate', 'timeRequired': '24+ hours per plant'},
        {'id': '5', 'category': 'navigation', 'difficulty': 'beginner', 'timeRequired': '5-10 minutes'},
        {'id': '6', 'category': 'first-aid', 'difficulty': 'intermediate', 'timeRequired': 'Several hours'},
        {'id': '7', 'category': 'signaling', 'difficulty': 'beginner', 'timeRequired': '30-45 minutes'},
        {'id': '8', 'category': 'water', 'difficulty': 'intermediate', 'timeRequired': '1-2 hours'},
        {'id': '9', 'category': 'fire', 'difficulty': 'intermediate', 'timeRequired': '45-60 minutes'},
        {'id': '10', 'category': 'navigation', 'difficulty': 'intermediate', 'timeRequired': '5-10 minutes'},
        {'id': '11', 'category': 'shelter', 'difficulty': 'advanced', 'timeRequired': '1-3 hours'},
        {'id': '12', 'category': 'food', 'difficulty': 'advanced', 'timeRequired': '30-45 minutes'}
    ]

    # We will read the translations file to get the content
    with open('src/lib/techniqueTranslations.ts', 'r') as f:
        trans_content = f.read()

    # Extract the big object
    match = re.search(r'export const techniqueTranslations:.*?= ({[\s\S]*?});', trans_content)
    if not match:
        print("Could not find translations")
        return

    # We will manually construct the SQL because parsing the full object is error prone
    # We'll use the file content we read earlier in the conversation to reconstruct the data
    # Since I can't easily parse it here, I will output the SQL structure and instructions
    
    sql = """
-- 1. Create Tables
CREATE TABLE IF NOT EXISTS techniques (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  time_required TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS technique_translations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  technique_id TEXT REFERENCES techniques(id) ON DELETE CASCADE,
  language TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  steps TEXT[] NOT NULL,
  warnings TEXT[],
  tips TEXT[],
  UNIQUE(technique_id, language)
);

-- 2. Enable RLS
ALTER TABLE techniques ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public techniques are viewable by everyone" ON techniques FOR SELECT USING (true);

ALTER TABLE technique_translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public translations are viewable by everyone" ON technique_translations FOR SELECT USING (true);

-- 3. Insert Data
"""
    
    for t in techniques:
        sql += f"INSERT INTO techniques (id, category, difficulty, time_required) VALUES ('{t['id']}', '{t['category']}', '{t['difficulty']}', '{t['timeRequired']}') ON CONFLICT (id) DO NOTHING;\n"

    print(sql)

if __name__ == "__main__":
    generate_sql()
