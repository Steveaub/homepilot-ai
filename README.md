# 🏠 HomePilot AI

**The AI Project Manager for Buying a Home — Without the Agent Pressure**

HomePilot AI is your intelligent, step-by-step homebuying companion. It helps you buy a home without relying on a traditional agent or paying a 6% commission — all while giving you tools to manage every part of the process with confidence.

---

## 🚨 Why Now?

Real estate is in flux. Lawsuits like _Sitzer-Burnett_ are shaking the industry, but buyers still face:

- Pressure to sign with agents
- Hidden commission schemes
- A chaotic, opaque process

**HomePilot is designed for this new era — empowering agent-optional homebuying, with AI-guided execution from search to close.**

---

## 🧠 What It Does

HomePilot uses AI to break down homebuying into manageable tasks — just like project management software.

Key capabilities:

- ✅ **Conversational onboarding** (no forms)
- 📋 **Step-by-step task plans** tailored to your timeline, credit, and location
- 🤖 **AI agents** that:
  - Apply for down payment grants
  - Shop mortgage rates
  - Escalate when agents or sellers ghost you
  - Schedule inspections or title services
- 🔁 **Paste-to-Parse:** paste any listing URL (Zillow, Redfin, etc.) to generate smart next steps
- 📊 **Live workflow dashboard** to track your progress
- ⚖️ **Optional expert escalation** (flat fee)
- 🛠 **Agent Marketplace:** Access specialized agents for financing, inspection, and negotiation tasks

---

## 🧪 Sample API Call

```bash
curl -X POST http://localhost:3000/api/parse-listing \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.zillow.com/homedetails/1329-Polk-St-Hollywood-FL-33019/43333906_zpid/"
  }'
```

```json
{
  "source": "zillow",
  "address": "1329 Polk St, Hollywood, FL 33019",
  "listing": {
    "price": 598000,
    "bedrooms": 3,
    "bathrooms": 2,
    "squareFootage": 1600,
    "lotSize": 7200,
    "yearBuilt": 1990,
    "propertyType": "Single Family",
    "description": "A beautiful single-family home in a quiet neighborhood."
  },
  "nextSteps": [
    "Confirm listing details",
    "Check budget fit",
    "Add to saved listings",
    "Contact listing agent or request tour"
  ]
}
```

---

## 🧱 Tech Stack

- **Frontend:** React (Next.js or Vite)
- **Backend:** Node.js + Supabase (PostgreSQL with RLS)
- **AI Agents:** GitHub Copilot Agents + OpenAI APIs
- **Architecture:** Modular, API-first with MCP Protocol for Copilot context sync
- **Infra Features:** Visual state manager, escalation logic, task-based context sync

---

## 📚 Documentation

Strategic and product design references:

- [Product Requirements Document](./docs/project-specific/prd.md)
- [NYTimes Comment Insights](./docs/project-specific/nytimes-comment-insights.md)
- [Hacker News Buyer Frustrations](./docs/project-specific/hackernews-insights.md)
- [HomePilot vs. Homa Agent Analysis](./docs/project-specific/homepilot-vs-homa-agent.md)
- [Copilot Agent Execution Template](./docs/reusable-templates/copilot-agent-execution-template.md)
- [Multi-Agent Coordination Framework](./docs/reusable-templates/multi-agent-coordination-framework.md)
- [Operations Workflow](./docs/reusable-templates/operations-workflow.md)

---

## 💰 Business Model

- **Freemium:** Core planning tools are free
- **Flat-fee Upsells:** $99–$499 for document review, negotiation, or AI concierge upgrades
- **Referrals:** Trusted vendors (mortgage, inspection, legal)
- **B2B Licensing:** Future SaaS for FSBO platforms and credit unions

---

## ✅ Success Metrics

- Onboarding completion rate
- Task plan generation rate
- Agent feature usage
- Offer letter creation
- Revenue per active buyer (target: $500)

---

## 🛠 Local Dev Setup

```bash
npm install
npm run dev
```

Requires `.env.local` with Supabase and OpenAI credentials.

---

## 🛣 Roadmap Highlights

- [ ] Add real data enrichment (Estated, ATTOM, RentCast)
- [ ] Multi-agent dashboard and task visualizer
- [ ] Offer letter builder + legal doc gen
- [ ] FSBO seller toolkit (Phase 2)
- [ ] Enhanced escalation logic with fallback agents

---

## 👤 Author

Built by [@steveaub](https://www.linkedin.com/in/steveaubourg/) — certified PMP, ex-financial planner, and CS master’s student focused on AI.

> “I’ve built thousands of financial plans, but none ever showed anyone how to buy a home. HomePilot fixes that.”

---

## 🔐 Legal Note

HomePilot AI does not act as a real estate broker or agent. We offer task guidance and access to experts — but you stay in control.
