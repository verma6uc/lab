package ai.yuvi.service;

import ai.yuvi.dao.UserDao;
import ai.yuvi.exception.AuthenticationException;
import ai.yuvi.model.User;
import ai.yuvi.model.UserRole;
import ai.yuvi.model.UserStatus;
import ai.yuvi.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.ZonedDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthenticationServiceTest {

    @Mock
    private UserDao userDao;

    @Mock
    private JwtUtil jwtUtil;

    private AuthenticationService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        authService = new AuthenticationService(userDao, jwtUtil);
    }

    @Test
    void authenticate_ValidCredentials_ReturnsToken() throws AuthenticationException {
        // Arrange
        String email = "test@example.com";
        String password = "password123";
        String expectedToken = "jwt.token.here";

        User mockUser = new User();
        mockUser.setEmail(email);
        mockUser.setPassword("$2a$10$abcdefghijklmnopqrstuvwxyz"); // BCrypt hash
        mockUser.setStatus(UserStatus.ACTIVE);

        when(userDao.findByEmail(email)).thenReturn(Optional.of(mockUser));
        when(jwtUtil.generateToken(mockUser)).thenReturn(expectedToken);

        // Act
        String actualToken = authService.authenticate(email, password);

        // Assert
        assertEquals(expectedToken, actualToken);
        verify(userDao).update(mockUser); // Verify last active is updated
    }

    @Test
    void authenticate_InvalidEmail_ThrowsException() {
        // Arrange
        String email = "nonexistent@example.com";
        String password = "password123";

        when(userDao.findByEmail(email)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(AuthenticationException.class, () -> 
            authService.authenticate(email, password)
        );
    }

    @Test
    void authenticate_InactiveUser_ThrowsException() {
        // Arrange
        String email = "inactive@example.com";
        String password = "password123";

        User mockUser = new User();
        mockUser.setEmail(email);
        mockUser.setPassword("$2a$10$abcdefghijklmnopqrstuvwxyz");
        mockUser.setStatus(UserStatus.INACTIVE);

        when(userDao.findByEmail(email)).thenReturn(Optional.of(mockUser));

        // Act & Assert
        assertThrows(AuthenticationException.class, () -> 
            authService.authenticate(email, password)
        );
    }

    @Test
    void register_NewUser_Success() throws AuthenticationException {
        // Arrange
        String email = "new@example.com";
        String password = "password123";
        String name = "New User";

        when(userDao.findByEmail(email)).thenReturn(Optional.empty());
        when(userDao.create(any(User.class))).thenReturn(1L);

        // Act
        User createdUser = authService.register(email, password, name);

        // Assert
        assertNotNull(createdUser);
        assertEquals(email, createdUser.getEmail());
        assertEquals(name, createdUser.getName());
        assertEquals(UserRole.USER, createdUser.getRole());
        assertEquals(UserStatus.PENDING, createdUser.getStatus());
        verify(userDao).create(any(User.class));
    }

    @Test
    void register_ExistingEmail_ThrowsException() {
        // Arrange
        String email = "existing@example.com";
        String password = "password123";
        String name = "Existing User";

        when(userDao.findByEmail(email)).thenReturn(Optional.of(new User()));

        // Act & Assert
        assertThrows(AuthenticationException.class, () -> 
            authService.register(email, password, name)
        );
    }

    @Test
    void changePassword_ValidOldPassword_Success() throws AuthenticationException {
        // Arrange
        Long userId = 1L;
        String oldPassword = "oldPassword123";
        String newPassword = "newPassword123";

        User mockUser = new User();
        mockUser.setUserId(userId);
        mockUser.setPassword("$2a$10$abcdefghijklmnopqrstuvwxyz"); // BCrypt hash for oldPassword123

        when(userDao.findById(userId)).thenReturn(Optional.of(mockUser));
        when(userDao.update(any(User.class))).thenReturn(true);

        // Act
        authService.changePassword(userId, oldPassword, newPassword);

        // Assert
        verify(userDao).update(mockUser);
        assertNotEquals(oldPassword, mockUser.getPassword());
    }

    @Test
    void changePassword_InvalidOldPassword_ThrowsException() {
        // Arrange
        Long userId = 1L;
        String oldPassword = "wrongPassword";
        String newPassword = "newPassword123";

        User mockUser = new User();
        mockUser.setUserId(userId);
        mockUser.setPassword("$2a$10$abcdefghijklmnopqrstuvwxyz"); // BCrypt hash for different password

        when(userDao.findById(userId)).thenReturn(Optional.of(mockUser));

        // Act & Assert
        assertThrows(AuthenticationException.class, () -> 
            authService.changePassword(userId, oldPassword, newPassword)
        );
    }
} 