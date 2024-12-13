package ai.yuvi.model;
public class CompanyUiArchetype {
    private long archetypeId;
    private long companyId;
    private String archetypeName;
    private String description;

    public long getArchetypeId() {
        return archetypeId;
    }
    public void setArchetypeId(long archetypeId) {
        this.archetypeId = archetypeId;
    }
    public long getCompanyId() {
        return companyId;
    }
    public void setCompanyId(long companyId) {
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