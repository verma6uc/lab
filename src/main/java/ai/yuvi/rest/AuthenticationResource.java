package ai.yuvi.rest;

import ai.yuvi.model.User;
import ai.yuvi.service.AuthenticationService;
import ai.yuvi.exception.AuthenticationException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthenticationResource {
    private final AuthenticationService authService;

    public AuthenticationResource() {
        this.authService = new AuthenticationService();
    }

    @POST
    @Path("/login")
    public Response login(LoginRequest loginRequest) {
        try {
            String token = authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
            User user = authService.getUserByEmail(loginRequest.getEmail()).orElseThrow();
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", new UserResponse(user));
            
            return Response.ok(response).build();
        } catch (AuthenticationException e) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    @POST
    @Path("/register")
    public Response register(RegisterRequest registerRequest) {
        try {
            User user = authService.register(
                registerRequest.getEmail(),
                registerRequest.getPassword(),
                registerRequest.getName()
            );
            
            return Response.status(Response.Status.CREATED)
                    .entity(new UserResponse(user))
                    .build();
        } catch (AuthenticationException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    @POST
    @Path("/reset-password")
    public Response resetPassword(ResetPasswordRequest request) {
        try {
            authService.resetPassword(request.getEmail());
            return Response.ok().build();
        } catch (AuthenticationException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    @POST
    @Path("/change-password")
    public Response changePassword(ChangePasswordRequest request) {
        try {
            authService.changePassword(
                request.getUserId(),
                request.getOldPassword(),
                request.getNewPassword()
            );
            return Response.ok().build();
        } catch (AuthenticationException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    // Request/Response classes
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String email;
        private String password;
        private String name;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    public static class ResetPasswordRequest {
        private String email;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    public static class ChangePasswordRequest {
        private Long userId;
        private String oldPassword;
        private String newPassword;

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getOldPassword() { return oldPassword; }
        public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }

    public static class UserResponse {
        private final String id;
        private final String email;
        private final String name;

        public UserResponse(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.name = user.getName();
        }

        public String getId() { return id; }
        public String getEmail() { return email; }
        public String getName() { return name; }
    }

    public static class ErrorResponse {
        private final String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() { return message; }
    }
} 