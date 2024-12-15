export interface Company {
  id: number;
  name: string;
  industry: string;
  type?: string;
  size: number;
  bio?: string;
  description?: string;
  website?: string;
  linkedin_url?: string;
  twitter_url?: string;
  github_url?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  logo_url?: string;
  status: 'active' | 'inactive';
  branding?: {
    primary_color?: string;
    secondary_color?: string;
    font_family?: string;
  };
  ui_archetype?: string;
  products: Array<{
    id: number;
    name: string;
    description?: string;
  }>;
  applications: Array<{
    id: number;
    name: string;
    description?: string;
    stage: 'memory' | 'blueprint' | 'visual_prd' | 'prototype' | 'development' | 'launch';
    status: 'active' | 'inactive';
    pending_approval?: boolean;
    feedback_required?: boolean;
    owner?: {
      id: number;
      name: string;
      role: string;
    };
    last_updated: string;
    estimated_completion?: string;
    created_at: string;
  }>;
  created_at: string;
  products_count: number;
  screenshots_count: number;
}
