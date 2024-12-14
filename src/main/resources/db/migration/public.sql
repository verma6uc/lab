/*
 Navicat PostgreSQL Data Transfer

 Source Server         : 35.200.212.230
 Source Server Type    : PostgreSQL
 Source Server Version : 150008 (150008)
 Source Host           : 35.200.212.230:5432
 Source Catalog        : uv
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150008 (150008)
 File Encoding         : 65001

 Date: 15/12/2024 01:36:03
*/


-- ----------------------------
-- Type structure for halfvec
-- ----------------------------
DROP TYPE IF EXISTS "public"."halfvec";
CREATE TYPE "public"."halfvec" (
  INPUT = "public"."halfvec_in",
  OUTPUT = "public"."halfvec_out",
  RECEIVE = "public"."halfvec_recv",
  SEND = "public"."halfvec_send",
  TYPMOD_IN = "public"."halfvec_typmod_in",
  INTERNALLENGTH = VARIABLE,
  STORAGE = external,
  CATEGORY = U,
  DELIMITER = ','
);
ALTER TYPE "public"."halfvec" OWNER TO "postgres";

-- ----------------------------
-- Type structure for sparsevec
-- ----------------------------
DROP TYPE IF EXISTS "public"."sparsevec";
CREATE TYPE "public"."sparsevec" (
  INPUT = "public"."sparsevec_in",
  OUTPUT = "public"."sparsevec_out",
  RECEIVE = "public"."sparsevec_recv",
  SEND = "public"."sparsevec_send",
  TYPMOD_IN = "public"."sparsevec_typmod_in",
  INTERNALLENGTH = VARIABLE,
  STORAGE = external,
  CATEGORY = U,
  DELIMITER = ','
);
ALTER TYPE "public"."sparsevec" OWNER TO "postgres";

-- ----------------------------
-- Type structure for vector
-- ----------------------------
DROP TYPE IF EXISTS "public"."vector";
CREATE TYPE "public"."vector" (
  INPUT = "public"."vector_in",
  OUTPUT = "public"."vector_out",
  RECEIVE = "public"."vector_recv",
  SEND = "public"."vector_send",
  TYPMOD_IN = "public"."vector_typmod_in",
  INTERNALLENGTH = VARIABLE,
  STORAGE = external,
  CATEGORY = U,
  DELIMITER = ','
);
ALTER TYPE "public"."vector" OWNER TO "postgres";

-- ----------------------------
-- Type structure for user_role
-- ----------------------------
DROP TYPE IF EXISTS "public"."user_role";
CREATE TYPE "public"."user_role" AS ENUM (
  'SUPERADMIN',
  'CREATOR',
  'USER'
);
ALTER TYPE "public"."user_role" OWNER TO "postgres";

-- ----------------------------
-- Type structure for user_status
-- ----------------------------
DROP TYPE IF EXISTS "public"."user_status";
CREATE TYPE "public"."user_status" AS ENUM (
  'active',
  'inactive',
  'pending',
  'ACTIVE',
  'INACTIVE',
  'PENDING'
);
ALTER TYPE "public"."user_status" OWNER TO "postgres";

-- ----------------------------
-- Type structure for browser_enum
-- ----------------------------
DROP TYPE IF EXISTS "public"."browser_enum";
CREATE TYPE "public"."browser_enum" AS ENUM (
  'Chrome',
  'Firefox',
  'Safari',
  'Edge',
  'Other'
);
ALTER TYPE "public"."browser_enum" OWNER TO "postgres";

