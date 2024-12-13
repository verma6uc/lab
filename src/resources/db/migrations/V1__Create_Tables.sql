--------------------------
-- Table: company_brand
---------------------------
CREATE TABLE company_brand (
    company_id     BIGINT PRIMARY KEY REFERENCES company(company_id) ON DELETE CASCADE,
    primary_color  TEXT,
    secondary_color TEXT,
    font_family    TEXT,
    logo_url       TEXT
);

COMMENT ON TABLE company_brand IS 'Holds brand attributes for a given company';
COMMENT ON COLUMN company_brand.company_id IS 'References the associated company';
COMMENT ON COLUMN company_brand.primary_color IS 'Primary brand color used by the company';
COMMENT ON COLUMN company_brand.secondary_color IS 'Secondary brand color used by the company';
COMMENT ON COLUMN company_brand.font_family IS 'Font family representing the brand style';
COMMENT ON COLUMN company_brand.logo_url IS 'URL pointing to the company’s logo image';

---------------------------
-- Table: company_ui_archetype
---------------------------
CREATE TABLE company_ui_archetype (
    archetype_id   BIGSERIAL PRIMARY KEY,
    company_id     BIGINT NOT NULL REFERENCES company(company_id) ON DELETE CASCADE,
    archetype_name TEXT NOT NULL,
    description    TEXT
);

COMMENT ON TABLE company_ui_archetype IS 'Defines UI/UX archetypes associated with a company';
COMMENT ON COLUMN company_ui_archetype.archetype_id IS 'Primary key for the UI archetype record';
COMMENT ON COLUMN company_ui_archetype.company_id IS 'References the associated company';
COMMENT ON COLUMN company_ui_archetype.archetype_name IS 'Name of the UI/UX archetype';
COMMENT ON COLUMN company_ui_archetype.description IS 'Description or additional details about the UI archetype';

---------------------------
-- Table: company_product
---------------------------
CREATE TABLE company_product (
    product_id          BIGSERIAL PRIMARY KEY,
    company_id          BIGINT NOT NULL REFERENCES company(company_id) ON DELETE CASCADE,
    product_name        TEXT NOT NULL,
    product_description TEXT
);

COMMENT ON TABLE company_product IS 'Stores product information for each company';
COMMENT ON COLUMN company_product.product_id IS 'Primary key for the product record';
COMMENT ON COLUMN company_product.company_id IS 'References the associated company';
COMMENT ON COLUMN company_product.product_name IS 'Name of the product offered by the company';
COMMENT ON COLUMN company_product.product_description IS 'Optional description detailing the product features or purpose';

