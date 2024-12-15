export interface DevelopmentViewProps {
  applicationId: string;
  applicationName: string;
  onProceedToLaunch: () => void;
}

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';

export type TaskCategory = 
  | 'blueprint_structure'
  | 'ui_integration'
  | 'forms_actions'
  | 'help_docs'
  | 'testing'
  | 'optimization';

export type TaskType =
  // Blueprint and Structure
  | 'define_section'
  | 'define_page'
  // UI and Data Integration
  | 'build_static_ui'
  | 'build_sql_json'
  | 'integrate_ui_data'
  // Forms, Actions, and Effects
  | 'build_form_config'
  | 'build_form_logic'
  | 'build_action'
  | 'build_effect_list'
  | 'build_effect'
  // Help/Documentation
  | 'write_page_help'
  | 'write_section_help'
  | 'write_form_help'
  // Testing
  | 'write_test_plan'
  | 'create_test_cases'
  | 'build_test_scenarios'
  | 'execute_test'
  // Optimization
  | 'optimize_performance';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  type: TaskType;
  category: TaskCategory;
  description: string;
  agent: string;
  confidence: number;
  lastUpdated: string;
  assignee?: string;
  priority: 'low' | 'medium' | 'high';
  labels: string[];
  dependencies?: string[]; // IDs of tasks that must be completed first
  targetEntity?: string; // Which entity this task is related to
  targetSection?: string; // Which section this task is related to
}

export interface TaskGroup {
  title: string;
  type: TaskCategory;
  description: string;
  tasks: Task[];
}

export interface TaskBoard {
  groups: TaskGroup[];
  statuses: { id: TaskStatus; label: string }[];
}

export interface TaskDetailsModalProps {
  task: TaskDetails | null;
  open: boolean;
  onClose: () => void;
}

export interface TaskDetails extends Task {
  history: {
    timestamp: string;
    action: string;
    agent: string;
    details: string;
    confidence: number;
  }[];
  comments: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }[];
  attachments?: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
  relatedTasks?: {
    id: string;
    title: string;
    type: TaskType;
    status: TaskStatus;
  }[];
}

export interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
}

export interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
}

export interface TaskCardProps {
  task: Task;
  onClick: () => void;
} 