import React, { createContext, useContext, useState, useEffect } from 'react';

// Foydalanuvchi rollari
export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

// Foydalanuvchi ma'lumotlari interfeysi
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  subject?: string; // O'qituvchi bo'lsa fani
  avatar?: string;
}

// Kirish (Login) uchun ma'lumotlar
export interface LoginPayload {
  email: string;
  password: string;
  role?: UserRole;
}

// Ro'yxatdan o'tish (Register) uchun ma'lumotlar
export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  subject?: string;
}

// AuthContext interfeysi
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(true);

  // Sahifa yuklanganda localStoragedan foydalanuvchi ma'lumotlarini tiklash
  useEffect(() => {
    const initAuth = () => {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');

      if (savedUser && savedToken) {
        try {
          setUser(JSON.parse(savedUser));
          setToken(savedToken);
        } catch (error) {
          console.error('LocalStorage auth parsing error:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Tizimga kirish (Login)
  const login = async (data: LoginPayload): Promise<void> => {
    setLoading(true);
    try {
      // Backend API mavjud bo'lsa axios/fetch chaqiruvidan foydalanasiz:
      // const response = await axios.post('/api/auth/login', data);
      // const { user: userData, token: jwtToken } = response.data;

      // Mock javob (Backend ulaguningizcha sinash uchun):
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockUser: User = {
        id: Date.now().toString(),
        fullName: data.email.split('@')[0],
        email: data.email,
        role: data.role || 'STUDENT',
      };
      const mockToken = 'mock-jwt-token-xyz-123';

      // State va LocalStorage-ni yangilash
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Ro'yxatdan o'tish (Register)
  const register = async (data: RegisterPayload): Promise<void> => {
    setLoading(true);
    try {
      // Backend API:
      // const response = await axios.post('/api/auth/register', data);
      // const { user: userData, token: jwtToken } = response.data;

      // Mock javob:
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser: User = {
        id: Date.now().toString(),
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        subject: data.subject,
      };
      const mockToken = 'mock-jwt-token-new-user-456';

      setUser(newUser);
      setToken(mockToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', mockToken);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Tizimdan chiqish (Logout)
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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

// Custom Hook (useAuth va UseAuth har ikkala holatda ishlashi uchun)
export const UseAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

