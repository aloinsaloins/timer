# Claude Code Context: Parent Time Visualization Timer

## Project Overview
Web application that calculates and visualizes remaining time with parents based on Japanese life expectancy statistics. Helps users appreciate and make conscious decisions about family time.

## Current Feature: 001-1
Building core calculation engine and web interface for parent time visualization.

## Tech Stack
- **Frontend**: React 18, TypeScript 5.x, Vite, React Context API
- **Backend**: Node.js 20.x, Express.js, TypeScript
- **Testing**: Vitest (frontend), Jest (backend)
- **Styling**: CSS Modules + Tailwind CSS
- **i18n**: react-i18next (Japanese/English)

## Project Structure
```
backend/
├── src/
│   ├── models/       # TypeScript interfaces
│   ├── services/     # Business logic
│   ├── lib/
│   │   ├── time-calculator/    # Core calculation library
│   │   └── life-expectancy/    # Life expectancy data
│   └── api/          # Express routes
└── tests/

frontend/
├── src/
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── services/     # API clients
│   └── contexts/     # React Context providers
└── tests/
```

## Key Components

### Core Libraries
1. **time-calculator**: Pure functions for time calculations
   - `calculateRemainingTime(parent, visitPattern): RemainingTime`
   - CLI interface: `npm run cli -- --age 75 --gender male --days 10 --hours 8`

2. **life-expectancy**: Japanese life expectancy data
   - 2023 data: Male 81.09, Female 87.14 years
   - Source: Ministry of Health, Labour and Welfare

### API Endpoints
- `POST /api/calculate` - Calculate remaining time
- `GET /api/life-expectancy` - Get life expectancy data
- `GET/POST /api/preferences` - User preferences

### Data Model
```typescript
interface Parent {
  currentAge: number;
  gender: 'male' | 'female';
  relationship: 'father' | 'mother' | 'other';
}

interface VisitationPattern {
  annualDays: number;  // 0-365
  dailyHours: number;  // 0-24
}

interface TimeCalculation {
  remainingYears: number;
  totalRemainingHours: number;
  formattedOutput: string;
}
```

## Constitutional Principles
1. **TDD Mandatory**: Tests written first, must fail before implementation
2. **Library-First**: Every feature as standalone library with CLI
3. **No Mocks**: Use real dependencies in tests
4. **Simple Direct**: Use frameworks directly, no wrapper classes

## Recent Changes
- Initial project setup with TypeScript configuration
- Created plan.md with web application architecture
- Defined data models and API contracts
- Research completed on Japanese life expectancy data

## Current Task Focus
Implementing Phase 1: Design & Contracts
- ✅ data-model.md created
- ✅ API contracts defined (OpenAPI)
- ✅ quickstart.md for validation
- ⏳ Next: Generate contract tests

## Testing Strategy
1. Contract tests first (API endpoints)
2. Integration tests (user scenarios)
3. E2E tests (full workflows)
4. Unit tests last (implementation details)

## Important Notes
- Calculations use official Japanese life expectancy (MHLW 2023)
- When age >= life expectancy, use 1 year + buffer
- Default age buffer is 0, adjustable 0-10 years
- All times stored/calculated in hours, formatted for display
- Local storage for MVP, backend persistence optional

## Common Commands
```bash
# Development
cd frontend && npm run dev
cd backend && npm run dev

# Testing
npm test           # Run all tests
npm run test:watch # Watch mode
npm run test:contract # Contract tests only

# Build
npm run build      # Production build
npm run preview    # Preview production build
```

## Edge Cases to Handle
1. Parent age equals or exceeds life expectancy
2. User living with parents (365 days/year)
3. Single parent entry (not both required)
4. Invalid inputs (negative, >365 days, >24 hours)
5. Custom life expectancy override

---
*Context for Claude Code. Updated: 2025-09-11*