import axios from 'axios';
import { Company } from '../types/models';

const API_URL = `${import.meta.env.VITE_API_URL}/companies`;

export const companyService = {
    getAll: async (): Promise<Company[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getById: async (id: number): Promise<Company> => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    getDetails: async (id: number): Promise<any> => {
        const response = await axios.get(`${API_URL}/${id}/details`);
        return response.data;
    },

    create: async (company: Partial<Company>): Promise<Company> => {
        const response = await axios.post(API_URL, company);
        return response.data;
    },

    update: async (id: number, company: Partial<Company>): Promise<Company> => {
        const response = await axios.put(`${API_URL}/${id}`, company);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    }
}; 