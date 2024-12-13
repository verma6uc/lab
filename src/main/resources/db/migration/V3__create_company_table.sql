-- Create company table
CREATE TABLE company (
    company_id BIGSERIAL PRIMARY KEY,
    id VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    logo VARCHAR(255),
    industry VARCHAR(100),
    size VARCHAR(50),
    location VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_company_name ON company(name);
CREATE INDEX idx_company_domain ON company(domain);
CREATE INDEX idx_company_status ON company(status);

-- Insert sample company
INSERT INTO company (
    id,
    name,
    domain,
    logo,
    industry,
    size,
    location,
    status,
    settings
) VALUES (
    'yuvi-001',
    'YuVi Labs',
    'yuvilabs.ai',
    'https://yuvilabs.ai/logo.png',
    'Artificial Intelligence',
    '50-100',
    'San Francisco, CA',
    'ACTIVE',
    '{
        "theme": "dark",
        "features": ["ai", "analytics", "automation"],
        "subscription": "enterprise"
    }'::jsonb
); 