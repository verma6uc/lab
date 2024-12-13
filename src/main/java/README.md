# Creator Labs Backend

The Spring Boot backend for Creator Labs, providing robust API services and AI agent integrations.

## Architecture Overview

### Domain-Driven Design

```
com.creatorlabs/
├── domain/           # Business entities and logic
├── application/      # Use cases and services
├── infrastructure/   # External services, repositories
└── interfaces/       # Controllers, DTOs
```

### Key Components

1. **Core Domains**
   - Project Management
   - User Management
   - AI Agent System
   - Analytics Engine

2. **Infrastructure Layer**
   - Database Access
   - External API Integration
   - Security Services
   - Caching System

3. **Application Services**
   - Business Logic
   - Transaction Management
   - Event Handling
   - Task Scheduling

## Database Schema

### Core Tables

```sql
-- Users and Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id UUID REFERENCES users(id),
    status VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- AI Agents
CREATE TABLE agent_interactions (
    id UUID PRIMARY KEY,
    project_id UUID REFERENCES projects(id),
    agent_type VARCHAR(50),
    interaction_data JSONB,
    created_at TIMESTAMP
);

-- Analytics
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY,
    event_type VARCHAR(100),
    event_data JSONB,
    user_id UUID REFERENCES users(id),
    created_at TIMESTAMP
);
```

## API Documentation

### Authentication

```http
POST /api/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}

Response:
{
    "token": "jwt_token",
    "user": {
        "id": "uuid",
        "email": "user@example.com",
        "role": "USER"
    }
}
```

### Project Management

```http
# Create Project
POST /api/projects
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "New Project",
    "description": "Project description"
}

# Get Project
GET /api/projects/{id}
Authorization: Bearer {token}

# Update Project
PUT /api/projects/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "Updated Name",
    "description": "Updated description"
}

# Delete Project
DELETE /api/projects/{id}
Authorization: Bearer {token}
```

### AI Agent Interactions

```http
# Start Agent Session
POST /api/agents/session
Authorization: Bearer {token}
Content-Type: application/json

{
    "projectId": "uuid",
    "agentType": "RESEARCH"
}

# Get Agent Recommendations
GET /api/agents/{agentId}/recommendations
Authorization: Bearer {token}

# Submit Agent Feedback
POST /api/agents/{agentId}/feedback
Authorization: Bearer {token}
Content-Type: application/json

{
    "feedback": "Feedback text",
    "rating": 5
}
```

## Security Implementation

### JWT Authentication

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().and().csrf().disable()
            .authorizeRequests()
            .antMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .addFilter(new JwtAuthenticationFilter(authenticationManager()))
            .addFilter(new JwtAuthorizationFilter(authenticationManager()));
    }
}
```

### Role-Based Access Control

```java
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin/users")
public List<UserDTO> getAllUsers() {
    // Implementation
}

@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
@GetMapping("/projects")
public List<ProjectDTO> getUserProjects() {
    // Implementation
}
```

## Development Setup

### Prerequisites

- JDK 17+
- Maven 3.8+
- PostgreSQL 13+
- IDE (IntelliJ IDEA recommended)

### Local Setup

1. **Database Setup**
```bash
# Create database
createdb creatorlabs

# Run migrations
mvn flyway:migrate
```

2. **Application Properties**
```properties
# application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/creatorlabs
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

jwt.secret=your_jwt_secret
jwt.expiration=86400000
```

3. **Run Application**
```bash
# Run with Maven
mvn spring-boot:run

# Run tests
mvn test
```

## Testing

### Unit Tests

```java
@SpringBootTest
class UserServiceTest {
    @Autowired
    private UserService userService;
    
    @Test
    void createUser_ValidData_Success() {
        // Test implementation
    }
}
```

### Integration Tests

```java
@SpringBootTest
@AutoConfigureMockMvc
class ProjectControllerTest {
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void createProject_ValidData_Returns201() {
        // Test implementation
    }
}
```

## Performance Optimization

1. **Caching**
```java
@Cacheable(value = "projects", key = "#id")
public ProjectDTO getProject(UUID id) {
    // Implementation
}
```

2. **Pagination**
```java
@GetMapping("/projects")
public Page<ProjectDTO> getProjects(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size
) {
    // Implementation
}
```

## Monitoring and Logging

### Actuator Endpoints

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,info
```

### Logging Configuration

```xml
<logger name="com.creatorlabs" level="INFO">
    <appender-ref ref="CONSOLE"/>
    <appender-ref ref="FILE"/>
</logger>
```

## Deployment

### Docker Setup

```dockerfile
FROM openjdk:17-jdk-slim
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

### CI/CD Pipeline

```yaml
name: Java CI/CD

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up JDK 17
        uses: actions/setup-java@v2
        with:
          java-version: '17'
      - name: Build with Maven
        run: mvn -B package --file pom.xml
```

## Contributing

1. Follow Java code style guidelines
2. Write comprehensive tests
3. Document new features
4. Create detailed pull requests

## Troubleshooting

Common issues and solutions:

1. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check connection strings
   - Validate user permissions

2. **JWT Token Issues**
   - Verify secret key
   - Check token expiration
   - Validate token format

3. **Performance Issues**
   - Enable debug logging
   - Check database queries
   - Monitor memory usage

## Support

For backend support:
- Check logs in `/logs` directory
- Contact backend team
- Review documentation 