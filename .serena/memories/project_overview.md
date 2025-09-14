# Parent Time Visualization Timer (PTVT)

## Project Purpose
Web application that calculates and visualizes remaining time with parents based on Japanese life expectancy statistics. Helps users appreciate and make conscious decisions about family time.

## Tech Stack
### Frontend
- React 18 with TypeScript 5.x
- Vite as build tool
- React Context API for state management
- react-i18next for internationalization (Japanese/English)
- CSS Modules + Tailwind CSS for styling
- Vitest for testing

### Backend
- Node.js 20.x with Express.js
- TypeScript
- Jest for testing

## Project Structure
```
timer/
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API clients
│   │   ├── contexts/     # React Context providers
│   │   ├── lib/          # Core libraries (timeCalculator, lifeExpectancy)
│   │   └── i18n/         # Internationalization config
│   └── tests/
├── backend/
│   ├── src/
│   │   ├── models/       # TypeScript interfaces
│   │   ├── services/     # Business logic
│   │   ├── lib/
│   │   │   ├── time-calculator/    # Core calculation library
│   │   │   └── life-expectancy/    # Life expectancy data
│   │   └── api/          # Express routes
│   └── tests/
├── specs/                # Specifications
├── scripts/              # Build and utility scripts
└── templates/            # Project templates
```

## Key Features
- Calculate remaining time with parents based on life expectancy
- Support for Japanese and English languages
- Visual representation of time remaining
- User preferences storage
- Japanese life expectancy data (2023): Male 81.09, Female 87.14 years

## Current Development Branch
001-1: Building core calculation engine and web interface