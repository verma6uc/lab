export interface Contribution {
  category: string;
  items: string[];
}

export interface Agent {
  name: string;
  role: string;
  description: string;
  tagline: string;
  color: string;
  contributions: Contribution[];
}
