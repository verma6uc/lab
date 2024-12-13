-- Create user_role enum type
CREATE TYPE user_role AS ENUM ('SUPERADMIN', 'CREATOR', 'USER');

-- Create user_status enum type
CREATE TYPE user_status AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');

-- Create sequence for user_id
CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Create user table
CREATE TABLE "user" (
    user_id BIGINT DEFAULT nextval('user_id_seq') PRIMARY KEY,
    id VARCHAR(255) NOT NULL UNIQUE,
    company_id BIGINT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    status user_status NOT NULL,
    last_active TIMESTAMP WITH TIME ZONE,
    avatar VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    department VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    bio TEXT,
    skills TEXT[],
    preferences JSONB DEFAULT '{}'::jsonb,
    social_links JSONB DEFAULT '{}'::jsonb
);

-- Create index on email for faster lookups during authentication
CREATE INDEX idx_user_email ON "user"(email);

-- Create index on company_id for faster company-based queries
CREATE INDEX idx_user_company ON "user"(company_id);

-- Create index on role for role-based queries
CREATE INDEX idx_user_role ON "user"(role);

-- Create index on status for status-based filtering
CREATE INDEX idx_user_status ON "user"(status); 