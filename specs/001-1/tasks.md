# Tasks: Parent Time Visualization Timer

**Input**: Design documents from `/specs/001-1/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Web app**: `backend/src/`, `frontend/src/`
- All paths below follow the web application structure from plan.md

## Phase 3.1: Setup
- [ ] T001 Create project structure with backend/ and frontend/ directories per plan.md
- [ ] T002 Initialize backend TypeScript project with Node.js 20.x and Express.js
- [ ] T003 Initialize frontend React 18 project with Vite and TypeScript 5.x
- [ ] T004 [P] Configure Jest for backend testing in backend/jest.config.js
- [ ] T005 [P] Configure Vitest for frontend testing in frontend/vite.config.ts
- [ ] T006 [P] Setup ESLint and Prettier for both projects
- [ ] T007 Create shared types in backend/src/models/types.ts for frontend/backend sharing

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

### Contract Tests (from contracts/api-spec.yaml)
- [ ] T008 [P] Contract test POST /api/calculate in backend/tests/contract/test_calculate_post.ts
- [ ] T009 [P] Contract test GET /api/life-expectancy in backend/tests/contract/test_life_expectancy_get.ts
- [ ] T010 [P] Contract test GET /api/preferences in backend/tests/contract/test_preferences_get.ts
- [ ] T011 [P] Contract test POST /api/preferences in backend/tests/contract/test_preferences_post.ts

### Integration Tests (from quickstart.md scenarios)
- [ ] T012 [P] Integration test: First-time user setup with both parents in backend/tests/integration/test_first_time_setup.ts
- [ ] T013 [P] Integration test: Parent exceeding life expectancy in backend/tests/integration/test_exceeding_life_expectancy.ts
- [ ] T014 [P] Integration test: Age buffer adjustment in backend/tests/integration/test_age_buffer.ts
- [ ] T015 [P] Integration test: Single parent entry in backend/tests/integration/test_single_parent.ts
- [ ] T016 [P] Frontend component test: ParentInput form validation in frontend/tests/components/test_parent_input.tsx
- [ ] T017 [P] Frontend component test: TimeDisplay visualization in frontend/tests/components/test_time_display.tsx

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### Libraries (Core Business Logic)
- [ ] T018 [P] Create time-calculator library in backend/src/lib/time-calculator/index.ts with calculateRemainingTime function
- [ ] T019 [P] Create time-calculator CLI in backend/src/lib/time-calculator/cli.ts
- [ ] T020 [P] Create life-expectancy library in backend/src/lib/life-expectancy/index.ts with 2023 MHLW data
- [ ] T021 [P] Create life-expectancy CLI in backend/src/lib/life-expectancy/cli.ts

### Backend Models (from data-model.md entities)
- [ ] T022 [P] Parent model interface in backend/src/models/parent.ts
- [ ] T023 [P] VisitationPattern model interface in backend/src/models/visitation-pattern.ts
- [ ] T024 [P] TimeCalculation model interface in backend/src/models/time-calculation.ts
- [ ] T025 [P] UserPreferences model interface in backend/src/models/user-preferences.ts
- [ ] T026 [P] LifeExpectancyData model interface in backend/src/models/life-expectancy-data.ts

### Backend Services
- [ ] T027 Create CalculationService in backend/src/services/calculation-service.ts using time-calculator library
- [ ] T028 Create LifeExpectancyService in backend/src/services/life-expectancy-service.ts using life-expectancy library
- [ ] T029 Create PreferencesService in backend/src/services/preferences-service.ts for local storage

### Backend API Endpoints (from contracts/api-spec.yaml)
- [ ] T030 Implement POST /api/calculate endpoint in backend/src/api/calculate.ts
- [ ] T031 Implement GET /api/life-expectancy endpoint in backend/src/api/life-expectancy.ts
- [ ] T032 Implement GET /api/preferences endpoint in backend/src/api/preferences.ts
- [ ] T033 Implement POST /api/preferences endpoint in backend/src/api/preferences.ts
- [ ] T034 Setup Express router and middleware in backend/src/app.ts

### Frontend Components
- [ ] T035 [P] Create ParentInput component in frontend/src/components/ParentInput.tsx
- [ ] T036 [P] Create VisitPatternInput component in frontend/src/components/VisitPatternInput.tsx
- [ ] T037 [P] Create TimeDisplay component in frontend/src/components/TimeDisplay.tsx
- [ ] T038 [P] Create Settings component in frontend/src/components/Settings.tsx
- [ ] T039 Create App component with React Context in frontend/src/App.tsx

### Frontend Services
- [ ] T040 [P] Create API client service in frontend/src/services/api-client.ts
- [ ] T041 [P] Create calculation service in frontend/src/services/calculation-service.ts
- [ ] T042 [P] Create local storage service in frontend/src/services/storage-service.ts

### Frontend State Management
- [ ] T043 Create AppContext with useReducer in frontend/src/contexts/AppContext.tsx
- [ ] T044 Create calculation reducer in frontend/src/contexts/calculation-reducer.ts
- [ ] T045 Create preferences reducer in frontend/src/contexts/preferences-reducer.ts

## Phase 3.4: Integration
- [ ] T046 Setup CORS middleware in backend/src/middleware/cors.ts
- [ ] T047 Add request/response logging middleware in backend/src/middleware/logging.ts
- [ ] T048 Add input validation middleware in backend/src/middleware/validation.ts
- [ ] T049 Setup error handling middleware in backend/src/middleware/error-handler.ts
- [ ] T050 Configure i18n with react-i18next in frontend/src/i18n/config.ts
- [ ] T051 [P] Create Japanese translations in frontend/src/i18n/locales/ja.json
- [ ] T052 [P] Create English translations in frontend/src/i18n/locales/en.json
- [ ] T053 Setup frontend routing with React Router in frontend/src/routes.tsx
- [ ] T054 Implement responsive CSS with Tailwind in frontend/src/styles/

## Phase 3.5: Polish
- [ ] T055 [P] Unit tests for time-calculator functions in backend/src/lib/time-calculator/__tests__/
- [ ] T056 [P] Unit tests for life-expectancy functions in backend/src/lib/life-expectancy/__tests__/
- [ ] T057 [P] Unit tests for validation logic in backend/tests/unit/test_validation.ts
- [ ] T058 Performance tests: Ensure <100ms calculation time in backend/tests/performance/
- [ ] T059 E2E test: Complete user flow in tests/e2e/test_complete_flow.ts
- [ ] T060 [P] Add TypeScript strict mode checks to both projects
- [ ] T061 [P] Add accessibility (WCAG 2.1 AA) compliance to frontend components
- [ ] T062 Run all quickstart.md validation scenarios
- [ ] T063 Update CLAUDE.md with implementation details

## Dependencies
- Setup (T001-T007) must complete first
- Tests (T008-T017) before ANY implementation (T018-T045)
- Libraries (T018-T021) before services (T027-T029)
- Models (T022-T026) before services
- Services before endpoints (T030-T034)
- Backend before frontend API integration (T040)
- Components (T035-T039) can parallel with backend
- Integration (T046-T054) after core implementation
- Polish (T055-T063) last

## Parallel Execution Examples

### Setup Phase
```bash
# Launch T004-T006 together (different projects):
Task: "Configure Jest for backend testing in backend/jest.config.js"
Task: "Configure Vitest for frontend testing in frontend/vite.config.ts"
Task: "Setup ESLint and Prettier for both projects"
```

### Test Phase (TDD)
```bash
# Launch all contract tests T008-T011 together:
Task: "Contract test POST /api/calculate in backend/tests/contract/test_calculate_post.ts"
Task: "Contract test GET /api/life-expectancy in backend/tests/contract/test_life_expectancy_get.ts"
Task: "Contract test GET /api/preferences in backend/tests/contract/test_preferences_get.ts"
Task: "Contract test POST /api/preferences in backend/tests/contract/test_preferences_post.ts"

