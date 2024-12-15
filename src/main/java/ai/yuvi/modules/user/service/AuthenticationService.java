package ai.yuvi.modules.user.service;

import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.mindrot.jbcrypt.BCrypt;

import ai.yuvi.exception.AuthenticationException;
import ai.yuvi.modules.user.dao.UserDao;
import ai.yuvi.modules.user.enums.UserStatus;
import ai.yuvi.modules.user.model.User;
import ai.yuvi.modules.user.util.JwtUtil;

public class AuthenticationService {
    private static final Logger LOGGER = Logger.getLogger(AuthenticationService.class.getName());
    private final UserDao userDao;
    private final JwtUtil jwtUtil;

    public AuthenticationService(UserDao userDao, JwtUtil jwtUtil) {
        this.userDao = userDao;
        this.jwtUtil = jwtUtil;
    }

    public String authenticate(String email, String password) throws AuthenticationException {
        try {
            Optional<User> userOpt = userDao.findByEmail(email);
            if (!userOpt.isPresent()) {
                throw new AuthenticationException("Invalid email or password");
            }

            User user = userOpt.get();
            if (user.getStatus() != UserStatus.ACTIVE) {
                throw new AuthenticationException("Account is not active");
            }

            if (!BCrypt.checkpw(password, user.getPassword())) {
                throw new AuthenticationException("Invalid email or password");
            }

            return jwtUtil.generateToken(user);
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Authentication error", e);
            throw new AuthenticationException("Authentication failed");
        }
    }

    public Optional<User> validateToken(String token) {
        try {
            String email = jwtUtil.validateTokenAndGetEmail(token);
            return userDao.findByEmail(email);
        } catch (Exception e) {
            LOGGER.log(Level.WARNING, "Token validation failed", e);
            return Optional.empty();
        }
    }

    public String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }

    public boolean verifyPassword(String plainPassword, String hashedPassword) {
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }
}
