import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { categories, exams } from '../src/data/exams';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('--- Starting Database Seeding ---');

  // 1. Clear existing data (optional, but good for idempotent seed)
  console.log('Cleaning up existing data...');
  const { error: deleteExamsError } = await supabase.from('exams').delete().neq('id', '0');
  const { error: deleteCatsError } = await supabase.from('categories').delete().neq('id', '0');
  
  if (deleteExamsError || deleteCatsError) {
    console.warn('Warning: Some cleanup might have failed (RLS might block deletes).');
  }

  // 2. Insert Categories
  console.log(`Inserting ${categories.length} categories...`);
  const { error: catError } = await supabase
    .from('categories')
    .insert(categories.map(c => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      icon: c.icon,
      exam_count: c.examCount
    })));

  if (catError) {
    console.error('Error inserting categories:', catError);
    return;
  }

  // 3. Insert Exams
  console.log(`Inserting ${exams.length} exams...`);
  const { error: examError } = await supabase
    .from('exams')
    .insert(exams.map(e => ({
      id: e.id,
      name: e.name,
      short_name: e.shortName,
      slug: e.slug,
      conducting_body: e.conductingBody,
      category_id: e.categoryId,
      level: e.level,
      description: e.description || '',
      short_description: e.shortDescription || '',
      logo: e.logo || '',
      official_website: e.officialWebsite,
      status: e.status,
      frequency: e.frequency,
      mode: e.mode,
      salary_range: e.salaryRange,
      vacancies: e.vacancies,
      eligibility: e.eligibility,
      exam_pattern: e.examPattern,
      syllabus: e.syllabus,
      important_dates: e.importantDates,
      resources: e.resources,
      related_exam_ids: e.relatedExamIds,
      cut_off: e.cutOff
    })));

  if (examError) {
    console.error('Error inserting exams:', examError);
    return;
  }

  console.log('--- Seeding Successful! ---');
}

seed().catch(err => {
  console.error('Seed failed unexpectedly:', err);
  process.exit(1);
});
