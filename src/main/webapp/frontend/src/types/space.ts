export type SpaceType = 'facility' | 'department' | 'team' | 'division' | 'unit';

export interface Space {
  id: number;
  name: string;
  type: SpaceType;
  description?: string;
  parent_id?: number;
  attributes?: {
    location?: string;
    capacity?: number;
    manager?: string;
    [key: string]: any;
  };
  status: 'active' | 'inactive';
  created_at: string;
  updated_at?: string;
}

export interface SpaceAttribute {
  id: number;
  space_id: number;
  key: string;
  value: string;
  created_at: string;
}
