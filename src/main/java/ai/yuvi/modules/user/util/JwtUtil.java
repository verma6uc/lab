package ai.yuvi.modules.user.util;

import ai.yuvi.modules.user.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.logging.Level;

public class JwtUtil {
    private static final Logger LOGGER = Logger.getLogger(JwtUtil.class.getName());
    
    private final Key key;
    private final long expirationMs;

    public JwtUtil(String secret, long expirationMs) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.expirationMs = expirationMs;
    }

    public String generateToken(User user) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
            .setSubject(user.getId().toString())
            .claim("userId", user.getUserId())
            .claim("email", user.getEmail())
            .claim("role", user.getRole().name())
            .setIssuedAt(now)
            .setExpiration(expiration)
            .signWith(key, SignatureAlgorithm.HS512)
            .compact();
    }

    public Optional<Long> validateToken(String token) {
        try {
            Claims claims = (Claims) Jwts.parser()
                .setSigningKey(key)
                .parse(token)
                .getBody();

            // Check if token is expired
            if (claims.getExpiration().before(new Date())) {
                return Optional.empty();
            }

            // Extract and return user ID
            String userIdStr = claims.getSubject();
            return Optional.of(Long.parseLong(userIdStr));
        } catch (JwtException | IllegalArgumentException e) {
            LOGGER.log(Level.WARNING, "Invalid JWT token: " + e.getMessage());
            return Optional.empty();
        }
    }

    public boolean isTokenExpired(String token) {
        try {
            Claims claims = (Claims) Jwts.parser()
                .setSigningKey(key)
                .parse(token)
                .getBody();

            return claims.getExpiration().before(new Date());
        } catch (JwtException e) {
            LOGGER.log(Level.WARNING, "Error checking token expiration: " + e.getMessage());
            return true;
        }
    }

    public Optional<Claims> getTokenClaims(String token) {
        try {
            Claims claims = (Claims) Jwts.parser()
                .setSigningKey(key)
                .parse(token)
                .getBody();

            return Optional.of(claims);
        } catch (JwtException e) {
            LOGGER.log(Level.WARNING, "Error extracting claims from token: " + e.getMessage());
            return Optional.empty();
        }
    }

    public Optional<String> refreshToken(String token) {
        try {
            Claims claims = (Claims) Jwts.parser()
                .setSigningKey(key)
                .parse(token)
                .getBody();

            // Generate new token with updated expiration
            Date now = new Date();
            Date expiration = new Date(now.getTime() + expirationMs);

            return Optional.of(Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact());
        } catch (JwtException e) {
            LOGGER.log(Level.WARNING, "Error refreshing token: " + e.getMessage());
            return Optional.empty();
        }
    }
}