# Launch all integration tests T012-T017 together:
Task: "Integration test: First-time user setup with both parents"
Task: "Integration test: Parent exceeding life expectancy"
Task: "Integration test: Age buffer adjustment"
Task: "Integration test: Single parent entry"
Task: "Frontend component test: ParentInput form validation"
Task: "Frontend component test: TimeDisplay visualization"
```

### Core Implementation Phase
```bash
# Launch libraries T018-T021 together:
Task: "Create time-calculator library with calculateRemainingTime function"
Task: "Create time-calculator CLI"
Task: "Create life-expectancy library with 2023 MHLW data"
Task: "Create life-expectancy CLI"

# Launch all models T022-T026 together:
Task: "Parent model interface in backend/src/models/parent.ts"
Task: "VisitationPattern model interface in backend/src/models/visitation-pattern.ts"
Task: "TimeCalculation model interface in backend/src/models/time-calculation.ts"
Task: "UserPreferences model interface in backend/src/models/user-preferences.ts"
Task: "LifeExpectancyData model interface in backend/src/models/life-expectancy-data.ts"

# Launch frontend components T035-T038 together:
Task: "Create ParentInput component"
Task: "Create VisitPatternInput component"
Task: "Create TimeDisplay component"
Task: "Create Settings component"
```

## Notes
- [P] tasks operate on different files, can run simultaneously
- CRITICAL: Verify ALL tests fail before implementing (RED phase of TDD)
- Commit after each task completes successfully
- Run tests continuously to verify GREEN phase
- Age buffer default is 0, adjustable 0-10 years
- Use official MHLW 2023 data: Male 81.09, Female 87.14

## Validation Checklist
*GATE: Must pass before execution*

- [x] All 4 API endpoints have contract tests (T008-T011)
- [x] All 5 entities have model tasks (T022-T026)
- [x] All 6 quickstart scenarios have tests (T012-T017)
- [x] All tests come before implementation (T008-T017 before T018-T045)
- [x] Parallel tasks operate on different files
- [x] Each task specifies exact file path
- [x] No [P] tasks modify the same file

---
*Tasks generated from design documents. Ready for execution.*
*Total tasks: 63*
*Estimated completion: 2-3 days with parallel execution*