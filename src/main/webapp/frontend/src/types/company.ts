import { STAGES } from '../components/admin/companies/details/stages';
import { CompanyUser } from './user';
import { SpaceType } from './space';

export interface CompanyMetrics {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyGrowth: number;
  userGrowth: number;
  revenueGrowth: number;
  products_count: number;
  screenshots_count: number;
}

export interface CompanyApplication {
  id: number;
  name: string;
  description: string;
  stage: keyof typeof STAGES;
  status: string;
}

export interface CompanySpace {
  id: number;
  name: string;
  type: SpaceType;
  status: string;
  created_at: string;
  description?: string;
  attributes?: {
    capacity?: number;
    location?: string;
    manager?: string;
    budget?: number;
    startDate?: string;
    endDate?: string;
    member_count?: number;
  };
  parent?: number;
  children?: CompanySpace[];
}

export interface Company {
  id: number;
  name: string;
  industry: string;
  description: string;
  size: string;
  status: string;
  type: string;
  products: string[];
  created_at: string;
  updated_at: string;
  website: string;
  logo_url: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  bio: string;
  branding: {
    primary_color: string;
    secondary_color: string;
    logo_url: string;
  };
  metrics: CompanyMetrics;
  applications: CompanyApplication[];
  spaces: CompanySpace[];
  users: CompanyUser[];
}

export interface CompanyOverviewProps {
  company: Company;
  onEdit: () => void;
}

export interface CompanyMetricsProps extends CompanyMetrics {
  company?: Company;
}

export interface CompanySpacesProps {
  spaces: CompanySpace[];
  onAddSpace: () => void;
  onEditSpace: (id: number) => void;
  onDeleteSpace: (id: number) => void;
}

export interface CompanyUsersProps {
  users: CompanyUser[];
  onAddUser: () => void;
  onEditUser: (id: number) => void;
  onDeleteUser: (id: number) => void;
}
