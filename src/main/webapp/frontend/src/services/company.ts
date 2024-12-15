import axios, { AxiosError } from 'axios';
import { Company, CompanyDetails, ApiResponse } from '../types/models';

const API_URL = `${import.meta.env.VITE_API_URL}/companies`;

export const companyService = {
    getAll: async (): Promise<Company[]> => {
        try {
            const response = await axios.get<ApiResponse<Company[]>>(API_URL);
            return response.data.data || [];
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data?.message || 'Failed to fetch companies');
            }
            throw error;
        }
    },

    getById: async (id: number): Promise<Company> => {
        try {
            const response = await axios.get<ApiResponse<Company>>(`${API_URL}/${id}`);
            if (!response.data.data) {
                throw new Error('Company not found');
            }
            return response.data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data?.message || 'Failed to fetch company');
            }
            throw error;
        }
    },

    getDetails: async (id: number): Promise<CompanyDetails> => {
        try {
            const response = await axios.get<ApiResponse<CompanyDetails>>(`${API_URL}/${id}/details`);
            if (!response.data.data) {
                throw new Error('Company details not found');
            }
            return response.data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data?.message || 'Failed to fetch company details');
            }
            throw error;
        }
    },

    create: async (company: Partial<Company>): Promise<Company> => {
        try {
            const response = await axios.post<ApiResponse<Company>>(API_URL, company);
            if (!response.data.data) {
                throw new Error('Failed to create company');
            }
            return response.data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data?.message || 'Failed to create company');
            }
            throw error;
        }
    },

    update: async (id: number, company: Partial<Company>): Promise<Company> => {
        try {
            const response = await axios.put<ApiResponse<Company>>(`${API_URL}/${id}`, company);
            if (!response.data.data) {
                throw new Error('Failed to update company');
            }
            return response.data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data?.message || 'Failed to update company');
            }
            throw error;
        }
    },

    delete: async (id: number): Promise<void> => {
        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data?.message || 'Failed to delete company');
            }
            throw error;
        }
    }
}; 