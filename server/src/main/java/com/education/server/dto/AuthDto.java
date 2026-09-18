package com.education.server.dto;

import com.education.server.entity.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AuthDto {
    @Data
    public static class RegisterRequest {
        @NotBlank private String fullName;
        @NotBlank private String email;
        @NotBlank private String password;
        @NotNull private Role role;
        private String specialty;
    }
    @Data
    public static class LoginRequest {
        @NotBlank private String email;
        @NotBlank private String password;
    }
    @Data
    public static class ForgotPasswordRequest {
        @NotBlank private String email;
    }
    @Data
    public static class ResetPasswordRequest{
        @NotBlank private String token;
        @NotBlank private String password;
        @NotBlank private String confirmPassword;
    }
    @Data
    public static class UpdatePasswordRequest{
        @NotBlank private String currentPassword;
        @NotBlank private String password;
        @NotBlank private String confirmPassword;
    }
    public record AuthResponse(String accessToken){
        public static AuthResponse from(String accessToken){
            return new AuthResponse(accessToken);
        }
    }
}
