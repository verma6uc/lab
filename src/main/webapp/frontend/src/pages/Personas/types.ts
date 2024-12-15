export interface Challenge {
  title: string;
  description: string;
}

export interface Persona {
  id: string;
  title: string;
  role: string;
  description: string;
  challenges: Challenge[];
  benefits: string[];
  outcomes: string[];
  color: string;
  agents: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}
