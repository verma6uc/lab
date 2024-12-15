import { ReactNode } from 'react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  bullets: string[];
  category: 'research' | 'development' | 'improvement';
}

export interface FeatureCategory {
  id: 'research' | 'development' | 'improvement';
  title: string;
  description: string;
}

export interface FeatureTab {
  category: FeatureCategory;
  features: Feature[];
}
