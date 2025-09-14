# Code Style and Conventions

## TypeScript Conventions
- Use TypeScript 5.x strict mode
- Prefer interfaces over type aliases for object types
- Use explicit return types for functions
- Use const for immutable values, let for mutable

## Naming Conventions
- **Files**: camelCase for .ts/.tsx files (e.g., timeCalculator.ts)
- **Components**: PascalCase for React components (e.g., ParentForm.tsx)
- **Functions**: camelCase (e.g., calculateRemainingTime)
- **Interfaces**: PascalCase with 'I' prefix avoided (e.g., Parent, not IParent)
- **Constants**: UPPER_SNAKE_CASE for true constants

## Code Organization
- Pure functions in lib/ directories
- React components in components/
- Page-level components in pages/
- API communication in services/
- Shared types in models/

## Function Style
```typescript
// Explicit return types
export function calculateRemainingTime(params: CalculateParams): {
  remainingYears: number;
  totalRemainingDays: number;
  totalRemainingHours: number;
} {
  // Implementation
}
```

## Import Style
- Use ES6 module imports
- Group imports: React > third-party > local
- Use absolute imports where configured

## Testing Principles
1. **TDD Mandatory**: Tests written first, must fail before implementation
2. **No Mocks**: Use real dependencies in tests
3. **Contract tests first** for API endpoints
4. **Integration tests** for user scenarios
5. **Unit tests last** for implementation details

## React Best Practices
- Functional components only (no class components)
- Use hooks for state and effects
- React Context API for global state
- Props interfaces defined inline or above component

## Error Handling
- Use try-catch for async operations
- Return meaningful error messages
- Validate inputs at boundaries

## Comments
- Minimal comments - code should be self-documenting
- Use JSDoc for public APIs when necessary
- No commented-out code in commits