import axiosInstance from '../api/axiosInstance';
import type { AuthResponse } from '../interface/user';
import type { 
    LoginInput, 
    RegisterInput, 
    ForgotPasswordInput, 
    ResetPasswordInput, 
    UpdatePasswordInput 
} from '../schema/auth';

export const authService = {
    register: async (data: RegisterInput): Promise<AuthResponse> => {
        const res = await axiosInstance.post<AuthResponse>('/auth/register', data);
        return res.data;
    },

    login: async (data: LoginInput): Promise<AuthResponse> => {
        const res = await axiosInstance.post<AuthResponse>('/auth/login', data);
        return res.data;
    },

    logout: async (): Promise<void> => {
        await axiosInstance.post('/auth/logout');
    },

    forgotPassword: async (data: ForgotPasswordInput): Promise<string> => {
        const res = await axiosInstance.post<string>('/auth/forgot-password', data);
        return res.data;
    },

    resetPassword: async (data: ResetPasswordInput): Promise<string> => {
        const res = await axiosInstance.put<string>('/auth/reset-password', data);
        return res.data;
    },

    updatePassword: async (data: UpdatePasswordInput): Promise<string> => {
        const res = await axiosInstance.put<string>('/auth/update-password', data);
        return res.data;
    }
};