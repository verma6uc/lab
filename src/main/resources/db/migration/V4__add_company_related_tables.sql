-- Update company table with new fields
ALTER TABLE company
ADD COLUMN type VARCHAR(50),
ADD COLUMN website VARCHAR(255),
ADD COLUMN linkedin_url VARCHAR(255),
ADD COLUMN twitter_url VARCHAR(255),
ADD COLUMN github_url VARCHAR(255),
ADD COLUMN contact_email VARCHAR(255),
ADD COLUMN contact_phone VARCHAR(50),
ADD COLUMN contact_address TEXT,
ADD COLUMN logo_url VARCHAR(255);

-- Create product table
CREATE TABLE product (
    product_id BIGSERIAL PRIMARY KEY,
    company_id BIGINT REFERENCES company(company_id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    users_count INTEGER DEFAULT 0,
    launch_date TIMESTAMP WITH TIME ZONE,
    features JSONB DEFAULT '[]'::jsonb,
    pricing_model VARCHAR(50),
    starting_price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    metrics JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create team table
CREATE TABLE team (
    team_id BIGSERIAL PRIMARY KEY,
    company_id BIGINT REFERENCES company(company_id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    lead_user_id BIGINT REFERENCES "user"(user_id),
    department VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create team_member table
CREATE TABLE team_member (
    team_member_id BIGSERIAL PRIMARY KEY,
    team_id BIGINT REFERENCES team(team_id),
    user_id BIGINT REFERENCES "user"(user_id),
    role VARCHAR(100),
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    UNIQUE(team_id, user_id)
);

-- Create research table
CREATE TABLE research (
    research_id BIGSERIAL PRIMARY KEY,
    company_id BIGINT REFERENCES company(company_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL,
    authors JSONB DEFAULT '[]'::jsonb,
    published_date TIMESTAMP WITH TIME ZONE,
    link VARCHAR(255),
    tags JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    downloads INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    attachments JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create competitor table
CREATE TABLE competitor (
    competitor_id BIGSERIAL PRIMARY KEY,
    company_id BIGINT REFERENCES company(company_id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    industry VARCHAR(100),
    market_position VARCHAR(50),
    trend VARCHAR(50),
    employee_count VARCHAR(50),
    founded_year VARCHAR(4),
    website VARCHAR(255),
    linkedin_url VARCHAR(255),
    twitter_url VARCHAR(255),
    strengths JSONB DEFAULT '[]'::jsonb,
    weaknesses JSONB DEFAULT '[]'::jsonb,
    products JSONB DEFAULT '[]'::jsonb,
    metrics JSONB DEFAULT '{}'::jsonb,
    last_analyzed TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_product_company ON product(company_id);
CREATE INDEX idx_product_status ON product(status);
CREATE INDEX idx_team_company ON team(company_id);
CREATE INDEX idx_team_lead ON team(lead_user_id);
CREATE INDEX idx_team_member_team ON team_member(team_id);
CREATE INDEX idx_team_member_user ON team_member(user_id);
CREATE INDEX idx_research_company ON research(company_id);
CREATE INDEX idx_research_status ON research(status);
CREATE INDEX idx_competitor_company ON competitor(company_id);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_company_updated_at
    BEFORE UPDATE ON company
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_updated_at
    BEFORE UPDATE ON product
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_updated_at
    BEFORE UPDATE ON team
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_updated_at
    BEFORE UPDATE ON research
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_competitor_updated_at
    BEFORE UPDATE ON competitor
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO product (company_id, name, description, type, status, users_count, launch_date)
VALUES 
(1, 'Analytics Dashboard', 'Real-time data analytics and visualization platform', 'web', 'active', 1200, CURRENT_TIMESTAMP),
(1, 'Data Warehouse', 'Enterprise-scale data storage solution', 'database', 'active', 450, CURRENT_TIMESTAMP),
(1, 'Cloud Functions', 'Serverless compute platform', 'cloud', 'beta', 280, CURRENT_TIMESTAMP);

INSERT INTO team (company_id, name, description, department)
VALUES 
(1, 'Frontend Team', 'Web application development and UI/UX implementation', 'Engineering'),
(1, 'Backend Team', 'API development and server infrastructure', 'Engineering'),
(1, 'DevOps Team', 'CI/CD pipeline and cloud infrastructure management', 'Operations');

INSERT INTO research (company_id, title, description, type, status)
VALUES 
(1, 'Cloud Migration Strategy', 'A comprehensive study on enterprise cloud migration patterns', 'whitepaper', 'published'),
(1, 'AI Implementation Case Study', 'How TechCorp implemented AI solutions', 'case-study', 'published'),
(1, 'Future of DevOps', 'Analysis of emerging trends in DevOps', 'article', 'published');

INSERT INTO competitor (company_id, name, description, industry, market_position, trend)
VALUES 
(1, 'CloudTech Solutions', 'Enterprise cloud infrastructure provider', 'Cloud Computing', 'leader', 'up'),
(1, 'DataFlow Systems', 'Data analytics platform', 'Data Analytics', 'challenger', 'up'),
(1, 'AICore Technologies', 'AI and ML solutions', 'Artificial Intelligence', 'follower', 'neutral'); 