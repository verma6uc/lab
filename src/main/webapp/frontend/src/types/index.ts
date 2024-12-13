// User related types
export interface User {
    userId: number;
    id: string;
    companyId: number;
    name: string;
    email: string;
    role: 'SUPERADMIN' | 'CREATOR' | 'USER';
    status: 'active' | 'inactive' | 'pending';
    lastActive?: string;
    avatar?: string;
    createdAt: string;
    department?: string;
    phone?: string;
    location?: string;
    bio?: string;
    skills?: string[];
    preferences?: Record<string, any>;
    socialLinks?: Record<string, any>;
}

export interface Team {
    teamId: number;
    companyId: number;
    teamName: string;
    createdAt: string;
    updatedAt: string;
}

export interface Conversation {
    conversationId: number;
    contextType: string;
    contextId: number;
    goal: string;
    model?: string;
    requestTokens?: number;
    responseTokens?: number;
    executionTime?: number;
    createdAt: string;
    updatedAt: string;
}

export interface ConversationMessage {
    messageId: number;
    conversationId: number;
    role: string;
    content: string;
    createdAt: string;
} 