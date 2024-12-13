import axios from 'axios';
import type { User, Team, Conversation, ConversationMessage } from '../types';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// User endpoints
export const userApi = {
    getUsers: () => api.get<User[]>('/users'),
    getUser: (id: number) => api.get<User>(`/users/${id}`),
    createUser: (user: Omit<User, 'userId'>) => api.post<User>('/users', user),
    updateUser: (id: number, user: Partial<User>) => api.put<User>(`/users/${id}`, user),
    deleteUser: (id: number) => api.delete(`/users/${id}`),
};

// Team endpoints
export const teamApi = {
    getTeams: () => api.get<Team[]>('/teams'),
    getTeam: (id: number) => api.get<Team>(`/teams/${id}`),
    createTeam: (team: Omit<Team, 'teamId'>) => api.post<Team>('/teams', team),
    updateTeam: (id: number, team: Partial<Team>) => api.put<Team>(`/teams/${id}`, team),
    deleteTeam: (id: number) => api.delete(`/teams/${id}`),
    addUserToTeam: (teamId: number, userId: number) => 
        api.post(`/teams/${teamId}/users/${userId}`),
    removeUserFromTeam: (teamId: number, userId: number) => 
        api.delete(`/teams/${teamId}/users/${userId}`),
};

// Conversation endpoints
export const conversationApi = {
    getConversations: () => api.get<Conversation[]>('/conversations'),
    getConversation: (id: number) => api.get<Conversation>(`/conversations/${id}`),
    createConversation: (conversation: Omit<Conversation, 'conversationId'>) => 
        api.post<Conversation>('/conversations', conversation),
    updateConversation: (id: number, conversation: Partial<Conversation>) => 
        api.put<Conversation>(`/conversations/${id}`, conversation),
    deleteConversation: (id: number) => api.delete(`/conversations/${id}`),
    
    // Conversation messages
    getMessages: (conversationId: number) => 
        api.get<ConversationMessage[]>(`/conversations/${conversationId}/messages`),
    addMessage: (conversationId: number, message: Omit<ConversationMessage, 'messageId' | 'conversationId'>) => 
        api.post<ConversationMessage>(`/conversations/${conversationId}/messages`, message),
};

// Error interceptor
api.interceptors.response.use(
    response => response,
    error => {
        // Handle errors (e.g., show notifications)
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default api; 