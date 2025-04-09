// src/services/api/advocates.ts
import { BaseApi } from './index';
import { Advocate, PaginationParams, PaginatedApiResponse, PaginatedResponse } from './types';

export class AdvocatesApi extends BaseApi {
    constructor() {
        super('/api'); // Base URL for all API calls
    }

    async getAdvocatesWithPagination(params: PaginationParams): Promise<PaginatedApiResponse<Advocate>> {
        try {
            // Construct URL with query parameters
            let url = `/advocates?page=${params.page}&limit=${params.limit}`;
            if (params.searchTerm) {
                url += `&search=${encodeURIComponent(params.searchTerm)}`;
            }

            const response = await this.get<PaginatedResponse<Advocate>>(url);

            return {
                data: {
                    data: response.data,
                    pagination: response.pagination
                },
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