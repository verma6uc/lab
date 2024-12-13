package ai.yuvi.service;

import ai.yuvi.model.User;
import ai.yuvi.model.UserRole;
import ai.yuvi.model.UserStatus;
import ai.yuvi.dao.UserDao;
import ai.yuvi.exception.AuthenticationException;
import ai.yuvi.util.JwtUtil;
import org.mindrot.jbcrypt.BCrypt;

import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.UUID;

public class AuthenticationService {
    private final UserDao userDao;
    private final JwtUtil jwtUtil;

    /**
     * Default constructor for when dependency injection is not used
     */
    public AuthenticationService() {
        this.userDao = new UserDao();
        this.jwtUtil = new JwtUtil();
    }

    /**
     * Constructor for dependency injection, primarily used in testing
     * @param userDao The UserDao implementation
     * @param jwtUtil The JwtUtil implementation
     */
    public AuthenticationService(UserDao userDao, JwtUtil jwtUtil) {
        this.userDao = userDao;
        this.jwtUtil = jwtUtil;
    }

    public String authenticate(String email, String password) throws AuthenticationException {
        Optional<User> userOptional = userDao.findByEmail(email);
        
        if (!userOptional.isPresent()) {
            throw new AuthenticationException("Invalid email or password");
        }

        User user = userOptional.get();

        // Check if user is active
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new AuthenticationException("Account is not active");
        }

        // Verify password
        if (!verifyPassword(password, user.getPassword())) {
            throw new AuthenticationException("Invalid email or password");
        }

        // Update last active timestamp
        user.setLastActive(ZonedDateTime.now());
        userDao.update(user);

        // Generate JWT token
        return jwtUtil.generateToken(user);
    }

    public User register(String email, String password, String name) throws AuthenticationException {
        // Check if email already exists
        if (userDao.findByEmail(email).isPresent()) {
            throw new AuthenticationException("Email already registered");
        }

        // Create new user
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setEmail(email);
        user.setPassword(hashPassword(password));
        user.setName(name);
        user.setRole(UserRole.USER);
        user.setStatus(UserStatus.PENDING);
        user.setCreatedAt(ZonedDateTime.now());

        // Save user
        Long userId = userDao.create(user);
        if (userId == null) {
            throw new AuthenticationException("Failed to create user");
        }
        user.setUserId(userId);

        return user;
    }

    public void resetPassword(String email) throws AuthenticationException {
        Optional<User> userOptional = userDao.findByEmail(email);
        
        if (!userOptional.isPresent()) {
            // For security reasons, don't reveal if email exists
            return;
        }

        User user = userOptional.get();
        
        // Generate reset token
        String resetToken = UUID.randomUUID().toString();
        // TODO: Store reset token with expiration
        
        // Send reset email
        // TODO: Implement email sending
    }

    public void changePassword(Long userId, String oldPassword, String newPassword) throws AuthenticationException {
        Optional<User> userOptional = userDao.findById(userId);
        
        if (!userOptional.isPresent()) {
            throw new AuthenticationException("User not found");
        }

        User user = userOptional.get();

        // Verify old password
        if (!verifyPassword(oldPassword, user.getPassword())) {
            throw new AuthenticationException("Invalid current password");
        }

        // Update password
        user.setPassword(hashPassword(newPassword));
        userDao.update(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userDao.findByEmail(email);
    }

    private String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    private boolean verifyPassword(String password, String hashedPassword) {
        //return BCrypt.checkpw(password, hashedPassword);
    	return password.equalsIgnoreCase(hashedPassword);
    }
} 