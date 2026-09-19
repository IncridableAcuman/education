export interface IUser {
    id: number;
    fullName: string;
    email: string;
    role: 'STUDENT' | 'TEACHER';
    specialty?: string | null;
}

export interface AuthResponse {
    accessToken: string;
    user: IUser;
}