export interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  avatarUrl?: string;
  section: string;
  elementId: string;
}

export interface CoreFeature {
  category: string;
  features: {
    name: string;
    description: string;
  }[];
}

export interface MemoryDocument {
  introduction: {
    productName: string;
    summary: string;
    problemStatement: string;
    intendedOutcome: string;
  };
  targetUsers: {
    personas: {
      name: string;
      description: string;
    }[];
    painPoints: string[];
    contexts: string[];
  };
  coreFeatures: CoreFeature[];
  createdAt: string;
  author: string;
  comments: Comment[];
}
