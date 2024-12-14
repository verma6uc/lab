export enum Industry {
    TECHNOLOGY = 'TECHNOLOGY',
    HEALTHCARE = 'HEALTHCARE',
    FINANCE = 'FINANCE',
    RETAIL = 'RETAIL',
    MANUFACTURING = 'MANUFACTURING',
    EDUCATION = 'EDUCATION',
    ENTERTAINMENT = 'ENTERTAINMENT',
    REAL_ESTATE = 'REAL_ESTATE',
    ENERGY = 'ENERGY',
    TRANSPORTATION = 'TRANSPORTATION',
    CONSULTING = 'CONSULTING',
    TELECOMMUNICATIONS = 'TELECOMMUNICATIONS',
    AGRICULTURE = 'AGRICULTURE',
    CONSTRUCTION = 'CONSTRUCTION',
    HOSPITALITY = 'HOSPITALITY',
    MEDIA = 'MEDIA',
    AUTOMOTIVE = 'AUTOMOTIVE',
    AEROSPACE = 'AEROSPACE',
    BIOTECHNOLOGY = 'BIOTECHNOLOGY',
    OTHER = 'OTHER'
}

export interface Company {
    id: number;
    name: string;
    description?: string;
    industry?: string;
    type?: string;
    size?: number;
    location?: string;
    website?: string;
    email?: string;
    phone?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    githubUrl?: string;
    logoUrl?: string;
    team?: TeamMember[];
    competitors?: Competitor[];
    research?: ResearchItem[];
    uiArchetypes?: UIArchetype[];
    users?: CompanyUser[];
    products?: Array<{
        id: string;
        name: string;
        description: string;
        type: string;
        status: string;
    }>;
}

export interface Product {
    productId: number;
    productName: string;
    productDescription?: string;
    type?: string;
    status?: string;
    companyId: number;
}

export interface TeamMember {
    id: number;
    name: string;
    role?: string;
    bio?: string;
    avatar?: string;
    department?: string;
    email?: string;
    linkedin?: string;
    twitter?: string;
    location?: string;
    timezone?: string;
    slackChannel?: string;
    githubTeam?: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ResearchItem {
    id: number;
    title: string;
    description?: string;
    type?: string;
    authors?: string;
    publishedDate?: number;
    // Add other fields as necessary
}

export interface Competitor {
    id: number;
    name: string;
    description?: string;
    // Add other fields as necessary
}

export interface Brand {
    colors?: string;
    typography?: string;
    logoGuidelines?: string;
    voiceAndTone?: string;
    brandValues?: string;
}

export interface UIArchetype {
    archetypeId: number;
    archetypeName?: string;
    description?: string;
    // Add other fields as necessary
}

export interface CompanyUser {
    id: number;
    name: string;
    email: string;
    role?: string;
    department?: string;
    status?: string;
    // Add other fields as necessary
}

export interface CompanyDetails {
    company: Company;
    products: Product[];
    team: TeamMember[];
    research: ResearchItem[];
    competitors: Competitor[];
    users: CompanyUser[];
    brand: Brand;
    uiArchetypes: UIArchetype[];
}

// Common types used across interfaces
export type CompanyType = "startup" | "enterprise" | "smb" | "agency";
export type CompanyStatus = "active" | "inactive" | "pending" | "archived";
export type ProductStatus = "draft" | "active" | "deprecated" | "archived";
export type TeamType = "engineering" | "product" | "design" | "marketing" | "sales";
export type ResearchType = "market analysis" | "user research" | "competitive analysis";
export type CompetitorType = "direct" | "indirect" | "potential";
export type PricingModel = "subscription" | "one-time" | "freemium" | "custom";
export type UserRole = "admin" | "editor" | "viewer";

// Helper type for API responses
export interface ApiResponse<T> {
    data: T;
    message?: string;
    error?: string;
}

export interface Session {
  sessionId: string;
  userId: number;
  companyId: number;
  
  // Session Status
  status: 'active' | 'idle' | 'disconnected';
  startedAt: string;
  lastActivityAt: string;
  endedAt?: string;
  durationSeconds: number;
  
  // Device Information
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  browserVersion: string;
  osType: string;
  osVersion: string;
  deviceId: string;
  
  // Location Information
  ipAddress: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  
  // Technical Details
  userAgent: string;
  screenResolution: string;
  language: string;
  timezone: string;
  
  // Security & Performance
  isAuthenticated: boolean;
  isSecureConnection: boolean;
  connectionType: string;
  networkSpeed: string;
  
  // Page Navigation
  currentPage: string;
  previousPage: string;
  pageViews: number;
  
  // Analytics
  totalClicks: number;
  totalActions: number;
  bounceRate: number;
  
  // System Columns
  createdAt: string;
  updatedAt: string;
} 