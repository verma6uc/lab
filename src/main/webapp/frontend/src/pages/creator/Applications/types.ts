export interface Application {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
  type: string;
  owner: string;
}
