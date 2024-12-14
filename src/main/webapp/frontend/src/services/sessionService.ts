import axios from 'axios';
import { Session } from '../types/models';

const BASE_URL = '/api/sessions';

export interface SessionFilters {
  status?: string[];
  browser?: string[];
  deviceType?: string[];
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}

export interface SessionStats {
  totalSessions: number;
  activeSessions: number;
  idleSessions: number;
  disconnectedSessions: number;
  byDevice: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  byBrowser: {
    [key: string]: number;
  };
  averageDuration: number;
}

class SessionService {
  async getLiveSessions(filters?: SessionFilters): Promise<Session[]> {
    try {
      const response = await axios.get(BASE_URL, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching live sessions:', error);
      throw error;
    }
  }

  async getSessionStats(): Promise<SessionStats> {
    try {
      const response = await axios.get(`${BASE_URL}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching session stats:', error);
      throw error;
    }
  }

  async getSessionById(sessionId: string): Promise<Session> {
    try {
      const response = await axios.get(`${BASE_URL}/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching session details:', error);
      throw error;
    }
  }

  async updateSessionStatus(sessionId: string, status: string): Promise<void> {
    try {
      await axios.patch(`${BASE_URL}/${sessionId}/status`, { status });
    } catch (error) {
      console.error('Error updating session status:', error);
      throw error;
    }
  }

  async terminateSession(sessionId: string): Promise<void> {
    try {
      await axios.delete(`${BASE_URL}/${sessionId}`);
    } catch (error) {
      console.error('Error terminating session:', error);
      throw error;
    }
  }

  async getSessionsByCompany(companyId: number, filters?: SessionFilters): Promise<Session[]> {
    try {
      const response = await axios.get(`${BASE_URL}/company/${companyId}`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching company sessions:', error);
      throw error;
    }
  }

  async getSessionAnalytics(timeRange: string): Promise<any> {
    try {
      const response = await axios.get(`${BASE_URL}/analytics`, { params: { timeRange } });
      return response.data;
    } catch (error) {
      console.error('Error fetching session analytics:', error);
      throw error;
    }
  }

  async exportSessions(filters?: SessionFilters): Promise<Blob> {
    try {
      const response = await axios.get(`${BASE_URL}/export`, {
        params: filters,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting sessions:', error);
      throw error;
    }
  }
}

export const sessionService = new SessionService(); 