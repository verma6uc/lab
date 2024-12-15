package ai.yuvi.model;

import java.time.ZonedDateTime;

public class UserSpace {
    private Long userId;
    private Long spaceId;
    private String role;
    private ZonedDateTime joinedAt;

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getSpaceId() {
        return spaceId;
    }
    public void setSpaceId(Long spaceId) {
        this.spaceId = spaceId;
    }

    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    public ZonedDateTime getJoinedAt() {
        return joinedAt;
    }
    public void setJoinedAt(ZonedDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }

    // Since this is a composite key table, override equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserSpace userSpace = (UserSpace) o;
        return userId.equals(userSpace.userId) && spaceId.equals(userSpace.spaceId);
    }

    @Override
    public int hashCode() {
        return java.util.Objects.hash(userId, spaceId);
    }
}
