# Research Findings: Parent Time Visualization Timer

**Feature Branch**: `001-1`  
**Date**: 2025-09-11  
**Status**: Complete

## Executive Summary
Research completed for a web-based application that visualizes remaining time with parents based on Japanese life expectancy statistics. Key decisions include using React with TypeScript for the frontend, Node.js/Express for the backend, and client-side calculations for optimal performance.

## Research Areas Addressed

### 1. Japanese Life Expectancy Data Sources

**Decision**: Use official Ministry of Health, Labour and Welfare (MHLW) statistics  
**Rationale**: 
- Most authoritative source for Japanese life expectancy
- Updated annually with detailed breakdowns by gender
- Current data (2023): Male 81.09 years, Female 87.14 years

**Alternatives Considered**:
- WHO data: Less Japan-specific, delayed updates
- Insurance actuarial tables: Too complex for general users
- Academic studies: Often outdated or limited scope

### 2. Time Visualization Best Practices

**Decision**: Progressive disclosure with multiple visualization formats  
**Rationale**:
- Primary display: Total hours remaining (most impactful)
- Secondary: Years/months/days breakdown
- Visual: Progress bar or hourglass metaphor
- Emotional design: Warm colors, avoid anxiety-inducing elements

**Alternatives Considered**:
- Countdown timer: Too anxiety-inducing
- Calendar view: Less emotionally resonant
- Pure numerical: Lacks visual impact

### 3. React State Management for Calculator Apps

**Decision**: React Context API with useReducer for complex state  
**Rationale**:
- Built-in solution, no additional dependencies
- Perfect for app-wide settings (age buffer, display preferences)
- Component-level useState for form inputs
- Calculations performed on-demand, not stored

**Alternatives Considered**:
- Redux: Overkill for this scope
- Zustand: Unnecessary external dependency
- MobX: Too complex for simple calculations

### 4. Localization Strategy

**Decision**: React-i18next with lazy loading  
**Rationale**:
- Industry standard for React apps
- Supports Japanese and English initially
- Easy to add more languages later
- Lazy loading keeps bundle size small

**Alternatives Considered**:
- Custom solution: Reinventing the wheel
- Format.js: More complex than needed
- Static builds per language: Maintenance overhead

## Technical Recommendations

### Frontend Architecture
```typescript
// Core calculation library (pure functions)
interface TimeCalculation {
  calculateRemainingTime(parent: Parent, visitPattern: VisitPattern): RemainingTime;
  formatTime(time: RemainingTime, format: DisplayFormat): string;
}

// React components structure
- App.tsx (main container with Context)
- components/
  - ParentInput.tsx (age, gender input)
  - VisitPatternInput.tsx (days, hours input)
  - TimeDisplay.tsx (visualization)
  - Settings.tsx (age buffer, display preferences)
```

### Backend Architecture
```typescript
// Minimal API for preferences and life expectancy data
GET  /api/life-expectancy/:year/:gender
POST /api/calculate (optional server-side calculation)
GET  /api/preferences/:userId
POST /api/preferences/:userId
```

### Library Structure
```
backend/src/lib/
├── time-calculator/
│   ├── index.ts (main exports)
│   ├── calculator.ts (core logic)
│   ├── cli.ts (CLI interface)
│   └── __tests__/
└── life-expectancy/
    ├── index.ts
    ├── data.ts (Japanese statistics)
    ├── cli.ts
    └── __tests__/
```

## Implementation Priorities

1. **Core Calculation Engine** (time-calculator library)
   - Pure functions, no dependencies
   - Comprehensive unit tests
   - CLI interface for testing

2. **Life Expectancy Data Module** (life-expectancy library)
   - Hardcoded 2023 data initially
   - API for future updates
   - Gender-specific lookups

3. **React UI Components**
   - Mobile-first responsive design
   - Accessibility (WCAG 2.1 AA)
   - Smooth animations for emotional impact

4. **User Preferences**
   - Local storage for MVP
   - Optional backend sync later
   - Export/import functionality

## Risk Mitigation

### Identified Risks
1. **Emotional sensitivity**: Dealing with parent mortality
   - Mitigation: Warm, supportive UI design; focus on quality time
   
2. **Data accuracy**: Life expectancy is statistical average
   - Mitigation: Clear disclaimers; adjustable age buffer

3. **Cultural differences**: Japanese vs Western perspectives
   - Mitigation: Culturally appropriate messaging via i18n

## Resolved NEEDS CLARIFICATION Items

All items from the feature specification have been addressed:
- ✅ Persistence: Local storage for MVP, optional backend later
- ✅ Real-time countdown: Static calculation, not real-time ticker
- ✅ Multiple parents: Support for both parents, extensible to in-laws

## Next Steps

Proceed to Phase 1: Design & Contracts with:
- Data model definition
- API contract generation
- Test scenario creation
- Quickstart guide preparation

---
*Research completed. All technical decisions made. Ready for design phase.*