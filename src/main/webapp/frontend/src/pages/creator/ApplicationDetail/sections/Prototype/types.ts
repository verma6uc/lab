export interface Company {
  id: string;
  name: string;
  description: string;
}

export interface Application {
  id: string;
  name: string;
  description: string;
}

export interface FeedbackData {
  id: string;
  elementId: string;
  comment: string;
  timestamp: string;
  position: { x: number; y: number };
  status: 'pending' | 'approved' | 'rejected';
  response?: string;
}

export interface ValidationResponse {
  isValid: boolean;
  message: string;
  validationCode: 'DATA_MODEL' | 'BUSINESS_LOGIC' | 'SUCCESS';
}

export type SectionType = 
  | 'data-table' 
  | 'list-view' 
  | 'card-grid' 
  | 'metrics' 
  | 'chart' 
  | 'form' 
  | 'kanban';

export interface TableColumn {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'status' | 'actions';
  sortable?: boolean;
  filterable?: boolean;
}

export interface MetricCard {
  id: string;
  label: string;
  value: number | string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  icon?: string;
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'area';
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
  }[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  items: {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
  }[];
}

export interface SectionData {
  id: string;
  title: string;
  type: SectionType;
  description?: string;
  validations?: {
    dataModel?: boolean;
    businessLogic?: boolean;
  };
  config: {
    columns?: TableColumn[];
    metrics?: MetricCard[];
    chart?: ChartConfig;
    kanban?: KanbanColumn[];
    items?: any[];
  };
}

export interface PrototypeSection {
  id: string;
  title: string;
  sections: SectionData[];
} 