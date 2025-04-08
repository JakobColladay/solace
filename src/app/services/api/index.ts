// src/services/api/base.ts
export class BaseApi {
    private baseUrl: string;

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl;
    }

    protected async fetchWithErrorHandling<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json() as T;
            return data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    }

    protected get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        return this.fetchWithErrorHandling<T>(endpoint, {
            method: 'GET',
            ...options,
        });
    }

    protected post<T>(endpoint: string, body: unknown, options: RequestInit = {}): Promise<T> {
        return this.fetchWithErrorHandling<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
            ...options,
        });
    }

    // Add other methods (PUT, DELETE, etc.) as needed
}