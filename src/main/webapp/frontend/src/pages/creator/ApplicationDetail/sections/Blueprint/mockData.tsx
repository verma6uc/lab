import React from 'react';
import {
  CompanyIconComponent,
  ApplicationIconComponent,
  ProductIconComponent,
} from './components/EntityIcons';
import { EntityDefinition, Entity, PageNode, Comment, EntityRelationship } from './types';

export const mockEntities: Record<Entity, EntityDefinition> = {
  company: {
    name: 'Company',
    icon: <CompanyIconComponent />,
    description: 'Represents an organization in the system',
    attributes: [
      {
        name: 'name',
        type: 'string',
        description: 'Company name',
        constraints: 'Required, unique',
      },
      {
        name: 'description',
        type: 'text',
        description: 'Company description',
      },
    ],
    states: [
      {
        name: 'Active',
        color: '#4caf50',
        description: 'Company is operational',
      },
      {
        name: 'Inactive',
        color: '#f44336',
        description: 'Company is suspended',
      },
    ],
    actions: [
      {
        name: 'Suspend Company',
        from: 'Active',
        to: 'Inactive',
        role: 'ADMIN',
        effects: ['Notify all company members', 'Disable access to applications'],
      },
    ],
  },
  application: {
    name: 'Application',
    icon: <ApplicationIconComponent />,
    description: 'A product development workspace',
    attributes: [
      {
        name: 'name',
        type: 'string',
        description: 'Application name',
        constraints: 'Required',
      },
      {
        name: 'stage',
        type: 'enum',
        description: 'Current development stage',
      },
    ],
    states: [
      {
        name: 'Draft',
        color: '#ff9800',
        description: 'Initial creation state',
      },
      {
        name: 'In Review',
        color: '#2196f3',
        description: 'Pending approval',
      },
      {
        name: 'Active',
        color: '#4caf50',
        description: 'Approved and active',
      },
      {
        name: 'Archived',
        color: '#9e9e9e',
        description: 'No longer in use',
      },
    ],
    actions: [
      {
        name: 'Submit for Review',
        from: 'Draft',
        to: 'In Review',
        role: 'CREATOR',
        effects: ['Notify reviewers', 'Create review task'],
      },
      {
        name: 'Approve',
        from: 'In Review',
        to: 'Active',
        role: 'ADMIN',
        effects: ['Notify creator', 'Enable deployment'],
      },
    ],
  },
  product: {
    name: 'Product',
    icon: <ProductIconComponent />,
    description: 'A specific product within an application',
    attributes: [
      {
        name: 'name',
        type: 'string',
        description: 'Product name',
        constraints: 'Required',
      },
      {
        name: 'version',
        type: 'string',
        description: 'Product version',
      },
    ],
    states: [
      {
        name: 'Development',
        color: '#ff9800',
        description: 'Under development',
      },
      {
        name: 'Released',
        color: '#4caf50',
        description: 'Available to users',
      },
    ],
    actions: [
      {
        name: 'Release',
        from: 'Development',
        to: 'Released',
        role: 'CREATOR',
        effects: ['Create release notes', 'Notify users'],
      },
    ],
  },
};

export const mockPages: PageNode[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'page',
    position: { x: 100, y: 100 },
    connections: [
      { to: 'applications', label: 'View Applications', type: 'navigation' },
      { to: 'createApp', label: 'Create New', type: 'action' },
    ],
  },
  {
    id: 'applications',
    title: 'Applications List',
    type: 'page',
    position: { x: 400, y: 100 },
    connections: [
      { to: 'appDetail', label: 'View Details', type: 'navigation' },
      { to: 'createApp', label: 'Create New', type: 'action' },
    ],
  },
  {
    id: 'appDetail',
    title: 'Application Details',
    type: 'page',
    position: { x: 700, y: 100 },
    connections: [
      { to: 'editApp', label: 'Edit', type: 'modal' },
      { to: 'deleteConfirm', label: 'Delete', type: 'dialog' },
    ],
  },
  {
    id: 'createApp',
    title: 'Create Application',
    type: 'modal',
    position: { x: 400, y: 300 },
    connections: [
      { to: 'applications', label: 'Submit', type: 'action' },
    ],
  },
  {
    id: 'editApp',
    title: 'Edit Application',
    type: 'modal',
    position: { x: 700, y: 300 },
    connections: [
      { to: 'appDetail', label: 'Save', type: 'action' },
    ],
  },
  {
    id: 'deleteConfirm',
    title: 'Confirm Delete',
    type: 'dialog',
    position: { x: 1000, y: 100 },
    connections: [
      { to: 'applications', label: 'Confirm', type: 'action' },
    ],
  },
];

export const mockComments: Comment[] = [
  {
    id: 1,
    author: "John Smith",
    content: "We should add a confirmation step before deleting applications",
    timestamp: "2024-01-15T10:30:00Z",
    elementId: "deleteConfirm",
    elementType: "page"
  },
  {
    id: 2,
    author: "Maria Garcia",
    content: "Consider adding a draft state for new applications",
    timestamp: "2024-01-16T15:45:00Z",
    elementId: "application",
    elementType: "entity"
  }
];

export const mockRelationships: EntityRelationship[] = [
  {
    from: 'company',
    to: 'application',
    type: 'one-to-many',
    label: 'owns',
  },
  {
    from: 'application',
    to: 'product',
    type: 'one-to-many',
    label: 'contains',
  },
]; 