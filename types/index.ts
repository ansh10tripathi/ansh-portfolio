/** TypeScript interfaces for the portfolio */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  github: string;
  category: string;
  highlight: string;
  date: string;
  badge: string;
  color: string;
  icon: string;
  live?: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface SkillCategory {
  languages: Skill[];
  ml: Skill[];
  web: Skill[];
  tools: Skill[];
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Certification {
  title: string;
  issuer: string;
  duration: string;
  icon: string;
  color: string;
}

export interface Activity {
  role: string;
  description: string;
  year: string;
  type: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

export interface GitHubUser {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
}

export interface GitHubStats {
  user: GitHubUser;
  repos: GitHubRepo[];
  totalStars: number;
  totalForks: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  subtitle: string;
  org: string;
  date: string;
  type: 'Education' | 'Project' | 'Achievement' | 'Certification' | 'Activity' | 'Competition';
  description: string;
  icon: string;
  color: string;
}
