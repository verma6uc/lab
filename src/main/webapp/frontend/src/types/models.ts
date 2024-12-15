// Database aligned enums
export enum UserRole {
    SUPERADMIN = 'SUPERADMIN',
    CREATOR = 'CREATOR',
    USER = 'USER'
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING'
}

export enum BrowserType {
    Chrome = 'Chrome',
    Firefox = 'Firefox',
    Safari = 'Safari',
    Edge = 'Edge',
    Other = 'Other'
}

export enum DeviceType {
    DESKTOP = 'desktop',
    MOBILE = 'mobile',
    TABLET = 'tablet'
}

export enum OSType {
    Windows = 'Windows',
    MacOS = 'MacOS',
    Linux = 'Linux',
    iOS = 'iOS',
    Android = 'Android',
    Other = 'Other'
}

export enum SessionStatus {
    ACTIVE = 'active',
    IDLE = 'idle',
    DISCONNECTED = 'disconnected'
}

export enum SpaceType {
    DEPARTMENT = 'DEPARTMENT',
    FACILITY = 'FACILITY',
    TEAM = 'TEAM',
    PROJECT = 'PROJECT',
    DIVISION = 'DIVISION'
}

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

// Database aligned interfaces
export interface Company {
    id: number;
    name: string;
    description?: string;
    industry: Industry;
    website?: string;
    email?: string;
    phone?: string;
    location?: string;
    size?: number;
    linkedinUrl?: string;
    twitterUrl?: string;
    githubUrl?: string;
    logoUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    id: number;
    name: string;
    description?: string;
    type?: string;
    status?: string;
    companyId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CompanyScreenshot {
    id: number;
    companyId: number;
    url: string;
    description?: string;
    type?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UIArchetype {
    id: number;
    companyId: number;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Session {
    id: string;
    userId: number;
    companyId: number;
    status: SessionStatus;
    startTime: Date;
    endTime?: Date;
    lastActivityTime: Date;
    deviceType: DeviceType;
    browser: BrowserType;
    browserVersion: string;
    osType: OSType;
    osVersion: string;
    deviceId: string;
    ipAddress: string;
    userAgent: string;
    location?: {
        city?: string;
        country?: string;
        latitude?: number;
        longitude?: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface AuditLog {
    auditId: number;
    userId: number;
    action: string;
    entityType: string;
    entityId: number;
    timestamp: Date;
    changes: AuditLogChange[];
}

export interface AuditLogChange {
    auditChangeId: number;
    auditId: number;
    fieldName: string;
    oldValue: string;
    newValue: string;
}

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    status: UserStatus;
    companyId: number;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Space {
    id: number;
    name: string;
    description?: string;
    type: SpaceType;
    companyId: number;
    parentSpaceId?: number;
    createdAt: Date;
    updatedAt: Date;
}

// Helper type for API responses
export interface ApiResponse<T> {
    data: T;
    message?: string;
    error?: string;
    timestamp: Date;
}

// Vector types for AI/ML features
export interface VectorData {
    id: number;
    vector: number[];
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

export interface BrandEmbedding extends VectorData {
    companyId: number;
    type: string;
    source: string;
}

// Common types used across interfaces
export type CompanyType = "startup" | "enterprise" | "smb" | "agency";
export type CompanyStatus = "active" | "inactive" | "pending" | "archived";
export type ProductStatus = "draft" | "active" | "deprecated" | "archived";
export type TeamType = "engineering" | "product" | "design" | "marketing" | "sales";
export type ResearchType = "market analysis" | "user research" | "competitive analysis";
export type CompetitorType = "direct" | "indirect" | "potential";
export type PricingModel = "subscription" | "one-time" | "freemium" | "custom";

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