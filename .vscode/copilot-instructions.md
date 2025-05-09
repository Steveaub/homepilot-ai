# 🧠 GitHub Copilot Instructions — HomePilot AI

## SYSTEM OVERVIEW

HomePilot AI is an AI-powered assistant that guides users through the homebuying process without relying on traditional real estate agents. It breaks the process into dynamic tasks and modular agent execution, with strong support for visual workflows, Supabase-backed state, and LLM-powered automation.

---

## PROJECT ARCHITECTURE

- **Frontend**: React 18+, App Router (Next.js) + TailwindCSS, Vite-style tooling
- **Backend**: Node.js (Express), Supabase (PostgreSQL, RLS-enforced)
- **Auth**: Supabase Auth
- **AI Stack**: Modular agent system using OpenAI APIs and structured task templates
- **APIs**: REST endpoints for listing parsing, enrichment, agent triggers
- **Third-party data**: Scrapeak (live), Estated, ATTOM, and RentCast (planned)

---

## PRIME DIRECTIVE

Copilot operates in Agent Mode and may update multiple files to achieve the intended outcome.  
Follow the **Copilot Agent Execution Template** logic:

- Focus on **user-defined behavior**, not specific file/method names.
- Maintain **clarity** by commenting on what is changing and why.
- Ensure that logic, state, and UI remain in sync across modules.
- All DB access must be RLS-compliant and secure.
- Use outcome-first edits — enable Copilot to build forward from intent.

---

## STATE MANAGEMENT

- Global task + offer state is stored in **React Context** (e.g. `OfferContext.tsx`)
- UI interactions use local `useState`/`useEffect` patterns
- Persistent offer/task state is stored in `localStorage` and/or Supabase
- Agents update the visual workflow and task state in real time

---

## AI AGENT EXECUTION

Agents follow the pattern in `copilot-agent-execution-template.md`. Do not use open-ended LLM prompts.

### Agents:
- `GrantAgent`: autofills financial assistance forms
- `MortgageAgent`: shops lender options and submits pre-approvals
- `InspectionAgent`: schedules inspectors, logs findings
- `EscalationAgent`: follows up when users face ghosting or steering

### Agent Rules:
- Must operate on structured task definitions
- Update visual workflow status (`in-progress`, `complete`, `blocked`)
- Log actions and trigger escalation pathways as needed
- Escalate legal issues only with user opt-in

---

## DATA & SECURITY

- Supabase is the single source of truth for buyer profiles, offers, agent actions
- All database queries must be parameterized and comply with RLS policies
- No direct SQL or client-side schema assumptions
- Follow **principle of least privilege** for roles and access

---

## UI & UX PRINCIPLES

- Visual journey map is central — users see step-by-step task progress
- Agent actions update feed and progress map in real time
- Complex actions must include reassurance and context
- Accessibility: WCAG 2.1 AA minimum, semantic HTML, ARIA support, alt text, dark mode

---

## NAMING & STRUCTURE

- All core logic and components use **TypeScript-first** patterns
- Modular design — each agent/service is self-contained
- Prefer clarity over cleverness in file and function names
- Folder structure:

project-root/
├── src/
│ ├── components/
│ ├── contexts/
│ ├── agents/
│ ├── services/
│ ├── parsers/
│ ├── types/
│ └── utils/
├── public/
├── docs/
├── tests/
│ ├── agents/
│ ├── utils/
│ └── integrations/
├── .vscode/
│ └── copilot-instructions.md


---

## MODERN STANDARDS (2025+)

- Use ES2020+ syntax: async/await, optional chaining, nullish coalescing
- Avoid `var`, legacy callbacks, or jQuery
- Only use React functional components (no classes)
- TailwindCSS is required for layout/styling — no inline styles
- All OpenAI calls must follow structured task schema (not freestyle prompts)
- Prefer composable, testable, and secure logic in all agents

---

## ✅ TESTING GUIDELINES

- Use **Vitest** or **Jest** for unit testing.
- Use **React Testing Library** for UI/component tests.
- All agents must have test coverage for:
  - success/failure scenarios
  - retries/fallbacks
  - integration with Supabase
- Include mocks for OpenAI and Scrapeak API calls
- Use `.test.ts` or `.spec.tsx` file extensions
- Place all tests under `/tests/` (mirrored structure to `/src/`)
- Use `npm run test` or `vitest watch` for local runs
- Include snapshot tests for visual workflow state when practical

---

## ✅ CI/CD PIPELINE RULES

- Use GitHub Actions for CI pipelines
- Run tests on push to `main` and all PRs
- Block merges if coverage < 90% on `/src/agents` and `/src/contexts`
- Use `pnpm build` or `npm run build` to test compile integrity
- Lint all changes using `eslint` and `prettier` with strict mode enabled
- Automatically deploy preview builds (e.g., to Vercel or Netlify)
- Secrets (e.g., Supabase, OpenAI keys) must be set in GitHub Secrets — never hardcoded

---

## ✅ DO

- Align all logic with task-based execution
- Keep state, agents, and UI in sync
- Write code that is modular, testable, and secure
- Ensure clear escalation, audit logging, and user visibility

## 🛑 DO NOT

- Mix business logic inside UI layers
- Expose raw DB queries or bypass RLS
- Generate code that resembles or implies legal/brokerage advice
- Scaffold UI or API handlers without behavior intent

---
