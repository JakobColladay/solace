// src/services/api/types.ts
export interface Advocate {
    id?: string | number;
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: string[];
    yearsOfExperience: number;
    phoneNumber: string;
}


export interface PaginationParams {
    page: number;
    limit: number;
    searchTerm?: string;
}

export interface PaginatedResponse<T> {
    data: Advocate[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

export interface PaginatedApiResponse<T> {
    data: PaginatedResponse<T> | null;
    error: string | null;
}