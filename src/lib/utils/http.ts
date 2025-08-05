// HTTP utility functions following Unix philosophy
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || 'Request failed',
          status: response.status,
        };
      }

      return {
        data,
        status: response.status,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
        status: 500,
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// Pre-configured client
export const apiClient = new HttpClient();

// Specific API functions
export const skillsApi = {
  getAll: () => apiClient.get('/skills'),
  getByCategory: (category: string) => apiClient.get(`/skills?category=${category}`),
  getCategories: () => apiClient.get('/skills/categories'),
  create: (data: unknown) => apiClient.post('/skills', data),
};

export const projectsApi = {
  getAll: () => apiClient.get('/projects'),
  getByCategory: (category: string) => apiClient.get(`/projects?category=${category}`),
  getFeatured: () => apiClient.get('/projects?featured=true'),
  create: (data: unknown) => apiClient.post('/projects', data),
};

export const personalApi = {
  quotes: {
    getAll: () => apiClient.get('/personal/quotes'),
    getFavorites: () => apiClient.get('/personal/quotes?favorites=true'),
    create: (data: unknown) => apiClient.post('/personal/quotes', data),
  },
};