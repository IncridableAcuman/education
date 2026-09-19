import React, { createContext, useContext, useState, useEffect } from 'react';
import type { IUser } from '../interface/user';
import type { LoginInput, RegisterInput } from '../schema/auth';
import { authService } from '../services/authService';

interface AuthContextType {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (data: LoginInput) => Promise<void>;
    register: (data: RegisterInput) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const initAuth = () => {
            const savedUser = localStorage.getItem('user');
            const savedToken = localStorage.getItem('accessToken');

            if (savedUser && savedToken) {
                try {
                    setUser(JSON.parse(savedUser));
                    setToken(savedToken);
                } catch (error) {
                    console.error('LocalStorage parsing error:', error);
                    localStorage.removeItem('user');
                    localStorage.removeItem('accessToken');
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (data: LoginInput): Promise<void> => {
        setLoading(true);
        try {
            const res = await authService.login(data);
            setUser(res.user);
            setToken(res.accessToken);
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('accessToken', res.accessToken);
        } catch (error) {
            console.error('Login xatosi:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: RegisterInput): Promise<void> => {
        setLoading(true);
        try {
            const res = await authService.register(data);
            setUser(res.user);
            setToken(res.accessToken);
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('accessToken', res.accessToken);
        } catch (error) {
            console.error('Register xatosi:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout xatosi:', error);
        } finally {
            setUser(null);
            setToken(null);
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user && !!token,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth AuthProvider ichida ishlatilishi shart');
    }
    return context;
};