---------------------------
-- Table: company_screenshot
---------------------------
CREATE TABLE company_screenshot (
    screenshot_id BIGSERIAL PRIMARY KEY,
    company_id    BIGINT NOT NULL REFERENCES company(company_id) ON DELETE CASCADE,
    image_url     TEXT NOT NULL,
    captured_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE company_screenshot IS 'Holds references to screenshots taken from company pages or materials';
COMMENT ON COLUMN company_screenshot.screenshot_id IS 'Primary key for the screenshot record';
COMMENT ON COLUMN company_screenshot.company_id IS 'References the associated company';
COMMENT ON COLUMN company_screenshot.image_url IS 'URL of the stored screenshot image';
COMMENT ON COLUMN company_screenshot.captured_at IS 'Timestamp indicating when the screenshot was captured';

---------------------------
-- Table: brand_embedding
---------------------------
CREATE TABLE brand_embedding (
    company_id       BIGINT PRIMARY KEY REFERENCES company(company_id) ON DELETE CASCADE,
    embedding_vector VECTOR(768),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE brand_embedding IS 'Stores vector embeddings representing the company’s brand attributes';
COMMENT ON COLUMN brand_embedding.company_id IS 'References the associated company';
COMMENT ON COLUMN brand_embedding.embedding_vector IS 'Vector embedding generated from the company’s brand data for similarity searches';
COMMENT ON COLUMN brand_embedding.updated_at IS 'Timestamp indicating when the embedding was last updated';

---------------------------
-- Table: audit_log
---------------------------
CREATE TABLE audit_log (
    audit_id     BIGSERIAL PRIMARY KEY,
    table_name   TEXT NOT NULL,
    record_id    BIGINT NOT NULL,
    operation    TEXT NOT NULL,
    performed_by TEXT,
    performed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE audit_log IS 'Records operations performed on any table, capturing the who, what, and when of changes';
COMMENT ON COLUMN audit_log.audit_id IS 'Primary key for the audit record';
COMMENT ON COLUMN audit_log.table_name IS 'Name of the table on which the operation was performed';
COMMENT ON COLUMN audit_log.record_id IS 'Primary key of the affected record in the referenced table';
COMMENT ON COLUMN audit_log.operation IS 'Type of operation: INSERT, UPDATE, or DELETE';
COMMENT ON COLUMN audit_log.performed_by IS 'Identifier of the user or system that performed the operation';
COMMENT ON COLUMN audit_log.performed_at IS 'Timestamp indicating when the operation was performed';

---------------------------
-- Table: audit_log_change
---------------------------
CREATE TABLE audit_log_change (
    audit_change_id BIGSERIAL PRIMARY KEY,
    audit_id        BIGINT NOT NULL REFERENCES audit_log(audit_id) ON DELETE CASCADE,
    column_name     TEXT NOT NULL,
    old_value       TEXT,
    new_value       TEXT
);

COMMENT ON TABLE audit_log_change IS 'Holds detailed changes at the column level for each audited operation';
COMMENT ON COLUMN audit_log_change.audit_change_id IS 'Primary key for the audit change record';
COMMENT ON COLUMN audit_log_change.audit_id IS 'References the corresponding audit_log entry';
COMMENT ON COLUMN audit_log_change.column_name IS 'Name of the column that was changed';
COMMENT ON COLUMN audit_log_change.old_value IS 'Previous value of the column before the operation';
COMMENT ON COLUMN audit_log_change.new_value IS 'New value of the column after the operation';



ALTER TABLE company_product ADD CONSTRAINT unique_company_product_name UNIQUE (company_id, product_name);
ALTER TABLE company_ui_archetype ADD CONSTRAINT unique_company_archetype_name UNIQUE (company_id, archetype_name);


---------------------------------------------
-- Table: conversation
---------------------------------------------
CREATE TABLE conversation (
    conversation_id BIGSERIAL PRIMARY KEY,
    context_type    TEXT NOT NULL,
    context_id      BIGINT NOT NULL,
    goal            TEXT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE conversation IS 'Represents a conversation session focused on a specific goal for a given context (type and ID).';
COMMENT ON COLUMN conversation.conversation_id IS 'Primary key identifier of the conversation.';
COMMENT ON COLUMN conversation.context_type IS 'Type of the context entity (e.g., "company", "project").';
COMMENT ON COLUMN conversation.context_id IS 'ID of the context entity, referencing a record in the appropriate table depending on context_type.';
COMMENT ON COLUMN conversation.goal IS 'The objective of the conversation (e.g., "Research a company").';
COMMENT ON COLUMN conversation.created_at IS 'Timestamp when the conversation was started.';
COMMENT ON COLUMN conversation.updated_at IS 'Timestamp when the conversation was last updated.';

-- To aid performance, you might consider creating an index on (context_type, context_id):
CREATE INDEX idx_conversation_context ON conversation (context_type, context_id);

---------------------------------------------
-- Table: conversation_message
---------------------------------------------
CREATE TABLE conversation_message (
    message_id       BIGSERIAL PRIMARY KEY,
    conversation_id  BIGINT NOT NULL REFERENCES conversation(conversation_id) ON DELETE CASCADE,
    role             TEXT NOT NULL,  -- e.g., 'user', 'assistant', 'system'
    content          TEXT NOT NULL,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE conversation_message IS 'Stores individual messages within a conversation.';
COMMENT ON COLUMN conversation_message.message_id IS 'Primary key identifier of the message.';
COMMENT ON COLUMN conversation_message.conversation_id IS 'References the parent conversation.';
COMMENT ON COLUMN conversation_message.role IS 'The role of the sender of the message (e.g., user, assistant).';
COMMENT ON COLUMN conversation_message.content IS 'The text content of the message.';
COMMENT ON COLUMN conversation_message.created_at IS 'Timestamp when the message was created.';

ALTER TABLE conversation ADD COLUMN model TEXT;
ALTER TABLE conversation ADD COLUMN request_tokens INT;
ALTER TABLE conversation ADD COLUMN response_tokens INT;
ALTER TABLE conversation ADD COLUMN execution_time DOUBLE PRECISION;


CREATE TYPE user_role AS ENUM ('SUPERADMIN', 'CREATOR', 'USER');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'pending');
CREATE TABLE team (
    team_id BIGSERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL REFERENCES company(company_id) ON DELETE CASCADE,
    team_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "user" (
    user_id BIGSERIAL PRIMARY KEY,
    id TEXT UNIQUE NOT NULL,
    company_id BIGINT NOT NULL REFERENCES company(company_id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL,
    status user_status NOT NULL DEFAULT 'active',
    last_active TIMESTAMPTZ,
    avatar TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    department TEXT,
    phone TEXT,
    location TEXT,
    bio TEXT,
    skills TEXT[],
    preferences JSONB,
    social_links JSONB
);

CREATE TABLE user_team (
    user_id BIGINT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE,
    team_id BIGINT NOT NULL REFERENCES team(team_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, team_id)
);
