/**
 * This file contains all the functions to talk to our Backend API.
 * Think of it as the "phone" the frontend uses to call the backend.
 */

// The base address of our server.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

/**
 * A helper function to make 'fetch' calls easier.
 * It automatically adds headers and handles errors.
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    // We 'await' the fetch so the code waits for the server to answer.
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json", // We tell the server we are sending JSON data.
            ...options.headers,
        },
    });

    // If the server returns an error (400, 401, 500, etc.)
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `API request failed: ${response.statusText}`);
    }

    // If everything is OK, we turn the answer into a JavaScript object.
    return response.json();
}

/**
 * Functions related to User accounts (Login and Register).
 */
export const authApi = {
    // Sign-in is a bit special because it uses Form Data (URLSearchParams)
    signin: async (formData: URLSearchParams) => {
        const url = `${API_BASE_URL}/auth/signin`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Invalid email or password");
        }

        return response.json();
    },
    // Signup uses standard JSON.
    signup: async (data: any) => {
        return apiFetch("/auth/signup", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },
};

/**
 * Functions for predicting salaries using our Machine Learning model.
 */
export const predictApi = {
    getPrediction: async (data: any, token: string) => {
        return apiFetch("/predict/", {
            method: "POST",
            headers: {
                // We send the 'token' to prove we are logged in.
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
    },
};

/**
 * Functions for browsing the job database.
 */
export const jobsApi = {
    getJobs: async (token: string, skip: number = 0, limit: number = 20) => {
        return apiFetch(`/jobs/?skip=${skip}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};
