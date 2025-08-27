# Instructions

> **⚠️ MACHINE CONSUMPTION ONLY** ⚠️
> 
> This instructions file is designed for AI assistants and automated tools to produce comprehensive and awesome code solutions in this repository. It contains detailed guidelines, standards, and specifications that should be followed when developing features, writing tests, and maintaining code quality.

## Code Formatting & Style
- Use consistent indentation (2 spaces for JavaScript/JSX)
- Follow ESLint and Prettier configurations if present
- Use meaningful variable and function names
- Prefer const/let over var
- Use arrow functions for consistency
- Add semicolons at the end of statements
- Use single quotes for strings unless double quotes are required
- Keep lines under 80-100 characters when possible

## Documentation Standards
- Add JSDoc comments for all functions and components
- Include parameter descriptions, return types, and examples
- Document complex business logic with inline comments
- Update README.md with setup and usage instructions
- Add component prop documentation using PropTypes or TypeScript
- Include usage examples in component documentation

## Testing Requirements
- Create unit tests for all utility functions
- Write component tests using React Testing Library
- Test user interactions and component behavior
- Aim for at least 80% code coverage
- Mock external dependencies appropriately
- Test error handling and edge cases
- Use descriptive test names that explain the expected behavior

## Code Quality & Best Practices
- Follow React best practices (hooks, functional components)
- Implement proper error boundaries
- Use appropriate state management patterns
- Optimize performance (memo, useMemo, useCallback when needed)
- Implement accessibility features (ARIA labels, keyboard navigation)
- Follow DRY principles and avoid code duplication
- Use TypeScript when possible for better type safety

## Project Structure
- Organize files logically by feature or functionality
- Keep components small and focused on single responsibilities
- Separate business logic from UI components
- Use consistent file naming conventions
- Group related files in appropriate directories

## Security & Performance
- Sanitize user inputs
- Implement proper authentication and authorization
- Use environment variables for sensitive configuration
- Optimize bundle size and loading performance
- Implement lazy loading for routes and components
- Use proper caching strategies

## Git & Version Control
- Write clear, descriptive commit messages
- Use conventional commit format when possible
- Create feature branches for new development
- Keep commits atomic and focused
- Update package.json and dependencies appropriately

## When Proposing Solutions
- Explain the reasoning behind your approach
- Consider multiple solutions and their trade-offs
- Provide code examples with explanations
- Consider backward compatibility and migration paths
- Suggest testing strategies for the proposed solution
- Include performance and security considerations

## Additional Guidelines
- Always validate user inputs
- Implement proper error handling
- Consider mobile responsiveness
- Follow accessibility guidelines (WCAG)
- Use semantic HTML elements
- Implement proper loading states
- Add meaningful error messages for users

## Specifications Logging & Execution

### Specifications File Management
- **File Location**: Create and maintain a `specifications.md` file in the root directory
- **Purpose**: Log all development specifications, requirements, and implementation details for future reference and re-execution

### When Adding New Specifications
1. **Create the specifications file** if it doesn't exist
2. **Add a new entry** with the following format:
   ```
   ## [Feature/Component Name] - [Date]
   
   **Description**: Brief description of what needs to be implemented
   
   **Requirements**:
   - [ ] Requirement 1
   - [ ] Requirement 2
   - [ ] Requirement 3
   
   **Technical Details**:
   - Component structure
   - State management approach
   - API integrations
   - Performance considerations
   
   **Testing Strategy**:
   - Unit test coverage
   - Integration test scenarios
   - User acceptance criteria
   
   **Dependencies**:
   - External packages
   - Internal components
   - Environment requirements
   
   **Implementation Notes**:
   - Key decisions made
   - Alternative approaches considered
   - Performance optimizations applied
   
   **Status**: [Not Started | In Progress | Completed | Testing | Deployed]
   ```

### Specifications File Structure
- **Chronological Order**: Newest specifications at the top
- **Status Tracking**: Update status as work progresses
- **Cross-References**: Link related specifications and components
- **Version History**: Include commit hashes and deployment information

### Execution Guidelines
- **Reference First**: Always check existing specifications before starting new work
- **Update Status**: Keep specifications current as work progresses
- **Document Decisions**: Record important technical decisions and their rationale
- **Link Implementation**: Connect specifications to actual code commits
- **Review & Refine**: Periodically review and update specifications for accuracy

### Benefits of Specifications Logging
- **Reusability**: Execute similar features consistently
- **Knowledge Transfer**: New team members can understand implementation patterns
- **Quality Assurance**: Ensure all requirements are met systematically
- **Maintenance**: Track what was built and why decisions were made
- **Scalability**: Build upon previous work with clear documentation
