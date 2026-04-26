import { BASE_URL } from "@/constants/Config";

export const authApi = {
    register: (data: any) => 
        fetch(`${BASE_URL}/auth/v1/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }),
    
    verifyOtp: (email: string, otp: string) =>
        fetch(`${BASE_URL}/auth/v1/verify/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp }),
        }),

    login: (data: any) =>
        fetch(`${BASE_URL}/auth/v1/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }),
};