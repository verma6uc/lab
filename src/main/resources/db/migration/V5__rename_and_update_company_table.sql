-- Rename table from company to companies
ALTER TABLE company RENAME TO companies;

-- Add new columns
ALTER TABLE companies
    ADD COLUMN type VARCHAR(50),
    ADD COLUMN website VARCHAR(255),
    ADD COLUMN logo_url VARCHAR(255),
    ADD COLUMN contact_email VARCHAR(255),
    ADD COLUMN contact_phone VARCHAR(50),
    ADD COLUMN contact_address TEXT,
    ADD COLUMN linkedin_url VARCHAR(255),
    ADD COLUMN twitter_url VARCHAR(255),
    ADD COLUMN github_url VARCHAR(255),
    ADD COLUMN products_count INTEGER DEFAULT 0,
    ADD COLUMN users_count INTEGER DEFAULT 0,
    ADD COLUMN projects_count INTEGER DEFAULT 0,
    ADD COLUMN primary_color VARCHAR(50),
    ADD COLUMN secondary_color VARCHAR(50),
    ADD COLUMN font_family VARCHAR(100),
    ADD COLUMN bio TEXT,
    ADD COLUMN mission TEXT;

-- Drop old columns
ALTER TABLE companies
    DROP COLUMN domain,
    DROP COLUMN logo,
    DROP COLUMN settings;

-- Update existing data
UPDATE companies SET
    type = 'enterprise',
    website = 'https://yuvilabs.ai',
    logo_url = logo,
    contact_email = 'contact@yuvilabs.ai',
    products_count = 0,
    users_count = 0,
    projects_count = 0,
    bio = 'Leading AI company',
    mission = 'Empowering businesses with AI'
WHERE id = 'yuvi-001';

-- Create new indexes
CREATE INDEX idx_companies_type ON companies(type);
CREATE INDEX idx_companies_website ON companies(website);
CREATE INDEX idx_companies_contact_email ON companies(contact_email); 