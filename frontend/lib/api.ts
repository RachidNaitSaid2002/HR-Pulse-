const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `API request failed: ${response.statusText}`);
    }

    return response.json();
}

export const authApi = {
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
    signup: async (data: any) => {
        return apiFetch("/auth/signup", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },
};

export const predictApi = {
    getPrediction: async (data: any, token: string) => {
        return apiFetch("/predict/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
    },
};

export const jobsApi = {
    getJobs: async (token: string, skip: number = 0, limit: number = 20) => {
        return apiFetch(`/jobs/?skip=${skip}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};
