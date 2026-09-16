package com.education.server.service;

import com.education.server.entity.TokenEntity;
import com.education.server.entity.UserEntity;
import com.education.server.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;

    public void saveToken(UserEntity user, String refreshToken){
        TokenEntity token = tokenRepository.findByUser(user).orElse(new TokenEntity());
        token.setUser(user);
        token.setRefreshToken(refreshToken);
        token.setExpiration(LocalDateTime.now().plusDays(7));
        tokenRepository.save(token);
    }
    public void removeToken(UserEntity user){
        TokenEntity token = tokenRepository.findByUser(user).orElseThrow();
        tokenRepository.delete(token);
    }
}