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

export const frameworkStructures = {
  'next.js': {
    category: 'Framework Structure',
    title: 'Next.js Project Structure',
    content: `
      1. Standard Next.js Structure:
         /app                   # App router, pages and layouts
         /components           # Reusable UI components
         /lib                  # Utility functions, shared logic
         /features            # Feature-based modules
         /types               # TypeScript type definitions
         /styles              # Global styles, CSS modules
         /public              # Static assets
         /tests               # Test files
         
      2. Feature-based Structure (for larger apps):
         /features
           /auth
             /components
             /api
             /hooks
             /utils
           /dashboard
             /components
             /api
             /hooks
           /settings
             /components
             /api
             /hooks
    `,
    tags: ['next.js', 'structure', 'organization']
  },

  'react': {
    category: 'Framework Structure',
    title: 'React Project Structure',
    content: `
      1. Component-Based Structure:
         /src
           /components        # Shared components
           /pages            # Route components
           /hooks            # Custom hooks
           /services         # API calls, external services
           /utils            # Helper functions
           /assets           # Images, fonts, etc
           /styles           # Global styles
           
      2. Feature-Based Structure:
         /src
           /features
             /user
               /components
               /hooks
               /api
               /types
             /product
               /components
               /hooks
               /api
           /shared           # Shared utilities and components
    `,
    tags: ['react', 'structure', 'organization']
  }
};

export const architecturePatterns = {
  modular: {
    category: 'Architecture',
    title: 'Modular Architecture',
    content: `
      1. Benefits:
         - High cohesion, loose coupling
         - Independent deployment
         - Easier maintenance
         - Better team scalability
         
      2. Best Used When:
         - Large application
         - Multiple teams
         - Need for independent deployments
         - Complex domain logic
    `
  },
  // ... other architectures
};
