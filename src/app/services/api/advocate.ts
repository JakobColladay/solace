// src/services/api/advocates.ts
import { BaseApi } from './index';
import { Advocate, ApiResponse, AdvocatesResponse } from './types';

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
}

export const advocatesApi = new AdvocatesApi();