export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
  VIEWER = 'VIEWER',
  CREATOR = 'CREATOR'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED'
}

export interface CompanyUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  designation: string;
  department: string;
  lastActive: string;
  avatar_url?: string;
}

export interface UserCardProps {
  user: CompanyUser;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface RoleSummaryProps {
  users: CompanyUser[];
}
