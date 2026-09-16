package com.education.server.util;


import com.education.server.entity.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.access_time}")
    private long accessTime;
    @Value("${jwt.refresh_time}")
    private long refreshTime;
    private Key secretKry;

    @PostConstruct
    public void init(){
        this.secretKry = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    private String generateToken(UserEntity user, long tokenExpiration){
        Map<String, Object> claims = new HashMap<>();
        claims.put("id",user.getId());
        claims.put("role",user.getRole());

        long systemCurrentMillis = System.currentTimeMillis();
        Date issueAt = new Date(systemCurrentMillis);
        Date expiration = new Date(systemCurrentMillis + tokenExpiration);

        return Jwts
                .builder()
                .setSubject(user.getEmail())
                .addClaims(claims)
                .signWith(secretKry)
                .setIssuedAt(issueAt)
                .setExpiration(expiration)
                .compact();
    }
    public String generateAccessToken(UserEntity user){
        return generateToken(user,accessTime);
    }
    public String generateRefreshToken(UserEntity user){
        return generateToken(user,refreshTime);
    }
    private Claims extractClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(secretKry)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public String extractSubject(String token){
        return extractClaims(token).getSubject();
    }
    public Date extractExpiration(String token){
        return extractClaims(token).getExpiration();
    }
    public boolean validateToken(String token){
        try {
            return extractExpiration(token).after(new Date()) && extractSubject(token) != null;
        } catch (Exception e) {
            return false;
        }
    }
}
