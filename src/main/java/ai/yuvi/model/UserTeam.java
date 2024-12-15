package ai.yuvi.model;

public class UserTeam {
    private Long userId;
    private Long teamId;

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTeamId() {
        return teamId;
    }
    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    // Since this is a composite key table, override equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserTeam userTeam = (UserTeam) o;
        return userId.equals(userTeam.userId) && teamId.equals(userTeam.teamId);
    }

    @Override
    public int hashCode() {
        return java.util.Objects.hash(userId, teamId);
    }
}
