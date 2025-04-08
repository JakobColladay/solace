// src/services/api/advocates.ts
import { BaseApi } from './index';
import { Advocate, ApiResponse, AdvocatesResponse, AdvocateResponse } from './types';

export class AdvocatesApi extends BaseApi {
    constructor() {
        super('/api'); // Base URL for all API calls
    }

    async getAdvocates(): Promise<ApiResponse<Advocate[]>> {
        try {
            const response = await this.get<AdvocatesResponse>('/advocates');
            return {
                data: response.data,
                error: null
            };
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : 'Failed to fetch advocates'
            };
        }
    }

    async getAdvocateById(id: string | number): Promise<ApiResponse<Advocate>> {
        try {
            const response = await this.get<AdvocateResponse>(`/advocates/${id}`);
            return {
                data: response.data,
                error: null
            };
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : `Failed to fetch advocate with ID: ${id}`
            };
        }
    }
}

export const advocatesApi = new AdvocatesApi();