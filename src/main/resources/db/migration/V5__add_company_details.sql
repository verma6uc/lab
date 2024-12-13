-- Create industry enum type
CREATE TYPE company_industry AS ENUM (
    'TECHNOLOGY',
    'HEALTHCARE',
    'FINANCE',
    'RETAIL',
    'MANUFACTURING',
    'EDUCATION',
    'ENTERTAINMENT',
    'REAL_ESTATE',
    'ENERGY',
    'TRANSPORTATION',
    'CONSULTING',
    'TELECOMMUNICATIONS',
    'AGRICULTURE',
    'CONSTRUCTION',
    'HOSPITALITY',
    'MEDIA',
    'AUTOMOTIVE',
    'AEROSPACE',
    'BIOTECHNOLOGY',
    'OTHER'
);

-- Add new columns to company table
ALTER TABLE company
ADD COLUMN size INTEGER DEFAULT 0,
ADD COLUMN industry company_industry,
ADD COLUMN bio TEXT,
ADD COLUMN description TEXT; 