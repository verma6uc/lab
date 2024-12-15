# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.2] - 2024-03-20

### Added
- Database-aligned TypeScript enums for better type safety
  - UserRole (SUPERADMIN, CREATOR, USER)
  - UserStatus (ACTIVE, INACTIVE, PENDING)
  - BrowserType, DeviceType, OSType
  - SessionStatus and SpaceType
  - Industry classifications
- New system entities and interfaces
  - AuditLog and AuditLogChange for system auditing
  - VectorData and BrandEmbedding for AI/ML features
  - CompanyScreenshot for media management
  - Space for organizational structure
- Timestamp tracking (createdAt, updatedAt) across all entities
- Location tracking in Session interface
- Enhanced API response types with timestamps

### Changed
- Updated Company interface with proper Industry enum
- Improved Session interface with proper type enums
- Enhanced User interface with role and status enums
- Standardized ID fields and relationships across entities
- Refined type definitions for better type safety

### Removed
- Deprecated string-based enums in favor of proper TypeScript enums
- Redundant interface definitions
- Legacy type definitions

## [0.0.1] - 2024-03-19

### Added
- Login page with form validation and error handling
- Authentication service with JWT token management
- Protected routes and authentication guards
- Environment configuration with Vite
- Sign In/Sign Out button in navigation header
- Mobile-responsive authentication UI
- Axios interceptors for auth headers
- User session management

### Changed
- Updated navigation bar with authentication state
- Improved routing configuration with auth protection
- Enhanced environment variable handling
- Updated project structure for better organization

### Security
- Added JWT token handling
- Implemented secure authentication flow
- Protected sensitive routes
- Added environment variable protection
- Secured API endpoints with authentication headers