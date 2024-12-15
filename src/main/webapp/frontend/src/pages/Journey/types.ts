export interface PersonaDetail {
  persona: string;
  needs: string[];
  outcomes: string[];
}

export interface Stage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  quote: {
    text: string;
    author: string;
  };
  keyPoints: string[];
  agents: string[];
  color: string;
  personaDetails: PersonaDetail[];
}
