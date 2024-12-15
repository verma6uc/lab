package ai.yuvi.modules.user.service;

import ai.yuvi.modules.user.model.User;
import ai.yuvi.modules.user.model.UserSession;
import ai.yuvi.modules.user.dao.UserDao;
import ai.yuvi.modules.user.dao.UserSessionDao;
import ai.yuvi.modules.user.enums.UserRole;
import ai.yuvi.modules.user.enums.UserStatus;
import ai.yuvi.modules.user.util.JwtUtil;
import ai.yuvi.modules.user.exception.AuthenticationException;

import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;

import org.mindrot.jbcrypt.BCrypt;

public class AuthenticationService {
    private static final Logger LOGGER = Logger.getLogger(AuthenticationService.class.getName());
    
    private final UserDao userDao;
    private final UserSessionDao sessionDao;
    private final JwtUtil jwtUtil;

    public AuthenticationService(UserDao userDao, UserSessionDao sessionDao, JwtUtil jwtUtil) {
        this.userDao = userDao;
        this.sessionDao = sessionDao;
        this.jwtUtil = jwtUtil;
    }

    public User authenticate(String email, String password, HttpServletRequest request) 
            throws AuthenticationException {
        try {
            Optional<User> userOpt = userDao.findByEmail(email);
            if (!userOpt.isPresent()) {
                throw new AuthenticationException("Invalid email or password");
            }

            User user = userOpt.get();
            if (!BCrypt.checkpw(password, user.getPassword())) {
                throw new AuthenticationException("Invalid email or password");
            }

            if (user.getStatus() != UserStatus.ACTIVE) {
                throw new AuthenticationException("Account is not active");
            }

            // Create user session
            UserSession session = createSession(user, request);
            sessionDao.create(session);

            // Update last login
            user.setLastLoginAt(ZonedDateTime.now());
            userDao.update(user);

            return user;
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Authentication error", e);
            throw new AuthenticationException("Authentication failed");
        }
    }

    public User register(String email, String password, String firstName, String lastName,
                        HttpServletRequest request) throws AuthenticationException {
        try {
            // Check if user already exists
            if (userDao.findByEmail(email).isPresent()) {
                throw new AuthenticationException("Email already registered");
            }

            // Create new user
            User user = new User();
            user.setUserId(generateUserId());
            user.setEmail(email);
            user.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setRole(UserRole.USER);
            user.setStatus(UserStatus.ACTIVE);
            user.setCreatedAt(ZonedDateTime.now());

            if (!userDao.create(user)) {
                throw new AuthenticationException("Failed to create user");
            }

            // Create initial session
            UserSession session = createSession(user, request);
            sessionDao.create(session);

            return user;
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Registration error", e);
            throw new AuthenticationException("Registration failed");
        }
    }

    public void logout(Long userId, String sessionId) {
        try {
            sessionDao.invalidateSession(userId, UUID.fromString(sessionId));
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Logout error", e);
        }
    }

    public String generateToken(User user) {
        return jwtUtil.generateToken(user);
    }

    public Optional<User> validateToken(String token) {
        try {
            Optional<Long> userIdOpt = jwtUtil.validateToken(token);
            return userIdOpt.flatMap(userId -> userDao.findById(userId));
        } catch (Exception e) {
            LOGGER.log(Level.WARNING, "Token validation failed", e);
            return Optional.empty();
        }
    }

    private UserSession createSession(User user, HttpServletRequest request) {
        UserSession session = new UserSession();
        session.setSessionId(UUID.randomUUID());
        session.setUserId(user.getId());
        session.setIpAddress(request.getRemoteAddr());
        session.setUserAgent(request.getHeader("User-Agent"));
        session.setAuthenticated(true);
        session.setSecureConnection(request.isSecure());
        session.setLastActivityAt(ZonedDateTime.now());
        session.setExpiresAt(ZonedDateTime.now().plusHours(24));
        session.setCreatedAt(ZonedDateTime.now());
        return session;
    }

    private Long generateUserId() {
        // Simple implementation - in practice, use a more robust ID generation strategy
        return System.currentTimeMillis();
    }
}
