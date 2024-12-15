import { Company, Application } from './types';

export interface MockCompany extends Company {
  applications: number;
  activeUsers: number;
  lastActivity: string;
}

export interface MockApplication extends Application {
  company: string;
  status: 'Draft' | 'In Review' | 'Active' | 'Archived';
  lastModified: string;
  creator: string;
  progress: number;
}

export const mockCompanies: MockCompany[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    description: 'Enterprise software solutions provider',
    applications: 12,
    activeUsers: 150,
    lastActivity: '2024-02-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'InnovateLabs',
    description: 'Research and development firm',
    applications: 8,
    activeUsers: 75,
    lastActivity: '2024-02-14T15:45:00Z',
  },
  {
    id: '3',
    name: 'DataFlow Systems',
    description: 'Data analytics and visualization platform',
    applications: 15,
    activeUsers: 200,
    lastActivity: '2024-02-15T09:15:00Z',
  },
];

export const mockApplications: MockApplication[] = [
  {
    id: '1',
    name: 'Customer Portal',
    description: 'Self-service customer management platform',
    company: 'TechCorp Solutions',
    status: 'Active',
    lastModified: '2024-02-15T08:30:00Z',
    creator: 'John Smith',
    progress: 100,
  },
  {
    id: '2',
    name: 'Analytics Dashboard',
    description: 'Real-time data visualization tool',
    company: 'DataFlow Systems',
    status: 'In Review',
    lastModified: '2024-02-14T16:45:00Z',
    creator: 'Sarah Johnson',
    progress: 85,
  },
  {
    id: '3',
    name: 'Research Tracker',
    description: 'Project and experiment management system',
    company: 'InnovateLabs',
    status: 'Draft',
    lastModified: '2024-02-15T11:20:00Z',
    creator: 'Michael Brown',
    progress: 45,
  },
];

export const mockApprovals = [
  {
    id: '1',
    applicationName: 'Analytics Dashboard',
    company: 'DataFlow Systems',
    submittedBy: 'Sarah Johnson',
    submittedDate: '2024-02-14T16:45:00Z',
    status: 'Pending',
    priority: 'High',
    type: 'New Application',
  },
  {
    id: '2',
    applicationName: 'Customer Portal',
    company: 'TechCorp Solutions',
    submittedBy: 'John Smith',
    submittedDate: '2024-02-13T14:30:00Z',
    status: 'Approved',
    priority: 'Medium',
    type: 'Update',
  },
];

export const mockSimulatedResponses = {
  submitApplication: {
    success: true,
    message: 'Application submitted for approval. In the real product, this would trigger notifications to reviewers and create a review task.',
  },
  approveApplication: {
    success: true,
    message: 'Application approved. In the real product, this would update the application status, notify the creator, and enable deployment options.',
  },
  rejectApplication: {
    success: true,
    message: 'Application rejected. In the real product, this would return the application to draft status and notify the creator with feedback.',
  },
}; 