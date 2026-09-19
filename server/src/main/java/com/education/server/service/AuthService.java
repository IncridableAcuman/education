package com.education.server.service;

import com.education.server.dto.AuthDto;
import com.education.server.dto.EmailPayload;
import com.education.server.entity.TokenEntity;
import com.education.server.entity.UserEntity;
import com.education.server.entity.enums.Role;
import com.education.server.exception.CustomBadRequestException;
import com.education.server.exception.CustomNotFoundException;
import com.education.server.repository.TokenRepository;
import com.education.server.repository.UserRepository;
import com.education.server.util.CookieUtil;
import com.education.server.util.JwtUtil;
import com.education.server.util.MailUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Value("${client.url}")
    private String clientUrl;

    private final PasswordEncoder passwordEncoder;
    private final CookieUtil cookieUtil;
    private final JwtUtil jwtUtil;
    private final MailUtil mailUtil;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final TokenService tokenService;
    private final EmailTemplateService emailTemplateService;

    public AuthDto.AuthResponse authResponse(UserEntity user, HttpServletResponse response) {
        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);
        tokenService.saveToken(user, refreshToken);
        cookieUtil.addCookie(refreshToken, response);
        return AuthDto.AuthResponse.of(accessToken, user);
    }

    public UserEntity findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomNotFoundException("User not found"));
    }

    public UserEntity extractAndValidateToken(String token) {
        if (token == null || token.isEmpty()) {
            throw new CustomBadRequestException("Token is null or empty");
        }
        if (!jwtUtil.validateToken(token)) {
            throw new CustomBadRequestException("Invalid or expired token");
        }
        String email = jwtUtil.extractSubject(token);
        return findUserByEmail(email);
    }

    @Transactional
    public AuthDto.AuthResponse register(AuthDto.RegisterRequest request, HttpServletResponse response) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new CustomBadRequestException("User with this email already exists");
        }

        // Teacher va Student uchun biznes-mantiq
        if (request.getRole() == Role.TEACHER && (request.getSpecialty() == null || request.getSpecialty().isBlank())) {
            throw new CustomBadRequestException("Teacher must provide a specialty");
        }
        if (request.getRole() == Role.STUDENT) {
            request.setSpecialty(null);
        }

        UserEntity user = UserEntity.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .specialty(request.getSpecialty())
                .build();

        userRepository.save(user);
        return authResponse(user, response);
    }

    public AuthDto.AuthResponse login(AuthDto.LoginRequest request, HttpServletResponse response) {
        UserEntity user = findUserByEmail(request.getEmail());
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new CustomBadRequestException("Incorrect email or password");
        }
        return authResponse(user, response);
    }

    @Transactional
    public void logout(String refreshToken, HttpServletResponse response) {
        if (refreshToken != null && !refreshToken.isEmpty() && jwtUtil.validateToken(refreshToken)) {
            try {
                String email = jwtUtil.extractSubject(refreshToken);
                userRepository.findByEmail(email).ifPresent(tokenService::removeToken);
            } catch (Exception ignored) {
                // Token yaroqsiz bo'lsa ham cookie o'chirilishi kerak
            }
        }
        cookieUtil.clearCookie(response);
    }

    public AuthDto.AuthResponse refresh(String refreshToken, HttpServletResponse response) {
        UserEntity user = extractAndValidateToken(refreshToken);

        // Bazadagi token bilan mosligini va mavjudligini tekshirish
        TokenEntity storedToken = tokenRepository.findByUser(user)
                .orElseThrow(() -> new CustomBadRequestException("Refresh token revoked or not found"));

        if (!storedToken.getRefreshToken().equals(refreshToken)) {
            throw new CustomBadRequestException("Invalid refresh token");
        }

        return authResponse(user, response);
    }

    public void forgotPassword(AuthDto.ForgotPasswordRequest request) {
        UserEntity user = findUserByEmail(request.getEmail());
        String token = jwtUtil.generateAccessToken(user);
        String url = clientUrl + "/reset-password?token=" + token;

        Map<String, Object> variables = new HashMap<>();
        variables.put("email", user.getEmail());
        variables.put("resetUrl", url);

        String htmlContent = emailTemplateService.processTemplate("forgot-password.html", variables);
        EmailPayload payload = new EmailPayload(user.getEmail(), "Reset Password", htmlContent);
        mailUtil.sendMail(payload);
    }

    @Transactional
    public void resetPassword(AuthDto.ResetPasswordRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new CustomBadRequestException("Passwords do not match");
        }
        UserEntity user = extractAndValidateToken(request.getToken());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
    }

    @Transactional
    public void updatePassword(UserEntity user, AuthDto.UpdatePasswordRequest request) {
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new CustomBadRequestException("Current password is incorrect");
        }
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new CustomBadRequestException("Passwords do not match");
        }
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
    }
}