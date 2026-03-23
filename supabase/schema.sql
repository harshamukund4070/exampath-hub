-- Categories Table
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  slug TEXT UNIQUE NOT NULL,
  exam_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Exams Table
CREATE TABLE exams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT,
  slug TEXT UNIQUE NOT NULL,
  conducting_body TEXT,
  category_id TEXT REFERENCES categories(id),
  level TEXT,
  description TEXT,
  short_description TEXT,
  logo TEXT,
  official_website TEXT,
  status TEXT DEFAULT 'upcoming',
  frequency TEXT,
  mode TEXT,
  salary_range TEXT,
  vacancies INTEGER,
  eligibility JSONB,
  exam_pattern JSONB,
  syllabus JSONB,
  important_dates JSONB,
  resources JSONB,
  related_exam_ids JSONB,
  cut_off JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access
CREATE POLICY "Allow public read access on categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on exams" ON exams FOR SELECT USING (true);
