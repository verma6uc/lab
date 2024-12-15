package ai.yuvi.model;

import java.time.ZonedDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;

public class User {
    private Long id; // Changed from userId to match database id column
    private String externalId; // Changed from id to better represent the unique string identifier
    private Long companyId;
    private String name;
    private String email;
    @JsonIgnore
    private String password;
    private UserRole role;
    private UserStatus status;
    private ZonedDateTime lastActive;
    private String avatar;
    private ZonedDateTime createdAt;
    private String department;
    private String phone;
    private String location;
    private String bio; // Added missing bio field
    private List<String> skills;
    private JsonNode preferences;
    private JsonNode socialLinks;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getExternalId() { return externalId; }
    public void setExternalId(String externalId) { this.externalId = externalId; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    @JsonIgnore
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }

    public UserStatus getStatus() { return status; }
    public void setStatus(UserStatus status) { this.status = status; }

    public ZonedDateTime getLastActive() { return lastActive; }
    public void setLastActive(ZonedDateTime lastActive) { this.lastActive = lastActive; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public JsonNode getPreferences() { return preferences; }
    public void setPreferences(JsonNode preferences) { this.preferences = preferences; }

    public JsonNode getSocialLinks() { return socialLinks; }
    public void setSocialLinks(JsonNode socialLinks) { this.socialLinks = socialLinks; }
}
