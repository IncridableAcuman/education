package com.education.server.service;


import com.blog.backend.domain.token.entity.TokenEntity;
import com.blog.backend.domain.token.repository.TokenRepository;
import com.blog.backend.domain.user.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;

    public void saveToken(UserEntity user,String refreshToken){
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