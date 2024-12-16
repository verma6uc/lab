export enum SpaceType {
  DEPARTMENT = 'DEPARTMENT',
  TEAM = 'TEAM',
  PROJECT = 'PROJECT',
  PERSONAL = 'PERSONAL',
  FACILITY = 'FACILITY'
}

export interface SpaceAttributes {
  capacity?: number;
  location?: string;
  manager?: string;
  budget?: number;
  startDate?: string;
  endDate?: string;
  member_count?: number;
}

export interface Space {
  id: number;
  name: string;
  type: SpaceType;
  status: string;
  created_at: string;
  description?: string;
  attributes?: SpaceAttributes;
  parent?: number;
  children?: Space[];
}

export interface SpaceNodeProps {
  space: Space;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}
