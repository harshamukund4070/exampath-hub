export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  icon: string;
  examCount: number;
}

export type ExamCategory = 'Central' | 'State' | 'Banking' | 'Defence' | 'Engineering' | 'Medical' | 'MBA' | 'Law' | 'Teaching' | 'Professional';
export type ExamLevel = 'National' | 'State' | 'University' | 'International';
export type ExamStatus = 'upcoming' | 'ongoing' | 'completed';
export type Eligibility = 'Graduate' | '12th' | '10th' | 'Post Graduate';

export interface Exam {
  id: string;
  name: string;
  slug: string;
  shortName: string;
  categoryId: string;
  conductingBody: string;
  level: "National" | "State" | "University" | "International";
  frequency: string;
  mode: "Online" | "Offline" | "Hybrid";
  eligibility: {
    education: string;
    ageLimit: string;
    nationality: string;
  };
  examPattern: {
    stages: string[];
    subjects: string[];
    markingScheme: string;
    duration: string;
    negativeMarking: boolean;
  };
  syllabus: { section: string; topics: string[] }[];
  importantDates: {
    notification: string;
    applicationStart: string;
    applicationEnd: string;
    admitCard: string;
    examDate: string;
    result: string;
  };
  cutOff: { category: string; marks: string }[];
  selectionProcess: string;
  salaryRange: string;
  vacancies: number | null;
  officialWebsite: string;
  status: "upcoming" | "ongoing" | "completed";
  viewCount: number;
  resources: {
    books: string[];
    youtubeChannels: string[];
  };
  relatedExamIds: string[];
}
