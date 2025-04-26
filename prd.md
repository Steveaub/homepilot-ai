# 🧭 Product Requirements Document: HomePilot AI

## 🧩 Problem

Most homebuyers feel overwhelmed by the process. They rely on agents who may not always act in their best interest, and often miss out on grants, better rates, or negotiation tools. They don’t know the steps — or what’s possible.

---

## 💡 Solution

An AI-powered home buying companion that helps users:

- Understand readiness (credit, income, location, timeline)
- Get a tailored plan with visual steps
- Apply for grants or mortgage pre-approvals
- Submit offers with optional legal review
- Navigate inspections, title, escrow
- Delegate tasks to AI agents
- Escalate if they encounter steering
- Track progress visually

**This MVP focuses on buying only — FSBO seller tools will come later.**

---

## 🔁 Core User Flow

1. User opens app and says “I want to buy a home.”
2. AI chat captures credit, income, location, timeline
3. System builds plan + visual workflow
4. Optional AI agents handle tasks (grant apps, follow-ups)
5. Visual journey map updates in real time
6. Escalation tools if user faces steering or agent pressure

---

## 🧪 MVP Features (Phase 1)

- Chat-style onboarding
- Buyer profile builder
- Plan generation engine
- Visual workflow diagram (UserJourneyMap.tsx)
- Real-time agent feed (AgentStatusFeed.tsx)
- State context for tasks + agents (TaskManagerContext.tsx)
- Offer letter generator (+ legal review upsell)
- Static upgrade buttons (e.g. $99 doc review)

---

## 🤖 Future: AI Agent Marketplace

Agents that handle tasks in parallel:

- **Grant Agent**: auto-fills assistance apps
- **Mortgage Agent**: shops multiple lenders
- **Escalation Agent**: recontacts unresponsive agents
- **Inspection Agent**: schedules services

Agents will display real-time status (e.g. “3 grant apps submitted”).

---

## 🧱 Data Model & Context Sync

We use Supabase with real-time access to:

- Buyer profile
- Task status
- Agent activity

LLMs + UI pull from the same context so everyone stays in sync.

---

## 💸 Monetization

- Free onboarding
- Flat-fee upgrades ($99–$499)
- Referral fees (vendors, lenders)
- SaaS for FSBO and credit unions

---

## ✅ Success Metrics

- Onboarding completion %
- Plan generation rate
- Upsell conversions
- Agent usage
- Revenue per user

---

## 🌠 Long-Term Vision

An AI concierge that:

- Understands your goals
- Plans the journey
- Executes the hard parts
- Saves you $$$
- Puts you in control
