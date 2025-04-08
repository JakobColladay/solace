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

export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
}


export interface AdvocatesResponse {
    data: Advocate[];
}

export interface AdvocateResponse {
    data: Advocate;
}