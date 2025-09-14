# Task Completion Checklist

When completing any coding task, follow these steps:

## 1. Code Quality Checks
- [ ] Code follows TypeScript conventions
- [ ] No TypeScript errors
- [ ] Functions have explicit return types
- [ ] Proper error handling implemented

## 2. Testing
- [ ] Tests written first (TDD)
- [ ] All tests passing
- [ ] No mocked dependencies
- [ ] Coverage for edge cases

## 3. Run Test Suites
```bash
# Frontend tests
cd frontend && npm test

# Backend tests  
cd backend && npm test
```

## 4. Build Verification
```bash
# Frontend build
cd frontend && npm run build

# Backend build
cd backend && npm run build
```

## 5. Documentation
- [ ] Update CLAUDE.md if architectural changes
- [ ] Update relevant documentation if API changes
- [ ] Ensure code is self-documenting

## 6. Git Workflow
- [ ] Stage changes: `git add .`
- [ ] Meaningful commit message
- [ ] Reference issue/feature number if applicable

## 7. Final Checks
- [ ] No console.log statements in production code
- [ ] No commented-out code
- [ ] No hardcoded values that should be configurable
- [ ] Internationalization keys added for new UI text

## Important Notes
- When age >= life expectancy, use 1 year + buffer
- Default age buffer is 0, adjustable 0-10 years
- All times stored/calculated in hours, formatted for display
- Support both Japanese and English languages