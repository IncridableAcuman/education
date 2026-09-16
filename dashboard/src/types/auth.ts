export type UserRole = 'student' | 'teacher';

export interface LoginFormData {
  role: UserRole;
  emailOrId: string; // Email yoki ID raqami
  password: string;
}

export interface RegisterFormData {
  role: UserRole;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  // Student uchun maxsus maydonlar
  studentId?: string;
  groupOrCourse?: string;
  // Teacher uchun maxsus maydonlar
  subject?: string;
  department?: string;
}