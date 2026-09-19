package com.education.server.dto;

import com.education.server.entity.UserEntity;
import com.education.server.entity.enums.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AuthDto {

    @Data
    public static class RegisterRequest {
        @NotBlank(message = "To'liq ism-sharifingizni kiriting")
        @Size(min = 3, max = 50, message = "Ism-sharifingiz 3 tadan 50 tagacha simvoldan iborat bo'lishi kerak")
        private String fullName;

        @NotBlank(message = "Email manzilingizni kiriting")
        @Email(message = "Noto'g'ri email formati kiritildi")
        @Size(max = 50, message = "Email 50 ta simvoldan oshmasligi kerak")
        private String email;

        @NotBlank(message = "Parolni kiriting")
        @Size(min = 6, max = 32, message = "Parol uzunligi 6 tadan 32 tagacha simvoldan iborat bo'lishi kerak")
        private String password;

        @NotNull(message = "Foydalanuvchi rolini tanlang")
        private Role role;

        @Size(max = 100, message = "Mutaxassislik 100 ta simvoldan oshmasligi kerak")
        private String specialty;
    }

    @Data
    public static class LoginRequest {
        @NotBlank(message = "Email manzilingizni kiriting")
        @Email(message = "Noto'g'ri email formati kiritildi")
        private String email;

        @NotBlank(message = "Parolni kiriting")
        private String password;
    }

    @Data
    public static class ForgotPasswordRequest {
        @NotBlank(message = "Email manzilingizni kiriting")
        @Email(message = "Noto'g'ri email formati kiritildi")
        private String email;
    }

    @Data
    public static class ResetPasswordRequest {
        @NotBlank(message = "Tiklash tokenini kiriting")
        private String token;

        @NotBlank(message = "Yangi parolni kiriting")
        @Size(min = 6, max = 32, message = "Parol uzunligi 6 tadan 32 tagacha simvoldan iborat bo'lishi kerak")
        private String password;

        @NotBlank(message = "Parolni tasdiqlash qismini kiriting")
        private String confirmPassword;
    }

    @Data
    public static class UpdatePasswordRequest {
        @NotBlank(message = "Joriy parolingizni kiriting")
        private String currentPassword;

        @NotBlank(message = "Yangi parolni kiriting")
        @Size(min = 6, max = 32, message = "Parol uzunligi 6 tadan 32 tagacha simvoldan iborat bo'lishi kerak")
        private String password;

        @NotBlank(message = "Parolni tasdiqlash qismini kiriting")
        private String confirmPassword;
    }

    public record AuthResponse(
            String accessToken,
            Long id,
            String fullName,
            String email,
            Role role,
            String specialty
    ) {
        public static AuthResponse of(String accessToken, UserEntity user) {
            return new AuthResponse(
                    accessToken,
                    user.getId(),
                    user.getFullName(),
                    user.getEmail(),
                    user.getRole(),
                    user.getSpecialty()
            );
        }
    }
}
