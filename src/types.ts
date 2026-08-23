export type Language = 'es' | 'en';

export interface ProjectItem {
  id: string;
  number: string; // e.g. "01", "02", "03"
  title: string;
  category: string; // "logos" | "identidad" | "poster" | "editorial" | "web" | "social" | "ilustracion" | "tarjeteria"
  client: string;
  year?: string;
  description: string;
  tools?: string[];
  features?: string[];
  imageUrl: string;
  images?: string[];
  imageAlt?: string;
  featured?: boolean;
}

export interface CategoryInfo {
  id: string;
  number: string;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon?: string;
  color?: string;
}

export interface ProfileInfo {
  name: string;
  title: string;
  subTitle: string;
  bio: string;
  teachingExperience: string;
  skills: string[];
  tools: string[];
  email: string;
  phone: string;
  location: string;
  avatarUrl?: string;
  customLogoUrl?: string;
  experienceValue?: string;
  experienceLabel?: string;
  teachingValue?: string;
  teachingLabel?: string;
  areasValue?: string;
  areasLabel?: string;
  interactiveValue?: string;
  interactiveLabel?: string;
  showInteractiveBadge?: boolean;
  showLogoText?: boolean;
  logoFontFamily?: string;
  logoLine1?: string;
  logoLine2?: string;
  coverCustomLogoUrl?: string;
  coverShowLogoText?: boolean;
  coverLogoLine1?: string;
  coverLogoLine2?: string;
  coverLogoFontFamily?: string;
  coverLogoSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  experienceBadgeText?: string;
  portfolioSectionTitle?: string;
  portfolioSectionSubtitle?: string;
  socialLinks?: SocialLink[];
  instagramUrl?: string;
  linkedinUrl?: string;
  behanceUrl?: string;
  dribbbleUrl?: string;
  githubUrl?: string;
}

export interface ClientSelection {
  clientName: string;
  clientCompany: string;
  clientContact: string;
  projectType: string;
  selectedProjects: string[]; // project IDs
  selectedServices: string[];
  budgetRange: string;
  estimatedTimeline: string;
  additionalNotes: string;
}

export interface QuoteRequest {
  id: string;
  quoteNumber: string;
  createdAt: string;
  timestamp: number;
  status: 'pending' | 'responded' | 'approved' | 'archived';
  clientName: string;
  clientCompany: string;
  clientContact: string;
  projectType: string;
  selectedProjects: string[];
  selectedServices: string[];
  budgetRange: string;
  estimatedTimeline: string;
  additionalNotes: string;
  autoResponseSummary?: string;
  designerNotified?: boolean;
}

export interface PortfolioData {
  profile: ProfileInfo;
  categories: CategoryInfo[];
  projects: ProjectItem[];
  themeColor: 'magenta-blue' | 'amber-gold' | 'cyan-slate' | 'emerald';
  buttonColor?: string;
  themeMode?: 'dark' | 'light';
  language?: Language;
}
