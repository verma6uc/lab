import { ReactNode } from 'react';

export interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface Step {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}
