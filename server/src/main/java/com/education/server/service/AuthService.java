package com.education.server.service;

import com.education.server.dto.AuthDto;
import com.education.server.dto.EmailPayload;
import com.education.server.entity.UserEntity;
import com.education.server.entity.enums.Role;
import com.education.server.exception.CustomBadRequestException;
import com.education.server.exception.CustomNotFoundException;
import com.education.server.repository.UserRepository;
import com.education.server.util.CookieUtil;
import com.education.server.util.JwtUtil;
import com.education.server.util.MailUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
    private final TokenService tokenService;
    private final EmailTemplateService emailTemplateService;

    public AuthDto.AuthResponse authResponse(UserEntity user, HttpServletResponse response){
        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);
        tokenService.saveToken(user,refreshToken);
        cookieUtil.addCookie(refreshToken,response);
        return AuthDto.AuthResponse.from(accessToken);
    }
    public UserEntity findUserByEmail(String email){
        return userRepository.findByEmail(email).orElseThrow(()-> new CustomNotFoundException("User not found"));
    }
    public UserEntity extractAndValidateToken(String token){
        if (token == null || token.isEmpty()){
            throw new CustomBadRequestException("Token is null or empty");}
        if (!jwtUtil.validateToken(token)){
            throw new CustomBadRequestException("Invalid token");}
        String email = jwtUtil.extractSubject(token);
        return findUserByEmail(email);
    }
    public AuthDto.AuthResponse register(AuthDto.RegisterRequest request,HttpServletResponse response){
        if (userRepository.existsByEmail(request.getEmail())){
            throw new CustomBadRequestException("User already exist");}
        if (request.getRole() == Role.TEACHER && (request.getSpecialty() == null)){
            throw new CustomBadRequestException("Teacher must have a specialty");}
        if (request.getRole() == Role.STUDENT){
            request.setSpecialty(null);
        }
        UserEntity user = UserEntity
                .builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .specialty(request.getSpecialty())
                .build();
        userRepository.save(user);
        return authResponse(user,response);
    }
    public AuthDto.AuthResponse login(AuthDto.LoginRequest request,HttpServletResponse response){
        UserEntity user = findUserByEmail(request.getEmail());
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new CustomBadRequestException("Incorrect password");}
        return authResponse(user,response);
    }
    public void logout(String refreshToken,HttpServletResponse response){
        UserEntity user = extractAndValidateToken(refreshToken);
        tokenService.removeToken(user);
        cookieUtil.clearCookie(response);
    }
    public AuthDto.AuthResponse refresh(String refreshToken,HttpServletResponse response){
        UserEntity user = extractAndValidateToken(refreshToken);
        return authResponse(user,response);
    }
    public void forgotPassword(AuthDto.ForgotPasswordRequest request){
        UserEntity user = findUserByEmail(request.getEmail());
        String token = jwtUtil.generateAccessToken(user);
        String url = clientUrl + "/reset-password?token=" + token;
        Map<String,Object> variables = new HashMap<>();
        variables.put("email",user.getEmail());
        variables.put("resetUrl",url);
        String htmlContent = emailTemplateService.processTemplate("forgot-password.html",variables);
        EmailPayload payload = new EmailPayload(user.getEmail(),"Reset Password",htmlContent);
        mailUtil.sendMail(payload);
    }
    public void resetPassword(AuthDto.ResetPasswordRequest request){
        if (!request.getPassword().equals(request.getConfirmPassword())){
            throw new CustomBadRequestException("Password and confirm password should be equal");}
        UserEntity user = extractAndValidateToken(request.getToken());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
    }
}
