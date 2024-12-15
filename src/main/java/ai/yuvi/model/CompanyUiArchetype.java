package ai.yuvi.model;

public class CompanyUiArchetype {
    private Long id; // Changed from archetypeId to match database column
    private Long companyId;
    private String archetypeName;
    private String description;

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getCompanyId() {
        return companyId;
    }
    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getArchetypeName() {
        return archetypeName;
    }
    public void setArchetypeName(String archetypeName) {
        this.archetypeName = archetypeName;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}