-- ----------------------------
-- Type structure for company_industry
-- ----------------------------
DROP TYPE IF EXISTS "public"."company_industry";
CREATE TYPE "public"."company_industry" AS ENUM (
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
ALTER TYPE "public"."company_industry" OWNER TO "postgres";

-- ----------------------------
-- Type structure for device_type_enum
-- ----------------------------
DROP TYPE IF EXISTS "public"."device_type_enum";
CREATE TYPE "public"."device_type_enum" AS ENUM (
  'desktop',
  'mobile',
  'tablet'
);
ALTER TYPE "public"."device_type_enum" OWNER TO "postgres";

-- ----------------------------
-- Type structure for os_type_enum
-- ----------------------------
DROP TYPE IF EXISTS "public"."os_type_enum";
CREATE TYPE "public"."os_type_enum" AS ENUM (
  'Windows',
  'MacOS',
  'Linux',
  'iOS',
  'Android',
  'Other'
);
ALTER TYPE "public"."os_type_enum" OWNER TO "postgres";

-- ----------------------------
-- Type structure for session_status_enum
-- ----------------------------
DROP TYPE IF EXISTS "public"."session_status_enum";
CREATE TYPE "public"."session_status_enum" AS ENUM (
  'active',
  'idle',
  'disconnected'
);
ALTER TYPE "public"."session_status_enum" OWNER TO "postgres";

-- ----------------------------
-- Type structure for space_type
-- ----------------------------
DROP TYPE IF EXISTS "public"."space_type";
CREATE TYPE "public"."space_type" AS ENUM (
  'DEPARTMENT',
  'FACILITY',
  'TEAM',
  'PROJECT',
  'DIVISION'
);
ALTER TYPE "public"."space_type" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for audit_log_audit_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."audit_log_audit_id_seq";
CREATE SEQUENCE "public"."audit_log_audit_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for audit_log_change_audit_change_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."audit_log_change_audit_change_id_seq";
CREATE SEQUENCE "public"."audit_log_change_audit_change_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for companies_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."companies_id_seq";
CREATE SEQUENCE "public"."companies_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for company_products_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."company_products_id_seq";
CREATE SEQUENCE "public"."company_products_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for company_screenshots_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."company_screenshots_id_seq";
CREATE SEQUENCE "public"."company_screenshots_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for company_ui_archetypes_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."company_ui_archetypes_id_seq";
CREATE SEQUENCE "public"."company_ui_archetypes_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for competitors_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."competitors_id_seq";
CREATE SEQUENCE "public"."competitors_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for conversation_messages_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."conversation_messages_id_seq";
CREATE SEQUENCE "public"."conversation_messages_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for conversations_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."conversations_id_seq";
CREATE SEQUENCE "public"."conversations_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for researches_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."researches_id_seq";
CREATE SEQUENCE "public"."researches_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for space_attributes_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."space_attributes_id_seq";
CREATE SEQUENCE "public"."space_attributes_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for spaces_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."spaces_id_seq";
CREATE SEQUENCE "public"."spaces_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for team_team_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."team_team_id_seq";
CREATE SEQUENCE "public"."team_team_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Table structure for audit_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."audit_log";
CREATE TABLE "public"."audit_log" (
  "id" int8 NOT NULL DEFAULT nextval('audit_log_audit_id_seq'::regclass),
  "table_name" text COLLATE "pg_catalog"."default" NOT NULL,
  "record_id" int8 NOT NULL,
  "operation" text COLLATE "pg_catalog"."default" NOT NULL,
  "performed_by" text COLLATE "pg_catalog"."default",
  "performed_at" timestamptz(6) NOT NULL DEFAULT now()
)
;
COMMENT ON COLUMN "public"."audit_log"."id" IS 'Primary key for the audit record';
COMMENT ON COLUMN "public"."audit_log"."table_name" IS 'Name of the table on which the operation was performed';
COMMENT ON COLUMN "public"."audit_log"."record_id" IS 'Primary key of the affected record in the referenced table';
COMMENT ON COLUMN "public"."audit_log"."operation" IS 'Type of operation: INSERT, UPDATE, or DELETE';
COMMENT ON COLUMN "public"."audit_log"."performed_by" IS 'Identifier of the user or system that performed the operation';
COMMENT ON COLUMN "public"."audit_log"."performed_at" IS 'Timestamp indicating when the operation was performed';
COMMENT ON TABLE "public"."audit_log" IS 'Records operations performed on any table, capturing the who, what, and when of changes';

-- ----------------------------
-- Table structure for audit_log_change
-- ----------------------------
DROP TABLE IF EXISTS "public"."audit_log_change";
CREATE TABLE "public"."audit_log_change" (
  "audit_change_id" int8 NOT NULL DEFAULT nextval('audit_log_change_audit_change_id_seq'::regclass),
  "audit_id" int8 NOT NULL,
  "column_name" text COLLATE "pg_catalog"."default" NOT NULL,
  "old_value" text COLLATE "pg_catalog"."default",
  "new_value" text COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."audit_log_change"."audit_change_id" IS 'Primary key for the audit change record';
COMMENT ON COLUMN "public"."audit_log_change"."audit_id" IS 'References the corresponding audit_log entry';
COMMENT ON COLUMN "public"."audit_log_change"."column_name" IS 'Name of the column that was changed';
COMMENT ON COLUMN "public"."audit_log_change"."old_value" IS 'Previous value of the column before the operation';
COMMENT ON COLUMN "public"."audit_log_change"."new_value" IS 'New value of the column after the operation';
COMMENT ON TABLE "public"."audit_log_change" IS 'Holds detailed changes at the column level for each audited operation';

-- ----------------------------
-- Table structure for brand_embeddings
-- ----------------------------
DROP TABLE IF EXISTS "public"."brand_embeddings";
CREATE TABLE "public"."brand_embeddings" (
  "company_id" int8 NOT NULL,
  "embedding_vector" "public"."vector",
  "updated_at" timestamptz(6) NOT NULL DEFAULT now()
)
;
COMMENT ON COLUMN "public"."brand_embeddings"."company_id" IS 'References the associated company';
COMMENT ON COLUMN "public"."brand_embeddings"."embedding_vector" IS 'Vector embedding generated from the company’s brand data for similarity searches';
COMMENT ON COLUMN "public"."brand_embeddings"."updated_at" IS 'Timestamp indicating when the embedding was last updated';
COMMENT ON TABLE "public"."brand_embeddings" IS 'Stores vector embeddings representing the company’s brand attributes';

-- ----------------------------
-- Table structure for companies
-- ----------------------------
DROP TABLE IF EXISTS "public"."companies";
CREATE TABLE "public"."companies" (
  "id" int8 NOT NULL DEFAULT nextval('companies_id_seq'::regclass),
  "company_name" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamptz(6) NOT NULL DEFAULT now(),
  "updated_at" timestamptz(6) NOT NULL DEFAULT now(),
  "type" varchar(50) COLLATE "pg_catalog"."default",
  "website" varchar(255) COLLATE "pg_catalog"."default",
  "linkedin_url" varchar(255) COLLATE "pg_catalog"."default",
  "twitter_url" varchar(255) COLLATE "pg_catalog"."default",
  "github_url" varchar(255) COLLATE "pg_catalog"."default",
  "contact_email" varchar(255) COLLATE "pg_catalog"."default",
  "contact_phone" varchar(50) COLLATE "pg_catalog"."default",
  "contact_address" text COLLATE "pg_catalog"."default",
  "logo_url" varchar(255) COLLATE "pg_catalog"."default",
  "size" int4 DEFAULT 0,
  "industry" "public"."company_industry",
  "bio" text COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."companies"."id" IS 'Primary key for the company';
COMMENT ON COLUMN "public"."companies"."company_name" IS 'Unique name of the company';
COMMENT ON COLUMN "public"."companies"."created_at" IS 'Timestamp when the company record was created';
COMMENT ON COLUMN "public"."companies"."updated_at" IS 'Timestamp when the company record was last updated';
COMMENT ON TABLE "public"."companies" IS 'Stores core information about a company';

-- ----------------------------
-- Table structure for company_brands
-- ----------------------------
DROP TABLE IF EXISTS "public"."company_brands";
CREATE TABLE "public"."company_brands" (
  "company_id" int8 NOT NULL,
  "primary_color" text COLLATE "pg_catalog"."default",
  "secondary_color" text COLLATE "pg_catalog"."default",
  "font_family" text COLLATE "pg_catalog"."default",
  "logo_url" text COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."company_brands"."company_id" IS 'References the associated company';
COMMENT ON COLUMN "public"."company_brands"."primary_color" IS 'Primary brand color used by the company';
COMMENT ON COLUMN "public"."company_brands"."secondary_color" IS 'Secondary brand color used by the company';
COMMENT ON COLUMN "public"."company_brands"."font_family" IS 'Font family representing the brand style';
COMMENT ON COLUMN "public"."company_brands"."logo_url" IS 'URL pointing to the company’s logo image';
COMMENT ON TABLE "public"."company_brands" IS 'Holds brand attributes for a given company';

-- ----------------------------
-- Table structure for company_products
-- ----------------------------
DROP TABLE IF EXISTS "public"."company_products";
CREATE TABLE "public"."company_products" (
  "id" int8 NOT NULL DEFAULT nextval('company_products_id_seq'::regclass),
  "company_id" int8 NOT NULL,
  "product_name" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_description" text COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."company_products"."id" IS 'Primary key for the product record';
COMMENT ON COLUMN "public"."company_products"."company_id" IS 'References the associated company';
COMMENT ON COLUMN "public"."company_products"."product_name" IS 'Name of the product offered by the company';
COMMENT ON COLUMN "public"."company_products"."product_description" IS 'Optional description detailing the product features or purpose';
COMMENT ON TABLE "public"."company_products" IS 'Stores product information for each company';

-- ----------------------------
-- Table structure for company_screenshots
-- ----------------------------
DROP TABLE IF EXISTS "public"."company_screenshots";
CREATE TABLE "public"."company_screenshots" (
  "id" int8 NOT NULL DEFAULT nextval('company_screenshots_id_seq'::regclass),
  "company_id" int8 NOT NULL,
  "image_url" text COLLATE "pg_catalog"."default" NOT NULL,
  "captured_at" timestamptz(6) NOT NULL DEFAULT now()
)
;
COMMENT ON COLUMN "public"."company_screenshots"."id" IS 'Primary key for the screenshot record';
COMMENT ON COLUMN "public"."company_screenshots"."company_id" IS 'References the associated company';
COMMENT ON COLUMN "public"."company_screenshots"."image_url" IS 'URL of the stored screenshot image';
COMMENT ON COLUMN "public"."company_screenshots"."captured_at" IS 'Timestamp indicating when the screenshot was captured';
COMMENT ON TABLE "public"."company_screenshots" IS 'Holds references to screenshots taken from company pages or materials';

-- ----------------------------
-- Table structure for company_ui_archetypes
-- ----------------------------
DROP TABLE IF EXISTS "public"."company_ui_archetypes";
CREATE TABLE "public"."company_ui_archetypes" (
  "id" int8 NOT NULL DEFAULT nextval('company_ui_archetypes_id_seq'::regclass),
  "company_id" int8 NOT NULL,
  "archetype_name" text COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."company_ui_archetypes"."id" IS 'Primary key for the UI archetype record';
COMMENT ON COLUMN "public"."company_ui_archetypes"."company_id" IS 'References the associated company';
COMMENT ON COLUMN "public"."company_ui_archetypes"."archetype_name" IS 'Name of the UI/UX archetype';
COMMENT ON COLUMN "public"."company_ui_archetypes"."description" IS 'Description or additional details about the UI archetype';
COMMENT ON TABLE "public"."company_ui_archetypes" IS 'Defines UI/UX archetypes associated with a company';

-- ----------------------------
-- Table structure for competitors
-- ----------------------------
DROP TABLE IF EXISTS "public"."competitors";
CREATE TABLE "public"."competitors" (
  "id" int8 NOT NULL DEFAULT nextval('competitors_id_seq'::regclass),
  "company_id" int8,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "industry" varchar(100) COLLATE "pg_catalog"."default",
  "market_position" varchar(50) COLLATE "pg_catalog"."default",
  "trend" varchar(50) COLLATE "pg_catalog"."default",
  "employee_count" varchar(50) COLLATE "pg_catalog"."default",
  "founded_year" varchar(4) COLLATE "pg_catalog"."default",
  "website" varchar(255) COLLATE "pg_catalog"."default",
  "linkedin_url" varchar(255) COLLATE "pg_catalog"."default",
  "twitter_url" varchar(255) COLLATE "pg_catalog"."default",
  "strengths" jsonb DEFAULT '[]'::jsonb,
  "weaknesses" jsonb DEFAULT '[]'::jsonb,
  "products" jsonb DEFAULT '[]'::jsonb,
  "metrics" jsonb DEFAULT '{}'::jsonb,
  "last_analyzed" timestamptz(6),
  "created_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Table structure for conversation_messages
-- ----------------------------
DROP TABLE IF EXISTS "public"."conversation_messages";
CREATE TABLE "public"."conversation_messages" (
  "id" int8 NOT NULL DEFAULT nextval('conversation_messages_id_seq'::regclass),
  "conversation_id" int8 NOT NULL,
  "role" text COLLATE "pg_catalog"."default" NOT NULL,
  "content" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamptz(6) NOT NULL DEFAULT now()
)
;
COMMENT ON COLUMN "public"."conversation_messages"."id" IS 'Primary key identifier of the message.';
COMMENT ON COLUMN "public"."conversation_messages"."conversation_id" IS 'References the parent conversation.';
COMMENT ON COLUMN "public"."conversation_messages"."role" IS 'The role of the sender of the message (e.g., user, assistant).';
COMMENT ON COLUMN "public"."conversation_messages"."content" IS 'The text content of the message.';
COMMENT ON COLUMN "public"."conversation_messages"."created_at" IS 'Timestamp when the message was created.';
COMMENT ON TABLE "public"."conversation_messages" IS 'Stores individual messages within a conversation.';

-- ----------------------------
-- Table structure for conversations
-- ----------------------------
DROP TABLE IF EXISTS "public"."conversations";
CREATE TABLE "public"."conversations" (
  "id" int8 NOT NULL DEFAULT nextval('conversations_id_seq'::regclass),
  "context_type" text COLLATE "pg_catalog"."default" NOT NULL,
  "context_id" int8 NOT NULL,
  "goal" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamptz(6) NOT NULL DEFAULT now(),
  "updated_at" timestamptz(6) NOT NULL DEFAULT now(),
  "model" text COLLATE "pg_catalog"."default",
  "request_tokens" int4,
  "response_tokens" int4,
  "execution_time" float8
)
;
COMMENT ON COLUMN "public"."conversations"."id" IS 'Primary key identifier of the conversation.';
COMMENT ON COLUMN "public"."conversations"."context_type" IS 'Type of the context entity (e.g., "company", "project").';
COMMENT ON COLUMN "public"."conversations"."context_id" IS 'ID of the context entity, referencing a record in the appropriate table depending on context_type.';
COMMENT ON COLUMN "public"."conversations"."goal" IS 'The objective of the conversation (e.g., "Research a company").';
COMMENT ON COLUMN "public"."conversations"."created_at" IS 'Timestamp when the conversation was started.';
COMMENT ON COLUMN "public"."conversations"."updated_at" IS 'Timestamp when the conversation was last updated.';
COMMENT ON TABLE "public"."conversations" IS 'Represents a conversation session focused on a specific goal for a given context (type and ID).';

-- ----------------------------
-- Table structure for researches
-- ----------------------------
DROP TABLE IF EXISTS "public"."researches";
CREATE TABLE "public"."researches" (
  "id" int8 NOT NULL DEFAULT nextval('researches_id_seq'::regclass),
  "company_id" int8,
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "type" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "authors" jsonb DEFAULT '[]'::jsonb,
  "published_date" timestamptz(6),
  "link" varchar(255) COLLATE "pg_catalog"."default",
  "tags" jsonb DEFAULT '[]'::jsonb,
  "status" varchar(50) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'draft'::character varying,
  "downloads" int4 DEFAULT 0,
  "views" int4 DEFAULT 0,
  "attachments" jsonb DEFAULT '[]'::jsonb,
  "created_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Table structure for space_attributes
-- ----------------------------
DROP TABLE IF EXISTS "public"."space_attributes";
CREATE TABLE "public"."space_attributes" (
  "id" int8 NOT NULL DEFAULT nextval('space_attributes_id_seq'::regclass),
  "space_id" int8 NOT NULL,
  "key" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "value" text COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Table structure for spaces
-- ----------------------------
DROP TABLE IF EXISTS "public"."spaces";
CREATE TABLE "public"."spaces" (
  "id" int8 NOT NULL DEFAULT nextval('spaces_id_seq'::regclass),
  "company_id" int8 NOT NULL,
  "external_id" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "type" "public"."space_type" NOT NULL,
  "parent_id" int8,
  "created_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Table structure for teams
-- ----------------------------
DROP TABLE IF EXISTS "public"."teams";
CREATE TABLE "public"."teams" (
  "id" int8 NOT NULL DEFAULT nextval('team_team_id_seq'::regclass),
  "company_id" int8 NOT NULL,
  "team_name" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamptz(6) NOT NULL DEFAULT now(),
  "updated_at" timestamptz(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for user_sessions
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_sessions";
CREATE TABLE "public"."user_sessions" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "user_id" int8,
  "company_id" int8,
  "status" "public"."session_status_enum" NOT NULL DEFAULT 'active'::session_status_enum,
  "started_at" timestamptz(6) NOT NULL DEFAULT now(),
  "last_activity_at" timestamptz(6) NOT NULL DEFAULT now(),
  "ended_at" timestamptz(6),
  "duration_seconds" int4,
  "device_type" "public"."device_type_enum" NOT NULL,
  "browser" "public"."browser_enum" NOT NULL,
  "browser_version" varchar(50) COLLATE "pg_catalog"."default",
  "os_type" "public"."os_type_enum" NOT NULL,
  "os_version" varchar(50) COLLATE "pg_catalog"."default",
  "device_id" varchar(255) COLLATE "pg_catalog"."default",
  "ip_address" inet NOT NULL,
  "city" varchar(100) COLLATE "pg_catalog"."default",
  "country" varchar(100) COLLATE "pg_catalog"."default",
  "latitude" numeric(10,8),
  "longitude" numeric(11,8),
  "user_agent" text COLLATE "pg_catalog"."default" NOT NULL,
  "screen_resolution" varchar(50) COLLATE "pg_catalog"."default",
  "language" varchar(10) COLLATE "pg_catalog"."default",
  "timezone" varchar(50) COLLATE "pg_catalog"."default",
  "is_authenticated" bool NOT NULL DEFAULT true,
  "is_secure_connection" bool NOT NULL DEFAULT true,
  "connection_type" varchar(50) COLLATE "pg_catalog"."default",
  "network_speed" varchar(50) COLLATE "pg_catalog"."default",
  "current_page" varchar(255) COLLATE "pg_catalog"."default",
  "previous_page" varchar(255) COLLATE "pg_catalog"."default",
  "page_views" int4 DEFAULT 0,
  "total_clicks" int4 DEFAULT 0,
  "total_actions" int4 DEFAULT 0,
  "bounce_rate" numeric(5,2),
  "created_at" timestamptz(6) NOT NULL DEFAULT now(),
  "updated_at" timestamptz(6) NOT NULL DEFAULT now()
)
;
COMMENT ON COLUMN "public"."user_sessions"."id" IS 'Unique identifier for the session';
COMMENT ON COLUMN "public"."user_sessions"."status" IS 'Current status of the session: active, idle, or disconnected';
COMMENT ON COLUMN "public"."user_sessions"."duration_seconds" IS 'Duration of the session in seconds';
COMMENT ON COLUMN "public"."user_sessions"."device_type" IS 'Type of device used for the session';
COMMENT ON TABLE "public"."user_sessions" IS 'Stores detailed information about user sessions including device, location, and activity data';

-- ----------------------------
-- Table structure for user_spaces
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_spaces";
CREATE TABLE "public"."user_spaces" (
  "user_id" int8 NOT NULL,
  "space_id" int8 NOT NULL,
  "role" varchar(50) COLLATE "pg_catalog"."default",
  "joined_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Table structure for user_team
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_team";
CREATE TABLE "public"."user_team" (
  "user_id" int8 NOT NULL,
  "team_id" int8 NOT NULL
)
;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int8 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "company_id" int8 NOT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "email" text COLLATE "pg_catalog"."default" NOT NULL,
  "role" "public"."user_role" NOT NULL,
  "status" "public"."user_status" NOT NULL DEFAULT 'active'::user_status,
  "last_active" timestamptz(6),
  "avatar" text COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) NOT NULL DEFAULT now(),
  "department" text COLLATE "pg_catalog"."default",
  "phone" text COLLATE "pg_catalog"."default",
  "location" text COLLATE "pg_catalog"."default",
  "bio" text COLLATE "pg_catalog"."default",
  "skills" text[] COLLATE "pg_catalog"."default",
  "preferences" jsonb,
  "social_links" jsonb,
  "password" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Function structure for array_to_halfvec
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."array_to_halfvec"(_int4, int4, bool);
CREATE OR REPLACE FUNCTION "public"."array_to_halfvec"(_int4, int4, bool)
  RETURNS "public"."halfvec" AS '$libdir/vector', 'array_to_halfvec'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for array_to_halfvec
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."array_to_halfvec"(_float4, int4, bool);
CREATE OR REPLACE FUNCTION "public"."array_to_halfvec"(_float4, int4, bool)
  RETURNS "public"."halfvec" AS '$libdir/vector', 'array_to_halfvec'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for array_to_halfvec
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."array_to_halfvec"(_float8, int4, bool);
CREATE OR REPLACE FUNCTION "public"."array_to_halfvec"(_float8, int4, bool)
  RETURNS "public"."halfvec" AS '$libdir/vector', 'array_to_halfvec'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for array_to_halfvec
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."array_to_halfvec"(_numeric, int4, bool);
CREATE OR REPLACE FUNCTION "public"."array_to_halfvec"(_numeric, int4, bool)
  RETURNS "public"."halfvec" AS '$libdir/vector', 'array_to_halfvec'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for array_to_vector
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."array_to_vector"(_float4, int4, bool);
CREATE OR REPLACE FUNCTION "public"."array_to_vector"(_float4, int4, bool)
  RETURNS "public"."vector" AS '$libdir/vector', 'array_to_vector'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for array_to_vector
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."array_to_vector"(_float8, int4, bool);
CREATE OR REPLACE FUNCTION "public"."array_to_vector"(_float8, int4, bool)
  RETURNS "public"."vector" AS '$libdir/vector', 'array_to_vector'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for array_to_vector
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."array_to_vector"(_numeric, int4, bool);
CREATE OR REPLACE FUNCTION "public"."array_to_vector"(_numeric, int4, bool)
  RETURNS "public"."vector" AS '$libdir/vector', 'array_to_vector'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for array_to_vector
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."array_to_vector"(_int4, int4, bool);
CREATE OR REPLACE FUNCTION "public"."array_to_vector"(_int4, int4, bool)
  RETURNS "public"."vector" AS '$libdir/vector', 'array_to_vector'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for binary_quantize
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."binary_quantize"("public"."vector");
CREATE OR REPLACE FUNCTION "public"."binary_quantize"("public"."vector")
  RETURNS "pg_catalog"."bit" AS '$libdir/vector', 'binary_quantize'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for binary_quantize
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."binary_quantize"("public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."binary_quantize"("public"."halfvec")
  RETURNS "pg_catalog"."bit" AS '$libdir/vector', 'halfvec_binary_quantize'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for calculate_session_duration
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."calculate_session_duration"();
CREATE OR REPLACE FUNCTION "public"."calculate_session_duration"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
BEGIN
    NEW.duration_seconds = EXTRACT(EPOCH FROM (COALESCE(NEW.ended_at, NOW()) - NEW.started_at))::INTEGER;
    RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for cosine_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."cosine_distance"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."cosine_distance"("public"."vector", "public"."vector")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'cosine_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for cosine_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."cosine_distance"("public"."sparsevec", "public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."cosine_distance"("public"."sparsevec", "public"."sparsevec")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'sparsevec_cosine_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for cosine_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."cosine_distance"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."cosine_distance"("public"."halfvec", "public"."halfvec")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'halfvec_cosine_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec"("public"."halfvec", int4, bool);
CREATE OR REPLACE FUNCTION "public"."halfvec"("public"."halfvec", int4, bool)
  RETURNS "public"."halfvec" AS '$libdir/vector', 'halfvec'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_accum
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_accum"(_float8, "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_accum"(_float8, "public"."halfvec")
  RETURNS "pg_catalog"."_float8" AS '$libdir/vector', 'halfvec_accum'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_add
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_add"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_add"("public"."halfvec", "public"."halfvec")
  RETURNS "public"."halfvec" AS '$libdir/vector', 'halfvec_add'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_avg
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_avg"(_float8);
CREATE OR REPLACE FUNCTION "public"."halfvec_avg"(_float8)
  RETURNS "public"."halfvec" AS '$libdir/vector', 'halfvec_avg'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_cmp
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_cmp"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_cmp"("public"."halfvec", "public"."halfvec")
  RETURNS "pg_catalog"."int4" AS '$libdir/vector', 'halfvec_cmp'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_combine
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_combine"(_float8, _float8);
CREATE OR REPLACE FUNCTION "public"."halfvec_combine"(_float8, _float8)
  RETURNS "pg_catalog"."_float8" AS '$libdir/vector', 'vector_combine'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_concat
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_concat"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_concat"("public"."halfvec", "public"."halfvec")
  RETURNS "public"."halfvec" AS '$libdir/vector', 'halfvec_concat'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_eq
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_eq"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_eq"("public"."halfvec", "public"."halfvec")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'halfvec_eq'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_ge
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_ge"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_ge"("public"."halfvec", "public"."halfvec")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'halfvec_ge'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_gt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_gt"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_gt"("public"."halfvec", "public"."halfvec")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'halfvec_gt'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_in
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_in"(cstring, oid, int4);
CREATE OR REPLACE FUNCTION "public"."halfvec_in"(cstring, oid, int4)
  RETURNS "public"."halfvec" AS '$libdir/vector', 'halfvec_in'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_l2_squared_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_l2_squared_distance"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_l2_squared_distance"("public"."halfvec", "public"."halfvec")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'halfvec_l2_squared_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_le
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_le"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_le"("public"."halfvec", "public"."halfvec")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'halfvec_le'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_lt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_lt"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_lt"("public"."halfvec", "public"."halfvec")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'halfvec_lt'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_mul
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_mul"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_mul"("public"."halfvec", "public"."halfvec")
  RETURNS "public"."halfvec" AS '$libdir/vector', 'halfvec_mul'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_ne
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_ne"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_ne"("public"."halfvec", "public"."halfvec")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'halfvec_ne'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_negative_inner_product
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_negative_inner_product"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_negative_inner_product"("public"."halfvec", "public"."halfvec")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'halfvec_negative_inner_product'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_out
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_out"("public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_out"("public"."halfvec")
  RETURNS "pg_catalog"."cstring" AS '$libdir/vector', 'halfvec_out'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_recv
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_recv"(internal, oid, int4);
CREATE OR REPLACE FUNCTION "public"."halfvec_recv"(internal, oid, int4)
  RETURNS "public"."halfvec" AS '$libdir/vector', 'halfvec_recv'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_send
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_send"("public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_send"("public"."halfvec")
  RETURNS "pg_catalog"."bytea" AS '$libdir/vector', 'halfvec_send'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_spherical_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_spherical_distance"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_spherical_distance"("public"."halfvec", "public"."halfvec")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'halfvec_spherical_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_sub
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_sub"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."halfvec_sub"("public"."halfvec", "public"."halfvec")
  RETURNS "public"."halfvec" AS '$libdir/vector', 'halfvec_sub'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_to_float4
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_to_float4"("public"."halfvec", int4, bool);
CREATE OR REPLACE FUNCTION "public"."halfvec_to_float4"("public"."halfvec", int4, bool)
  RETURNS "pg_catalog"."_float4" AS '$libdir/vector', 'halfvec_to_float4'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_to_sparsevec
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_to_sparsevec"("public"."halfvec", int4, bool);
CREATE OR REPLACE FUNCTION "public"."halfvec_to_sparsevec"("public"."halfvec", int4, bool)
  RETURNS "public"."sparsevec" AS '$libdir/vector', 'halfvec_to_sparsevec'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_to_vector
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_to_vector"("public"."halfvec", int4, bool);
CREATE OR REPLACE FUNCTION "public"."halfvec_to_vector"("public"."halfvec", int4, bool)
  RETURNS "public"."vector" AS '$libdir/vector', 'halfvec_to_vector'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for halfvec_typmod_in
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."halfvec_typmod_in"(_cstring);
CREATE OR REPLACE FUNCTION "public"."halfvec_typmod_in"(_cstring)
  RETURNS "pg_catalog"."int4" AS '$libdir/vector', 'halfvec_typmod_in'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for hamming_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."hamming_distance"(bit, bit);
CREATE OR REPLACE FUNCTION "public"."hamming_distance"(bit, bit)
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'hamming_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for hnsw_bit_support
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."hnsw_bit_support"(internal);
CREATE OR REPLACE FUNCTION "public"."hnsw_bit_support"(internal)
  RETURNS "pg_catalog"."internal" AS '$libdir/vector', 'hnsw_bit_support'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for hnsw_halfvec_support
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."hnsw_halfvec_support"(internal);
CREATE OR REPLACE FUNCTION "public"."hnsw_halfvec_support"(internal)
  RETURNS "pg_catalog"."internal" AS '$libdir/vector', 'hnsw_halfvec_support'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for hnsw_sparsevec_support
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."hnsw_sparsevec_support"(internal);
CREATE OR REPLACE FUNCTION "public"."hnsw_sparsevec_support"(internal)
  RETURNS "pg_catalog"."internal" AS '$libdir/vector', 'hnsw_sparsevec_support'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for hnswhandler
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."hnswhandler"(internal);
CREATE OR REPLACE FUNCTION "public"."hnswhandler"(internal)
  RETURNS "pg_catalog"."index_am_handler" AS '$libdir/vector', 'hnswhandler'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for inner_product
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."inner_product"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."inner_product"("public"."halfvec", "public"."halfvec")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'halfvec_inner_product'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for inner_product
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."inner_product"("public"."sparsevec", "public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."inner_product"("public"."sparsevec", "public"."sparsevec")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'sparsevec_inner_product'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for inner_product
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."inner_product"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."inner_product"("public"."vector", "public"."vector")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'inner_product'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for ivfflat_bit_support
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."ivfflat_bit_support"(internal);
CREATE OR REPLACE FUNCTION "public"."ivfflat_bit_support"(internal)
  RETURNS "pg_catalog"."internal" AS '$libdir/vector', 'ivfflat_bit_support'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for ivfflat_halfvec_support
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."ivfflat_halfvec_support"(internal);
CREATE OR REPLACE FUNCTION "public"."ivfflat_halfvec_support"(internal)
  RETURNS "pg_catalog"."internal" AS '$libdir/vector', 'ivfflat_halfvec_support'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for ivfflathandler
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."ivfflathandler"(internal);
CREATE OR REPLACE FUNCTION "public"."ivfflathandler"(internal)
  RETURNS "pg_catalog"."index_am_handler" AS '$libdir/vector', 'ivfflathandler'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for jaccard_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."jaccard_distance"(bit, bit);
CREATE OR REPLACE FUNCTION "public"."jaccard_distance"(bit, bit)
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'jaccard_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for l1_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."l1_distance"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."l1_distance"("public"."halfvec", "public"."halfvec")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'halfvec_l1_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for l1_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."l1_distance"("public"."sparsevec", "public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."l1_distance"("public"."sparsevec", "public"."sparsevec")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'sparsevec_l1_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for l1_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."l1_distance"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."l1_distance"("public"."vector", "public"."vector")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'l1_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for l2_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."l2_distance"("public"."sparsevec", "public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."l2_distance"("public"."sparsevec", "public"."sparsevec")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'sparsevec_l2_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for l2_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."l2_distance"("public"."halfvec", "public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."l2_distance"("public"."halfvec", "public"."halfvec")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'halfvec_l2_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for l2_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."l2_distance"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."l2_distance"("public"."vector", "public"."vector")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'l2_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for l2_norm
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."l2_norm"("public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."l2_norm"("public"."sparsevec")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'sparsevec_l2_norm'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for l2_norm
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."l2_norm"("public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."l2_norm"("public"."halfvec")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'halfvec_l2_norm'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for l2_normalize
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."l2_normalize"("public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."l2_normalize"("public"."halfvec")
  RETURNS "public"."halfvec" AS '$libdir/vector', 'halfvec_l2_normalize'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for l2_normalize
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."l2_normalize"("public"."vector");
CREATE OR REPLACE FUNCTION "public"."l2_normalize"("public"."vector")
  RETURNS "public"."vector" AS '$libdir/vector', 'l2_normalize'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for l2_normalize
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."l2_normalize"("public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."l2_normalize"("public"."sparsevec")
  RETURNS "public"."sparsevec" AS '$libdir/vector', 'sparsevec_l2_normalize'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec"("public"."sparsevec", int4, bool);
CREATE OR REPLACE FUNCTION "public"."sparsevec"("public"."sparsevec", int4, bool)
  RETURNS "public"."sparsevec" AS '$libdir/vector', 'sparsevec'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_cmp
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_cmp"("public"."sparsevec", "public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."sparsevec_cmp"("public"."sparsevec", "public"."sparsevec")
  RETURNS "pg_catalog"."int4" AS '$libdir/vector', 'sparsevec_cmp'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_eq
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_eq"("public"."sparsevec", "public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."sparsevec_eq"("public"."sparsevec", "public"."sparsevec")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'sparsevec_eq'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_ge
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_ge"("public"."sparsevec", "public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."sparsevec_ge"("public"."sparsevec", "public"."sparsevec")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'sparsevec_ge'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_gt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_gt"("public"."sparsevec", "public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."sparsevec_gt"("public"."sparsevec", "public"."sparsevec")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'sparsevec_gt'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_in
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_in"(cstring, oid, int4);
CREATE OR REPLACE FUNCTION "public"."sparsevec_in"(cstring, oid, int4)
  RETURNS "public"."sparsevec" AS '$libdir/vector', 'sparsevec_in'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_l2_squared_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_l2_squared_distance"("public"."sparsevec", "public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."sparsevec_l2_squared_distance"("public"."sparsevec", "public"."sparsevec")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'sparsevec_l2_squared_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_le
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_le"("public"."sparsevec", "public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."sparsevec_le"("public"."sparsevec", "public"."sparsevec")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'sparsevec_le'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_lt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_lt"("public"."sparsevec", "public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."sparsevec_lt"("public"."sparsevec", "public"."sparsevec")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'sparsevec_lt'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_ne
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_ne"("public"."sparsevec", "public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."sparsevec_ne"("public"."sparsevec", "public"."sparsevec")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'sparsevec_ne'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_negative_inner_product
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_negative_inner_product"("public"."sparsevec", "public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."sparsevec_negative_inner_product"("public"."sparsevec", "public"."sparsevec")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'sparsevec_negative_inner_product'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_out
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_out"("public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."sparsevec_out"("public"."sparsevec")
  RETURNS "pg_catalog"."cstring" AS '$libdir/vector', 'sparsevec_out'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_recv
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_recv"(internal, oid, int4);
CREATE OR REPLACE FUNCTION "public"."sparsevec_recv"(internal, oid, int4)
  RETURNS "public"."sparsevec" AS '$libdir/vector', 'sparsevec_recv'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_send
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_send"("public"."sparsevec");
CREATE OR REPLACE FUNCTION "public"."sparsevec_send"("public"."sparsevec")
  RETURNS "pg_catalog"."bytea" AS '$libdir/vector', 'sparsevec_send'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_to_halfvec
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_to_halfvec"("public"."sparsevec", int4, bool);
CREATE OR REPLACE FUNCTION "public"."sparsevec_to_halfvec"("public"."sparsevec", int4, bool)
  RETURNS "public"."halfvec" AS '$libdir/vector', 'sparsevec_to_halfvec'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_to_vector
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_to_vector"("public"."sparsevec", int4, bool);
CREATE OR REPLACE FUNCTION "public"."sparsevec_to_vector"("public"."sparsevec", int4, bool)
  RETURNS "public"."vector" AS '$libdir/vector', 'sparsevec_to_vector'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for sparsevec_typmod_in
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sparsevec_typmod_in"(_cstring);
CREATE OR REPLACE FUNCTION "public"."sparsevec_typmod_in"(_cstring)
  RETURNS "pg_catalog"."int4" AS '$libdir/vector', 'sparsevec_typmod_in'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for subvector
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."subvector"("public"."halfvec", int4, int4);
CREATE OR REPLACE FUNCTION "public"."subvector"("public"."halfvec", int4, int4)
  RETURNS "public"."halfvec" AS '$libdir/vector', 'halfvec_subvector'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for subvector
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."subvector"("public"."vector", int4, int4);
CREATE OR REPLACE FUNCTION "public"."subvector"("public"."vector", int4, int4)
  RETURNS "public"."vector" AS '$libdir/vector', 'subvector'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for update_session_last_activity
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."update_session_last_activity"();
CREATE OR REPLACE FUNCTION "public"."update_session_last_activity"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
BEGIN
    NEW.updated_at = NOW();
    NEW.last_activity_at = NOW();
    RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for update_updated_at_column
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."update_updated_at_column"();
CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for vector
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector"("public"."vector", int4, bool);
CREATE OR REPLACE FUNCTION "public"."vector"("public"."vector", int4, bool)
  RETURNS "public"."vector" AS '$libdir/vector', 'vector'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_accum
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_accum"(_float8, "public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_accum"(_float8, "public"."vector")
  RETURNS "pg_catalog"."_float8" AS '$libdir/vector', 'vector_accum'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_add
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_add"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_add"("public"."vector", "public"."vector")
  RETURNS "public"."vector" AS '$libdir/vector', 'vector_add'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_avg
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_avg"(_float8);
CREATE OR REPLACE FUNCTION "public"."vector_avg"(_float8)
  RETURNS "public"."vector" AS '$libdir/vector', 'vector_avg'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_cmp
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_cmp"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_cmp"("public"."vector", "public"."vector")
  RETURNS "pg_catalog"."int4" AS '$libdir/vector', 'vector_cmp'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_combine
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_combine"(_float8, _float8);
CREATE OR REPLACE FUNCTION "public"."vector_combine"(_float8, _float8)
  RETURNS "pg_catalog"."_float8" AS '$libdir/vector', 'vector_combine'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_concat
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_concat"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_concat"("public"."vector", "public"."vector")
  RETURNS "public"."vector" AS '$libdir/vector', 'vector_concat'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_dims
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_dims"("public"."halfvec");
CREATE OR REPLACE FUNCTION "public"."vector_dims"("public"."halfvec")
  RETURNS "pg_catalog"."int4" AS '$libdir/vector', 'halfvec_vector_dims'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_dims
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_dims"("public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_dims"("public"."vector")
  RETURNS "pg_catalog"."int4" AS '$libdir/vector', 'vector_dims'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_eq
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_eq"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_eq"("public"."vector", "public"."vector")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'vector_eq'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_ge
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_ge"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_ge"("public"."vector", "public"."vector")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'vector_ge'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_gt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_gt"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_gt"("public"."vector", "public"."vector")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'vector_gt'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_in
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_in"(cstring, oid, int4);
CREATE OR REPLACE FUNCTION "public"."vector_in"(cstring, oid, int4)
  RETURNS "public"."vector" AS '$libdir/vector', 'vector_in'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_l2_squared_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_l2_squared_distance"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_l2_squared_distance"("public"."vector", "public"."vector")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'vector_l2_squared_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_le
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_le"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_le"("public"."vector", "public"."vector")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'vector_le'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_lt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_lt"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_lt"("public"."vector", "public"."vector")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'vector_lt'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_mul
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_mul"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_mul"("public"."vector", "public"."vector")
  RETURNS "public"."vector" AS '$libdir/vector', 'vector_mul'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_ne
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_ne"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_ne"("public"."vector", "public"."vector")
  RETURNS "pg_catalog"."bool" AS '$libdir/vector', 'vector_ne'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_negative_inner_product
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_negative_inner_product"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_negative_inner_product"("public"."vector", "public"."vector")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'vector_negative_inner_product'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_norm
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_norm"("public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_norm"("public"."vector")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'vector_norm'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_out
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_out"("public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_out"("public"."vector")
  RETURNS "pg_catalog"."cstring" AS '$libdir/vector', 'vector_out'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_recv
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_recv"(internal, oid, int4);
CREATE OR REPLACE FUNCTION "public"."vector_recv"(internal, oid, int4)
  RETURNS "public"."vector" AS '$libdir/vector', 'vector_recv'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_send
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_send"("public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_send"("public"."vector")
  RETURNS "pg_catalog"."bytea" AS '$libdir/vector', 'vector_send'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_spherical_distance
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_spherical_distance"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_spherical_distance"("public"."vector", "public"."vector")
  RETURNS "pg_catalog"."float8" AS '$libdir/vector', 'vector_spherical_distance'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_sub
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_sub"("public"."vector", "public"."vector");
CREATE OR REPLACE FUNCTION "public"."vector_sub"("public"."vector", "public"."vector")
  RETURNS "public"."vector" AS '$libdir/vector', 'vector_sub'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_to_float4
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_to_float4"("public"."vector", int4, bool);
CREATE OR REPLACE FUNCTION "public"."vector_to_float4"("public"."vector", int4, bool)
  RETURNS "pg_catalog"."_float4" AS '$libdir/vector', 'vector_to_float4'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_to_halfvec
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_to_halfvec"("public"."vector", int4, bool);
CREATE OR REPLACE FUNCTION "public"."vector_to_halfvec"("public"."vector", int4, bool)
  RETURNS "public"."halfvec" AS '$libdir/vector', 'vector_to_halfvec'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_to_sparsevec
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_to_sparsevec"("public"."vector", int4, bool);
CREATE OR REPLACE FUNCTION "public"."vector_to_sparsevec"("public"."vector", int4, bool)
  RETURNS "public"."sparsevec" AS '$libdir/vector', 'vector_to_sparsevec'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for vector_typmod_in
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."vector_typmod_in"(_cstring);
CREATE OR REPLACE FUNCTION "public"."vector_typmod_in"(_cstring)
  RETURNS "pg_catalog"."int4" AS '$libdir/vector', 'vector_typmod_in'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- View structure for active_sessions_analytics
-- ----------------------------
DROP VIEW IF EXISTS "public"."active_sessions_analytics";
CREATE VIEW "public"."active_sessions_analytics" AS  SELECT user_sessions.company_id,
    count(*) AS total_sessions,
    count(*) FILTER (WHERE user_sessions.status = 'active'::session_status_enum) AS active_sessions,
    count(*) FILTER (WHERE user_sessions.status = 'idle'::session_status_enum) AS idle_sessions,
    count(*) FILTER (WHERE user_sessions.status = 'disconnected'::session_status_enum) AS disconnected_sessions,
    round(avg(user_sessions.duration_seconds))::integer AS avg_duration_seconds,
    count(DISTINCT user_sessions.user_id) AS unique_users,
    count(DISTINCT user_sessions.device_type) AS device_types_count,
    count(DISTINCT user_sessions.browser) AS browsers_count,
    count(DISTINCT user_sessions.country) AS countries_count
   FROM user_sessions
  WHERE user_sessions.ended_at IS NULL OR user_sessions.ended_at > (now() - '24:00:00'::interval)
  GROUP BY user_sessions.company_id;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."audit_log_audit_id_seq"
OWNED BY "public"."audit_log"."id";
SELECT setval('"public"."audit_log_audit_id_seq"', 162, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."audit_log_change_audit_change_id_seq"
OWNED BY "public"."audit_log_change"."audit_change_id";
SELECT setval('"public"."audit_log_change_audit_change_id_seq"', 55, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."companies_id_seq"
OWNED BY "public"."companies"."id";
SELECT setval('"public"."companies_id_seq"', 3, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."company_products_id_seq"
OWNED BY "public"."company_products"."id";
SELECT setval('"public"."company_products_id_seq"', 13, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."company_screenshots_id_seq"
OWNED BY "public"."company_screenshots"."id";
SELECT setval('"public"."company_screenshots_id_seq"', 12, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."company_ui_archetypes_id_seq"
OWNED BY "public"."company_ui_archetypes"."id";
SELECT setval('"public"."company_ui_archetypes_id_seq"', 24, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."competitors_id_seq"
OWNED BY "public"."competitors"."id";
SELECT setval('"public"."competitors_id_seq"', 24, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."conversation_messages_id_seq"
OWNED BY "public"."conversation_messages"."id";
SELECT setval('"public"."conversation_messages_id_seq"', 8, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."conversations_id_seq"
OWNED BY "public"."conversations"."id";
SELECT setval('"public"."conversations_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."researches_id_seq"
OWNED BY "public"."researches"."id";
SELECT setval('"public"."researches_id_seq"', 24, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."space_attributes_id_seq"
OWNED BY "public"."space_attributes"."id";
SELECT setval('"public"."space_attributes_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."spaces_id_seq"
OWNED BY "public"."spaces"."id";
SELECT setval('"public"."spaces_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."team_team_id_seq"
OWNED BY "public"."teams"."id";
SELECT setval('"public"."team_team_id_seq"', 90, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 191, true);

-- ----------------------------
-- Primary Key structure for table audit_log
-- ----------------------------
ALTER TABLE "public"."audit_log" ADD CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table audit_log_change
-- ----------------------------
ALTER TABLE "public"."audit_log_change" ADD CONSTRAINT "audit_log_change_pkey" PRIMARY KEY ("audit_change_id");

-- ----------------------------
-- Primary Key structure for table brand_embeddings
-- ----------------------------
ALTER TABLE "public"."brand_embeddings" ADD CONSTRAINT "brand_embedding_pkey" PRIMARY KEY ("company_id");

-- ----------------------------
-- Triggers structure for table companies
-- ----------------------------
CREATE TRIGGER "update_company_updated_at" BEFORE UPDATE ON "public"."companies"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_updated_at_column"();

-- ----------------------------
-- Uniques structure for table companies
-- ----------------------------
ALTER TABLE "public"."companies" ADD CONSTRAINT "company_company_name_key" UNIQUE ("company_name");

-- ----------------------------
-- Primary Key structure for table companies
-- ----------------------------
ALTER TABLE "public"."companies" ADD CONSTRAINT "company_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table company_brands
-- ----------------------------
ALTER TABLE "public"."company_brands" ADD CONSTRAINT "company_brand_pkey" PRIMARY KEY ("company_id");

-- ----------------------------
-- Uniques structure for table company_products
-- ----------------------------
ALTER TABLE "public"."company_products" ADD CONSTRAINT "unique_company_product_name" UNIQUE ("company_id", "product_name");

-- ----------------------------
-- Primary Key structure for table company_products
-- ----------------------------
ALTER TABLE "public"."company_products" ADD CONSTRAINT "company_product_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table company_screenshots
-- ----------------------------
ALTER TABLE "public"."company_screenshots" ADD CONSTRAINT "company_screenshot_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table company_ui_archetypes
-- ----------------------------
ALTER TABLE "public"."company_ui_archetypes" ADD CONSTRAINT "unique_company_archetype_name" UNIQUE ("company_id", "archetype_name");

-- ----------------------------
-- Primary Key structure for table company_ui_archetypes
-- ----------------------------
ALTER TABLE "public"."company_ui_archetypes" ADD CONSTRAINT "company_ui_archetype_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Triggers structure for table competitors
-- ----------------------------
CREATE TRIGGER "update_competitor_updated_at" BEFORE UPDATE ON "public"."competitors"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_updated_at_column"();

-- ----------------------------
-- Primary Key structure for table competitors
-- ----------------------------
ALTER TABLE "public"."competitors" ADD CONSTRAINT "competitor_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table conversation_messages
-- ----------------------------
ALTER TABLE "public"."conversation_messages" ADD CONSTRAINT "conversation_message_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table conversations
-- ----------------------------
CREATE INDEX "idx_conversation_context" ON "public"."conversations" USING btree (
  "context_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "context_id" "pg_catalog"."int8_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table conversations
-- ----------------------------
ALTER TABLE "public"."conversations" ADD CONSTRAINT "conversation_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Triggers structure for table researches
-- ----------------------------
CREATE TRIGGER "update_research_updated_at" BEFORE UPDATE ON "public"."researches"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_updated_at_column"();

-- ----------------------------
-- Primary Key structure for table researches
-- ----------------------------
ALTER TABLE "public"."researches" ADD CONSTRAINT "research_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table space_attributes
-- ----------------------------
ALTER TABLE "public"."space_attributes" ADD CONSTRAINT "space_attributes_space_id_key_key" UNIQUE ("space_id", "key");

-- ----------------------------
-- Primary Key structure for table space_attributes
-- ----------------------------
ALTER TABLE "public"."space_attributes" ADD CONSTRAINT "space_attributes_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table spaces
-- ----------------------------
ALTER TABLE "public"."spaces" ADD CONSTRAINT "spaces_company_id_name_type_key" UNIQUE ("company_id", "name", "type");
ALTER TABLE "public"."spaces" ADD CONSTRAINT "spaces_company_id_external_id_key" UNIQUE ("company_id", "external_id");

-- ----------------------------
-- Primary Key structure for table spaces
-- ----------------------------
ALTER TABLE "public"."spaces" ADD CONSTRAINT "spaces_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table teams
-- ----------------------------
CREATE INDEX "idx_team_company" ON "public"."teams" USING btree (
  "company_id" "pg_catalog"."int8_ops" ASC NULLS LAST
);

-- ----------------------------
-- Triggers structure for table teams
-- ----------------------------
CREATE TRIGGER "update_team_updated_at" BEFORE UPDATE ON "public"."teams"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_updated_at_column"();

-- ----------------------------
-- Primary Key structure for table teams
-- ----------------------------
ALTER TABLE "public"."teams" ADD CONSTRAINT "team_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table user_sessions
-- ----------------------------
CREATE INDEX "idx_user_sessions_company_id" ON "public"."user_sessions" USING btree (
  "company_id" "pg_catalog"."int8_ops" ASC NULLS LAST
);
CREATE INDEX "idx_user_sessions_ip_address" ON "public"."user_sessions" USING btree (
  "ip_address" "pg_catalog"."inet_ops" ASC NULLS LAST
);
CREATE INDEX "idx_user_sessions_last_activity" ON "public"."user_sessions" USING btree (
  "last_activity_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_user_sessions_location" ON "public"."user_sessions" USING btree (
  "country" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "city" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_user_sessions_started_at" ON "public"."user_sessions" USING btree (
  "started_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_user_sessions_status" ON "public"."user_sessions" USING btree (
  "status" "pg_catalog"."enum_ops" ASC NULLS LAST
);
CREATE INDEX "idx_user_sessions_user_id" ON "public"."user_sessions" USING btree (
  "user_id" "pg_catalog"."int8_ops" ASC NULLS LAST
);

-- ----------------------------
-- Triggers structure for table user_sessions
-- ----------------------------
CREATE TRIGGER "session_activity_trigger" BEFORE UPDATE ON "public"."user_sessions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_session_last_activity"();
CREATE TRIGGER "session_duration_trigger" BEFORE INSERT OR UPDATE ON "public"."user_sessions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."calculate_session_duration"();

-- ----------------------------
-- Primary Key structure for table user_sessions
-- ----------------------------
ALTER TABLE "public"."user_sessions" ADD CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table user_spaces
-- ----------------------------
ALTER TABLE "public"."user_spaces" ADD CONSTRAINT "user_spaces_pkey" PRIMARY KEY ("user_id", "space_id");

-- ----------------------------
-- Primary Key structure for table user_team
-- ----------------------------
ALTER TABLE "public"."user_team" ADD CONSTRAINT "user_team_pkey" PRIMARY KEY ("user_id", "team_id");

-- ----------------------------
-- Indexes structure for table users
-- ----------------------------
CREATE INDEX "idx_user_email" ON "public"."users" USING btree (
  "email" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "user_email_key" UNIQUE ("email");
ALTER TABLE "public"."users" ADD CONSTRAINT "uq_user_email" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table audit_log_change
-- ----------------------------
ALTER TABLE "public"."audit_log_change" ADD CONSTRAINT "audit_log_change_audit_id_fkey" FOREIGN KEY ("audit_id") REFERENCES "public"."audit_log" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table brand_embeddings
-- ----------------------------
ALTER TABLE "public"."brand_embeddings" ADD CONSTRAINT "brand_embedding_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table company_brands
-- ----------------------------
ALTER TABLE "public"."company_brands" ADD CONSTRAINT "company_brand_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table company_products
-- ----------------------------
ALTER TABLE "public"."company_products" ADD CONSTRAINT "company_product_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table company_screenshots
-- ----------------------------
ALTER TABLE "public"."company_screenshots" ADD CONSTRAINT "company_screenshot_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table company_ui_archetypes
-- ----------------------------
ALTER TABLE "public"."company_ui_archetypes" ADD CONSTRAINT "company_ui_archetype_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table competitors
-- ----------------------------
ALTER TABLE "public"."competitors" ADD CONSTRAINT "competitor_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table conversation_messages
-- ----------------------------
ALTER TABLE "public"."conversation_messages" ADD CONSTRAINT "conversation_message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table researches
-- ----------------------------
ALTER TABLE "public"."researches" ADD CONSTRAINT "research_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table space_attributes
-- ----------------------------
ALTER TABLE "public"."space_attributes" ADD CONSTRAINT "space_attributes_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "public"."spaces" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table spaces
-- ----------------------------
ALTER TABLE "public"."spaces" ADD CONSTRAINT "spaces_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."spaces" ADD CONSTRAINT "spaces_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."spaces" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table teams
-- ----------------------------
ALTER TABLE "public"."teams" ADD CONSTRAINT "team_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table user_sessions
-- ----------------------------
ALTER TABLE "public"."user_sessions" ADD CONSTRAINT "user_sessions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table user_spaces
-- ----------------------------
ALTER TABLE "public"."user_spaces" ADD CONSTRAINT "user_spaces_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "public"."spaces" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."user_spaces" ADD CONSTRAINT "user_spaces_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table user_team
-- ----------------------------
ALTER TABLE "public"."user_team" ADD CONSTRAINT "user_team_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."user_team" ADD CONSTRAINT "user_team_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
