import { z } from 'zod';

// --- RO'YXATDAN O'TISH (REGISTER) ---
export const registerSchema = z.object({
    fullName: z
        .string()
        .min(1, { message: "To'liq ism-sharifingizni kiriting" })
        .min(3, { message: "Ism-sharifingiz kamida 3 ta simvoldan iborat bo'lishi kerak" })
        .max(50, { message: "Ism-sharifingiz 50 ta simvoldan oshmasligi kerak" }),
    email: z
        .string()
        .min(1, { message: "Email manzilingizni kiriting" })
        .email({ message: "Noto'g'ri email formati kiritildi" })
        .max(50, { message: "Email 50 ta simvoldan oshmasligi kerak" }),
    password: z
        .string()
        .min(1, { message: "Parol kiriting" })
        .min(6, { message: "Parol uzunligi kamida 6 ta simvol bo'lishi kerak" })
        .max(32, { message: "Parol 32 ta simvoldan oshmasligi kerak" }),
    role: z.enum(["STUDENT", "TEACHER"], {
        message: "Foydalanuvchi rolini tanlang (STUDENT yoki TEACHER)"
    }),
    specialty: z
        .string()
        .max(100, { message: "Mutaxassislik 100 ta simvoldan oshmasligi kerak" })
        .optional()
});

// --- TIZIMGA KIRISH (LOGIN) ---
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email manzilingizni kiriting" })
        .email({ message: "Noto'g'ri email formati kiritildi" }),
    password: z
        .string()
        .min(1, { message: "Parolni kiriting" })
});

// --- PAROLNI UNUTISH (FORGOT PASSWORD) ---
export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email manzilingizni kiriting" })
        .email({ message: "Noto'g'ri email formati kiritildi" })
});

// --- PAROLNI TIKLASH (RESET PASSWORD) ---
export const resetPasswordSchema = z.object({
    token: z.string().min(1, { message: "Tiklash tokeni majburiy" }),
    password: z
        .string()
        .min(1, { message: "Yangi parolni kiriting" })
        .min(6, { message: "Parol kamida 6 ta simvol bo'lishi kerak" })
        .max(32, { message: "Parol 32 ta simvoldan oshmasligi kerak" }),
    confirmPassword: z
        .string()
        .min(1, { message: "Parolni tasdiqlash qismini kiriting" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Parollar bir-biriga mos kelmadi",
    path: ["confirmPassword"], // Xatolik aynan tasdiqlash inputida ko'rinadi
});

// --- PAROLNI YANGILASH (UPDATE PASSWORD) ---
export const updatePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(1, { message: "Joriy parolingizni kiriting" }),
    password: z
        .string()
        .min(1, { message: "Yangi parolni kiriting" })
        .min(6, { message: "Parol kamida 6 ta simvol bo'lishi kerak" })
        .max(32, { message: "Parol 32 ta simvoldan oshmasligi kerak" }),
    confirmPassword: z
        .string()
        .min(1, { message: "Parolni tasdiqlash qismini kiriting" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Yangi parollar bir-biriga mos kelmadi",
    path: ["confirmPassword"],
});

// TypeScript Tiplari (Ixtiyoriy, form kutubxonalari uchun qulay)
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
