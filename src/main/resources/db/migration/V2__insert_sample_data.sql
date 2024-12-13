-- Insert sample users with BCrypt hashed passwords
-- Password for all users is 'password123'
INSERT INTO "user" (
    id, 
    company_id, 
    name, 
    email, 
    password, 
    role, 
    status, 
    last_active, 
    avatar, 
    created_at, 
    department, 
    phone, 
    location, 
    bio, 
    skills, 
    preferences, 
    social_links
) VALUES 
-- Superadmin
(
    'sa-001',
    1,
    'Super Admin',
    'admin@yuvilabs.com',
    '$2a$10$xVQZJGKrFVkGFVqbgUYXPO8h0qvhYG6TnBBYPy9tkey0DfyB9oKYi',  -- password123
    'SUPERADMIN'::user_role,
    'ACTIVE'::user_status,
    CURRENT_TIMESTAMP,
    'https://ui-avatars.com/api/?name=Super+Admin',
    CURRENT_TIMESTAMP,
    'Administration',
    '+1-555-0123',
    'San Francisco, CA',
    'Platform Administrator',
    ARRAY['system administration', 'security', 'management'],
    '{"theme": "dark", "notifications": true}'::jsonb,
    '{"linkedin": "linkedin.com/superadmin"}'::jsonb
),

-- Creator
(
    'cr-001',
    1,
    'John Creator',
    'creator@yuvilabs.com',
    '$2a$10$xVQZJGKrFVkGFVqbgUYXPO8h0qvhYG6TnBBYPy9tkey0DfyB9oKYi',  -- password123
    'CREATOR'::user_role,
    'ACTIVE'::user_status,
    CURRENT_TIMESTAMP,
    'https://ui-avatars.com/api/?name=John+Creator',
    CURRENT_TIMESTAMP,
    'Content',
    '+1-555-0124',
    'New York, NY',
    'Senior Content Creator',
    ARRAY['content creation', 'storytelling', 'video editing'],
    '{"theme": "light", "notifications": true}'::jsonb,
    '{"twitter": "twitter.com/creator", "youtube": "youtube.com/creator"}'::jsonb
),

-- Regular User
(
    'usr-001',
    2,
    'Alice User',
    'user@yuvilabs.com',
    '$2a$10$xVQZJGKrFVkGFVqbgUYXPO8h0qvhYG6TnBBYPy9tkey0DfyB9oKYi',  -- password123
    'USER'::user_role,
    'ACTIVE'::user_status,
    CURRENT_TIMESTAMP,
    'https://ui-avatars.com/api/?name=Alice+User',
    CURRENT_TIMESTAMP,
    'Marketing',
    '+1-555-0125',
    'Los Angeles, CA',
    'Marketing Specialist',
    ARRAY['marketing', 'social media', 'analytics'],
    '{"theme": "system", "notifications": false}'::jsonb,
    '{"linkedin": "linkedin.com/alice", "twitter": "twitter.com/alice"}'::jsonb
),

-- Inactive User
(
    'usr-002',
    2,
    'Bob Inactive',
    'inactive@yuvilabs.com',
    '$2a$10$xVQZJGKrFVkGFVqbgUYXPO8h0qvhYG6TnBBYPy9tkey0DfyB9oKYi',  -- password123
    'USER'::user_role,
    'INACTIVE'::user_status,
    CURRENT_TIMESTAMP,
    'https://ui-avatars.com/api/?name=Bob+Inactive',
    CURRENT_TIMESTAMP,
    'Sales',
    '+1-555-0126',
    'Chicago, IL',
    'Former Sales Representative',
    ARRAY['sales', 'negotiation'],
    '{"theme": "light", "notifications": false}'::jsonb,
    '{"linkedin": "linkedin.com/bob"}'::jsonb
),

-- Pending User
(
    'usr-003',
    3,
    'Carol Pending',
    'pending@yuvilabs.com',
    '$2a$10$xVQZJGKrFVkGFVqbgUYXPO8h0qvhYG6TnBBYPy9tkey0DfyB9oKYi',  -- password123
    'USER'::user_role,
    'PENDING'::user_status,
    CURRENT_TIMESTAMP,
    'https://ui-avatars.com/api/?name=Carol+Pending',
    CURRENT_TIMESTAMP,
    'Engineering',
    '+1-555-0127',
    'Seattle, WA',
    'Software Engineer',
    ARRAY['java', 'react', 'postgresql'],
    '{"theme": "dark", "notifications": true}'::jsonb,
    '{"github": "github.com/carol", "linkedin": "linkedin.com/carol"}'::jsonb
); 