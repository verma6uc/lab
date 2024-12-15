import { ReactNode } from 'react';

export type ViewMode = 'entity' | 'page';
export type Entity = 'company' | 'application' | 'product';
export type ConnectionType = 'navigation' | 'action' | 'data' | 'modal' | 'dialog';

export interface EntityDefinition {
  name: string;
  icon: ReactNode;
  description: string;
  attributes: {
    name: string;
    type: string;
    description: string;
    constraints?: string;
  }[];
  states: {
    name: string;
    color: string;
    description: string;
  }[];
  actions: {
    name: string;
    from: string;
    to: string;
    role: string;
    effects: string[];
  }[];
}

export interface PageNode {
  id: string;
  title: string;
  type: 'page' | 'modal' | 'dialog';
  position: { x: number; y: number };
  connections: Array<{
    to: string;
    label: string;
    type: ConnectionType;
  }>;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  elementId: string;
  elementType: 'entity' | 'page' | 'state' | 'action';
}

export interface EntityRelationship {
  from: Entity;
  to: Entity;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  label: string;
}

export interface SelectedElement {
  id: string;
  type: 'entity' | 'page' | 'state' | 'action';
} 