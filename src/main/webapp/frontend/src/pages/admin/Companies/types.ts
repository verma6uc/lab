export interface Company {
  id: number;
  name: string;
  industry: string;
  status: 'active' | 'inactive' | 'pending';
  employees: number;
  applications: number;
  lastActive: string;
}
