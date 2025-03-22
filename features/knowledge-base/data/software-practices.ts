import type { Practice } from '../stores/knowledge-store';

export const defaultPractices: Practice[] = [
  {
    id: 'code-organization',
    category: 'Code Structure',
    title: 'Code Organization',
    content: `
      1. Follow a clear folder structure:
         - src/
           - components/
           - features/
           - lib/
           - types/
           - utils/
      2. Keep files focused and single-responsibility
      3. Use consistent naming conventions
      4. Group related functionality together
    `,
    tags: ['structure', 'organization', 'architecture']
  },
  {
    id: 'documentation',
    category: 'Documentation',
    title: 'Documentation Standards',
    content: `
      1. Always include:
         - README.md with project overview
         - Setup instructions
         - API documentation
         - Environment requirements
      2. Use JSDoc for function documentation
      3. Keep documentation up-to-date
      4. Include examples for complex features
    `,
    tags: ['documentation', 'readme', 'jsdoc']
  },
  {
    id: 'code-standards',
    category: 'Code Quality',
    title: 'Coding Standards',
    content: `
      1. Naming Conventions:
         - Use meaningful and descriptive names
         - PascalCase for components and types
         - camelCase for variables and functions
         - UPPER_CASE for constants
      
      2. Code Commenting:
         - Comment complex logic and business rules
         - Use JSDoc for public APIs
         - Keep comments up to date
         - Remove commented-out code
      
      3. Error Handling:
         - Use try/catch blocks appropriately
         - Create custom error types
         - Log errors with context
         - Provide user-friendly error messages
      
      4. Testing:
         - Write unit tests for business logic
         - Integration tests for API endpoints
         - E2E tests for critical flows
         - Maintain 70%+ coverage
    `,
    tags: ['standards', 'quality', 'naming', 'testing']
  },
  {
    id: 'security-practices',
    category: 'Security',
    title: 'Security Best Practices',
    content: `
      1. Authentication:
         - Use secure authentication methods
         - Implement proper session management
         - Rate limit authentication attempts
         - Secure password storage with bcrypt
      
      2. Data Protection:
         - Encrypt sensitive data
         - Use HTTPS everywhere
         - Implement CORS properly
         - Input validation and sanitization
      
      3. API Security:
         - Use JWT or similar token system
         - Validate all inputs
         - Implement rate limiting
         - Security headers (HSTS, CSP)
    `,
    tags: ['security', 'authentication', 'api', 'encryption']
  }
];
