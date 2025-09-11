# Quickstart Guide: Parent Time Visualization Timer

**Feature Branch**: `001-1`  
**Date**: 2025-09-11  
**Purpose**: Validate the implementation through user scenarios

## Prerequisites

- Node.js 20.x or higher installed
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Terminal/Command prompt access

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd timer

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Starting the Application

### Development Mode

```bash
# Terminal 1: Start backend server
cd backend
npm run dev
# Server starts at http://localhost:3000

# Terminal 2: Start frontend development server
cd frontend
npm run dev
# Frontend starts at http://localhost:5173
```

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd ../backend
npm run build

# Start production server
npm start
# Application available at http://localhost:3000
```

## Test Scenarios

### Scenario 1: First-time User Setup
**Goal**: Calculate remaining time with both parents

1. Open application in browser: `http://localhost:5173`
2. You should see the welcome screen with "Parent Time Calculator"
3. Click "Get Started" or "Add Parent"

4. **Add Father's Information**:
   - Relationship: Select "Father"
   - Current Age: Enter `75`
   - Gender: Select "Male"
   - Click "Next"

5. **Set Visitation Pattern for Father**:
   - Annual Days Together: Enter `10`
   - Hours per Day: Enter `8`
   - Living Together: Leave unchecked
   - Click "Calculate"

6. **Verify Calculation**:
   - Should display: ~480 hours remaining (approximately)
   - Calculation: (81.09 - 75) × 10 days × 8 hours ≈ 487 hours

7. **Add Mother's Information**:
   - Click "Add Another Parent"
   - Relationship: Select "Mother"
   - Current Age: Enter `72`
   - Gender: Select "Female"
   - Annual Days: Enter `10`
   - Hours per Day: Enter `8`
   - Click "Calculate"

8. **Verify Both Calculations Display**:
   - Father: ~480 hours
   - Mother: ~1,200 hours
   - Total visualization should show combined time

### Scenario 2: Parent Exceeding Life Expectancy
**Goal**: Verify system handles age >= life expectancy correctly

1. Click "Add Parent" or edit existing
2. Enter parent information:
   - Current Age: `85` (exceeds male life expectancy of 81.09)
   - Gender: Male
   - Annual Days: `20`
   - Hours per Day: `6`

3. **Verify Calculation**:
   - Should show: 120 hours (1 year × 20 days × 6 hours)
   - System adds 1 year when age exceeds life expectancy

### Scenario 3: Adjusting Age Buffer
**Goal**: Test preference customization

1. Click Settings icon (gear) or "Preferences"
2. Find "Age Buffer" setting
3. Change from `0` to `2` years
4. Click "Save" or "Apply"

5. **Verify Recalculation**:
   - All calculations should update
   - Example: 75-year-old father now shows:
     - (81.09 - 75 + 2) × 10 × 8 ≈ 647 hours

### Scenario 4: Single Parent Entry
**Goal**: Ensure system works with only one parent

1. Start fresh or clear existing data
2. Add only mother's information:
   - Age: `70`
   - Gender: Female
   - Annual Days: `30`
   - Hours: `10`

3. **Verify**:
   - System calculates without requiring second parent
   - Shows: (87.14 - 70) × 30 × 10 ≈ 5,142 hours

### Scenario 5: Display Format Changes
**Goal**: Test different visualization options

1. Access Settings/Preferences
2. Change "Display Format":
   - Try "Hours Only": Shows total hours
   - Try "Days and Hours": Shows days + remaining hours
   - Try "Years, Months, Days": Full breakdown
   - Try "Progressive": Auto-selects best format

3. **Verify** each format displays correctly

### Scenario 6: Language Switching
**Goal**: Test localization

1. Find language selector (flag icon or dropdown)
2. Switch from English to Japanese (日本語)
3. **Verify**:
   - All UI text changes to Japanese
   - Numbers remain in appropriate format
   - Calculations unchanged

4. Switch back to English
5. **Verify** everything returns to English

## Validation Checklist

### Functional Requirements
- [ ] FR-001: Can input each parent's age separately
- [ ] FR-002: Can input annual days (0-365)
- [ ] FR-003: Can input daily hours (0-24)
- [ ] FR-004: Uses Japanese life expectancy (M: 81.09, F: 87.14)
- [ ] FR-005: Calculates correctly when age < life expectancy
- [ ] FR-006: Uses 1 year when age >= life expectancy
- [ ] FR-007: Multiplies years × days × hours correctly
- [ ] FR-008: Can adjust age buffer setting
- [ ] FR-009: Displays in meaningful visual format
- [ ] FR-013: Handles single parent entry
- [ ] FR-014: Validates inputs (positive, reasonable values)

### User Experience
- [ ] Responsive on mobile devices
- [ ] Clear error messages for invalid input
- [ ] Smooth transitions between screens
- [ ] Emotional design (warm, not anxiety-inducing)
- [ ] Data persists on page refresh (local storage)

### Performance
- [ ] Calculations complete in <100ms
- [ ] UI updates instantly on input change
- [ ] No lag when switching between parents
- [ ] Smooth animations

## Command-Line Testing

### Test Calculation Library

```bash
cd backend/src/lib/time-calculator
npm run cli -- --age 75 --gender male --days 10 --hours 8
# Expected output: 487.2 hours remaining

npm run cli -- --age 85 --gender male --days 20 --hours 6 --buffer 1
# Expected output: 240 hours remaining (2 years × 20 × 6)
```

### Test Life Expectancy Library

```bash
cd backend/src/lib/life-expectancy
npm run cli -- --gender male --year 2023
# Expected output: 81.09 years

npm run cli -- --gender female --year 2023
# Expected output: 87.14 years
```

## Troubleshooting

### Common Issues

1. **"Cannot connect to backend"**
   - Ensure backend is running on port 3000
   - Check CORS settings in backend
   - Verify frontend proxy configuration

2. **"Calculations seem wrong"**
   - Check age buffer setting (default should be 0)
   - Verify correct gender selected for life expectancy
   - Ensure annual days ≤ 365

3. **"Data lost on refresh"**
   - Check browser local storage is enabled
   - Look for `ptvt_*` keys in DevTools > Application > Local Storage

4. **"Japanese text showing as squares"**
   - Ensure browser has Japanese fonts installed
   - Try different browser

## Success Criteria

The implementation is considered successful when:

1. ✅ All test scenarios pass without errors
2. ✅ All functional requirements validated
3. ✅ Performance targets met (<100ms calculations)
4. ✅ UI is responsive and emotionally appropriate
5. ✅ Data persists correctly
6. ✅ Both languages work properly
7. ✅ CLI tools function correctly

---
*Use this guide to validate the implementation meets all requirements.*