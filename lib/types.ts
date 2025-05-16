// Resume data types
export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description?: string;
  location?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  location?: string;
  highlights?: string[];
}

export interface Skill {
  name: string;
  level?: string;
  category?: string;
}

export interface Project {
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  url?: string;
  highlights?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface ResumeData {
  id?: string;
  basics: {
    name: string;
    label?: string;
    email: string;
    phone?: string;
    url?: string;
    location?: {
      address?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
    };
    summary?: string;
  };
  education: Education[];
  work: Experience[];
  skills: Skill[];
  projects?: Project[];
  certifications?: Certification[];
  languages?: Language[];
  interests?: { name: string; keywords?: string[] }[];
  references?: { name: string; reference: string; position?: string; company?: string }[];
}

// ATS Analysis types
export interface KeywordMatch {
  keyword: string;
  present: boolean;
  importance: "high" | "medium" | "low";
  suggestions?: string[];
}

export interface SectionScore {
  name: string;
  score: number;
  max: number;
  feedback?: string[];
}

export interface ATSAnalysis {
  overallScore: number;
  keywordMatches: KeywordMatch[];
  sectionScores: SectionScore[];
  suggestions: string[];
  strengths: string[];
  improvementAreas: string[];
}

// Templates
export enum TemplateType {
  Professional = "professional",
  Modern = "modern",
  Creative = "creative",
  Minimal = "minimal",
  Executive = "executive"
}

export interface Template {
  id: TemplateType;
  name: string;
  description: string;
  previewImage: string;
  atsScore: number;
}