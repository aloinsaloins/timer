# Implementation Plan: Parent Time Visualization Timer

**Branch**: `001-1` | **Date**: 2025-09-11 | **Spec**: `/specs/001-1/spec.md`
**Input**: Feature specification from `/specs/001-1/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, or `GEMINI.md` for Gemini CLI).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Create a web application that visualizes remaining time with parents based on Japanese life expectancy statistics. Users input parent ages, annual visit days, and hours spent together to calculate and display the estimated time left together. Built as a modern web application with React frontend and Node.js backend.

## Technical Context
**Language/Version**: TypeScript 5.x / Node.js 20.x  
**Primary Dependencies**: React 18, Express.js, Vite  
**Storage**: Local storage for user preferences (no backend DB needed for MVP)  
**Testing**: Vitest for frontend, Jest for backend  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: web - frontend + backend structure  
**Performance Goals**: <100ms calculation time, instant UI updates  
**Constraints**: Client-side calculation capable, responsive design required  
**Scale/Scope**: Single-user application, ~10 screens/components

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 2 (frontend, backend)
- Using framework directly? Yes (React, Express without wrappers)
- Single data model? Yes (shared types between frontend/backend)
- Avoiding patterns? Yes (no unnecessary patterns)

**Architecture**:
- EVERY feature as library? Yes (calculation logic as library)
- Libraries listed:
  - time-calculator: Core calculation logic for remaining time
  - life-expectancy: Japanese life expectancy data and lookup
- CLI per library: Yes (each library will have CLI interface)
- Library docs: llms.txt format planned? Yes

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor cycle enforced? Yes
- Git commits show tests before implementation? Yes
- Order: Contract→Integration→E2E→Unit strictly followed? Yes
- Real dependencies used? Yes (no mocks)
- Integration tests for: new libraries, contract changes, shared schemas? Yes
- FORBIDDEN: Implementation before test, skipping RED phase - Acknowledged

**Observability**:
- Structured logging included? Yes
- Frontend logs → backend? Yes (error reporting)
- Error context sufficient? Yes

**Versioning**:
- Version number assigned? 1.0.0
- BUILD increments on every change? Yes
- Breaking changes handled? Yes (versioned API)

## Project Structure

### Documentation (this feature)
```
specs/001-1/
├── plan.md              # This file (/plan command output) ✅
├── research.md          # Phase 0 output (/plan command) ✅
├── data-model.md        # Phase 1 output (/plan command) ✅
├── quickstart.md        # Phase 1 output (/plan command) ✅
├── contracts/           # Phase 1 output (/plan command) ✅
│   └── api-spec.yaml    # OpenAPI specification ✅
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   ├── lib/
│   │   ├── time-calculator/
│   │   └── life-expectancy/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

CLAUDE.md                # AI assistant context file ✅
```

**Structure Decision**: Option 2 - Web application (frontend + backend)

## Phase 0: Outline & Research ✅
Research completed successfully with the following findings:

1. **Japanese Life Expectancy Data**: Using MHLW 2023 statistics (Male: 81.09, Female: 87.14)
2. **Time Visualization**: Progressive disclosure with multiple formats
3. **State Management**: React Context API with useReducer
4. **Localization**: react-i18next with lazy loading

**Output**: research.md created with all decisions documented ✅

## Phase 1: Design & Contracts ✅
All design artifacts successfully created:

1. **Data Model** (`data-model.md`): 5 entities defined with validation rules
2. **API Contracts** (`contracts/api-spec.yaml`): 4 endpoints with OpenAPI spec
3. **Test Scenarios** (`quickstart.md`): 6 user scenarios for validation
4. **AI Context** (`CLAUDE.md`): Project context for AI assistants

**Output**: All Phase 1 artifacts created ✅

## Phase 2: Task Planning Approach ✅
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
The /tasks command will generate approximately 25-30 tasks organized in 5 phases:

**Phase A - Foundation** (Tasks 1-8):
- TypeScript configuration for frontend/backend
- Package.json setup with dependencies
- Shared types definition
- Project structure creation

**Phase B - Libraries** (Tasks 9-12):
- time-calculator library + CLI + tests [P]
- life-expectancy library + CLI + tests [P]

**Phase C - Backend** (Tasks 13-18):
- Model implementations
- Contract tests (RED phase)
- API endpoint implementations
- Make tests pass (GREEN phase)

**Phase D - Frontend** (Tasks 19-25):
- React component structure
- Component implementations
- State management
- API integration

**Phase E - Integration** (Tasks 26-30):
- Integration tests from quickstart scenarios
- E2E workflow tests
- Performance validation
- Final quickstart validation

**Ordering Principles**:
- TDD: Tests before implementation
- Dependencies: Models → Services → API → UI
- Parallel markers [P] for independent tasks

**Estimated Output**: 25-30 numbered tasks in tasks.md

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
No violations identified. The design adheres to all constitutional principles.

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - approach described)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none found)

## Execution Summary

The /plan command has successfully completed all required phases:

1. **Phase 0**: Research completed, all technical decisions made
2. **Phase 1**: All design artifacts created:
   - data-model.md (5 entities)
   - contracts/api-spec.yaml (4 endpoints)
   - quickstart.md (6 test scenarios)
   - CLAUDE.md (AI context)
3. **Phase 2**: Task generation approach planned for /tasks command

**Status**: READY FOR /tasks COMMAND

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
*Plan completed: 2025-09-11*