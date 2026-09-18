export type Role = "STUDENT" | "TEACHER"

export interface IUser {
    fullName: string;
    email: string;
    password: string;
    role: Role;
    specialty: string;
}