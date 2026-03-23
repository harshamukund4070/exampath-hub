import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Exam, Category } from '../data/exams';

export function useExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExams() {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('exams')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) throw supabaseError;
        
        // Map snake_case to camelCase if needed, but the current types might match
        // Actually, many fields in schema are snake_case to be standard Postgres, 
        // while the frontend uses camelCase.
        const mappedExams = (data || []).map(e => ({
          ...e,
          shortName: e.short_name,
          categoryId: e.category_id,
          conductingBody: e.conducting_body,
          description: e.description || '',
          shortDescription: e.short_description || '',
          officialWebsite: e.official_website,
          salaryRange: e.salary_range,
          examPattern: e.exam_pattern,
          importantDates: e.important_dates,
          relatedExamIds: e.related_exam_ids,
          cutOff: e.cut_off
        })) as Exam[];

        setExams(mappedExams);
      } catch (err: any) {
        console.error('Error fetching exams:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchExams();
  }, []);

  return { exams, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (error) throw error;
        
        const mapped = (data || []).map(c => ({
           id: c.id,
           name: c.name,
           slug: c.slug,
           icon: c.icon,
           parentId: c.parent_id || null, // Ensure compatibility
           examCount: c.exam_count
        })) as Category[];

        setCategories(mapped);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading };
}

export function useExam(slug: string | undefined) {
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchExam() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('exams')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        
        const mapped = {
          ...data,
          shortName: data.short_name,
          categoryId: data.category_id,
          conductingBody: data.conducting_body,
          officialWebsite: data.official_website,
          salaryRange: data.salary_range,
          examPattern: data.exam_pattern,
          importantDates: data.important_dates,
          relatedExamIds: data.related_exam_ids,
          cutOff: data.cut_off
        } as Exam;

        setExam(mapped);
      } catch (err) {
        console.error('Error fetching single exam:', err);
        setExam(null);
      } finally {
        setLoading(false);
      }
    }

    fetchExam();
  }, [slug]);

  return { exam, loading };
}
