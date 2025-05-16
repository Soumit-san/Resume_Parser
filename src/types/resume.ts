export interface EducationItem {
  institution: string;
  degree: string;
  dates?: string;
  description?: string;
}

export interface ExperienceItem {
  company: string;
  title: string;
  dates?: string;
  location?: string;
  description?: string;
}

export interface ResumeData {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  skills?: string[];
  education?: EducationItem[];
  experience?: ExperienceItem[];
  [key: string]: any; // For any additional fields returned by the API
}