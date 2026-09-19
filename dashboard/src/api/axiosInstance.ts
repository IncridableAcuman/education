import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    withCredentials: true, // Refresh-token cookie kelishi uchun shart
    baseURL: "http://localhost:8080/api/v1"
});

// Request interceptor: Access Token-ni sarlavhaga qo'shish
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response interceptor: 401/403 xatolikda tokenni avtomatik yangilash (Refresh)
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403) &&
            originalRequest &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const { data } = await axiosInstance.get<{ accessToken: string }>("/auth/refresh");
                localStorage.setItem("accessToken", data.accessToken);
                
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                }
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;