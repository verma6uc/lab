export type UserRole = 'ADMIN' | 'CREATOR' | 'USER';
export type UserStatus = 'active' | 'inactive';

export interface CompanyUser {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;
  role: UserRole;
  status: UserStatus;
  last_active?: string;
}
