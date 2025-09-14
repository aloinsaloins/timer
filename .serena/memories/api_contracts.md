# API Contracts and Data Models

## Core Data Models

### Parent Interface
```typescript
interface Parent {
  currentAge: number;
  gender: 'male' | 'female';
  relationship: 'father' | 'mother' | 'other';
}
```

### VisitationPattern Interface
```typescript
interface VisitationPattern {
  annualDays: number;  // 0-365
  dailyHours: number;  // 0-24
}
```

### TimeCalculation Interface
```typescript
interface TimeCalculation {
  remainingYears: number;
  totalRemainingHours: number;
  formattedOutput: string;
}
```

## API Endpoints

### POST /api/calculate
Calculate remaining time with parents
- Request: Parent + VisitationPattern
- Response: TimeCalculation

### GET /api/life-expectancy
Get Japanese life expectancy data
- Response: { male: 81.09, female: 87.14 }

### GET /api/preferences
Get user preferences
- Response: User preference object

### POST /api/preferences
Save user preferences
- Request: Preference object
- Response: Success/failure status

## Calculation Logic
- Use official Japanese life expectancy (MHLW 2023)
- Male: 81.09 years
- Female: 87.14 years
- When current age >= life expectancy: use 1 year + buffer
- Buffer range: 0-10 years (default: 0)

## CLI Interface
```bash
npm run cli -- --age 75 --gender male --days 10 --hours 8
```