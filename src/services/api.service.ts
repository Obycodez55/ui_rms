// API service for fetching student data

import axios, { type AxiosError } from 'axios';
import type { ApiResponse } from '../types/student.types';

// Use proxy endpoint for development, direct URL for production
const API_BASE_URL = import.meta.env.DEV 
    ? '/api/student.php'  // Proxy endpoint for development
    : 'https://uirms.ui.edu.ng/backend/student.php';  // Direct URL for production

/**
 * Fetch student data by matric number
 */
export const fetchStudentData = async (matricNo: string): Promise<ApiResponse> => {
    try {
        const response = await axios.get<ApiResponse>(API_BASE_URL, {
            params: {
                action: 'get_student_data_res',
                matricNo: matricNo,
            },
            timeout: 15000, // 15 second timeout
        });

        // Check if response status is success
        if (response.data.status !== 'success') {
            throw new Error('Failed to fetch student data');
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            if (axiosError.response) {
                // Server responded with error
                throw new Error(`Server error: ${axiosError.response.status}`);
            } else if (axiosError.request) {
                // Request made but no response
                throw new Error('Network error: Unable to reach server');
            } else {
                // Error setting up request
                throw new Error('Request error: ' + axiosError.message);
            }
        }

        // Generic error
        throw new Error('An unexpected error occurred');
    }
};

/**
 * Validate matric number format
 */
export const validateMatricNo = (matricNo: string): { isValid: boolean; error?: string } => {
    if (!matricNo || matricNo.trim() === '') {
        return { isValid: false, error: 'Matric number is required' };
    }

    // Remove whitespace
    const cleanedMatricNo = matricNo.trim();

    // Check if it's numeric (basic validation)
    if (!/^\d+$/.test(cleanedMatricNo)) {
        return { isValid: false, error: 'Matric number must contain only numbers' };
    }

    // Check length (adjust if needed)
    if (cleanedMatricNo.length < 4 || cleanedMatricNo.length > 10) {
        return { isValid: false, error: 'Matric number must be between 4 and 10 digits' };
    }

    return { isValid: true };
};