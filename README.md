# homepilot-ai

# 🏠 HomePilot AI

**HomePilot AI** is your intelligent home buying companion — designed to guide users through the home buying journey without needing a traditional real estate agent.

Built with modern AI tools like GitHub Copilot Agents, Supabase, and LLMs, HomePilot AI empowers buyers to manage every step of the process: from pre-qualification to closing — agent optional, empowerment by default.

---

## 🚀 Features

- ✅ Conversational onboarding (no forms!)
- 📋 Step-by-step home buying checklists
- 🧠 AI-guided decision making and document drafting
- 🤖 AI agents that can:
  - Search for homes
  - Fill out first-time buyer grant applications
  - Negotiate and follow up with sellers or agents
- 📊 Visual workflow and task tracker
- 🔐 Legal review or expert escalation (flat fee, optional)

---

## 🛠 Tech Stack

- **Frontend:** React (Next.js or Vite)
- **Backend:** Supabase (PostgreSQL, Auth)
- **AI Agents:** GitHub Copilot Chat + Copilot Agent + LLM APIs
- **MCP Protocol:** VS Code MCP server with Postgres integration

---

## 🧠 Why Now?

The real estate industry is undergoing major disruption due to lawsuits like _Sitzer-Burnett_ and _Batton2_. HomePilot AI positions itself as the **TurboTax for real estate** — built for this new era of buyer empowerment.

---

## 🧪 Project Status

> **In early development.**  
> MCP server setup in progress. Supabase backend connected.  
> Working toward MVP + Y Combinator Summer Batch submission.

---

## 📂 Project Structure

```bash
├── .env.local               # Environment variables
├── prd.md                   # Product Requirements Document
├── copilot.project.empty.md # Copilot AI planning doc
├── README.md                # You're here!
```

---

## 🔒 Security Policies

HomePilot AI uses strict Row Level Security (RLS) policies in Supabase to protect user data. Here’s a summary of the main policies:

1. **Users**: Each user can only access and modify their own user row.
2. **Buyer Profiles**: Users can only access and manage their own buyer profile.
3. **Properties**: Users can only access and manage properties they own.
4. **Plans**: Users can only access and manage their own plans.
5. **Tasks**: Users can only access and manage tasks that belong to their plans.
6. **AI Agents**: Only users with the 'agent' role can access and manage their own agent row.
7. **Agent Activities**: Only users with the 'agent' role can access and manage their own agent activities.
8. **Documents**: Users can only access and manage their own documents.
9. **Financial Records**: Users can only access and manage their own financial records.
10. **Escalations**: Users can only access and manage their own escalations.

_Admin and marketplace extensibility: Future policies will allow admin overrides and new agent types/roles as needed._

---

# 🏠 HomePilot AI — Paste-to-Parse Home Buying Engine

HomePilot lets users paste any real estate listing URL — from Zillow, Redfin, Realtor, and more — and get a breakdown of the property plus personalized next steps. No scraping contracts. No MLS dependency. Just smart, AI-powered guidance.

## ✨ Features

- Paste any listing URL — we'll figure out the platform
- Extracts structured property data (price, beds, baths, sqft, etc.)
- Enriches with mock public property records (lot size, taxes, etc.)
- Detects intent and recommends your next move
- Built for expansion with AI agents and task routing

---

## 🧠 Folder Structure

```
src/
├── api/parseListing.ts           # Main API route
├── parsers/zillow.ts             # Zillow-specific parser
├── services/llmFallback.ts       # LLM-based fallback data extractor
├── services/dataEnrichment.ts    # Simulates public property data
├── utils/parserUtils.ts          # Detects source + address from URL
├── types/index.ts                # Shared types (e.g. ListingData)
```

---

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the dev server**

   ```bash
   npm run dev
   ```

3. **Test the API**
   Paste any real estate listing URL to see structured property info and smart next steps.

   ```bash
   curl -X POST http://localhost:3000/api/parse-listing \
     -H "Content-Type: application/json" \
     -d '{
       "url": "https://www.zillow.com/homedetails/1329-Polk-St-Hollywood-FL-33019/43333906_zpid/"
     }'
   ```

---

## 📬 Example API Response

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

## High-Fidelity AI Workflow

HomePilot AI employs a high-fidelity AI-driven development workflow to ensure clean architecture, minimize technical debt, and deliver startup-grade execution. This workflow leverages three key components:

- **ChatGPT Projects**: The brain of the operation, responsible for strategy, refinement, and planning.
- **VS Code Copilot Agent**: The hands of the operation, executing fully refined prompts with precision.
- **Gemini 2.5**: A secondary researcher, broadening insights and knowledge before prompt finalization.

This disciplined approach emphasizes a strict separation of planning and execution, ensuring that only refined prompts are sent to the Copilot Agent for implementation. For more details, refer to the [Operating Manual](./docs/operating-manual.md).

---

## Development Workflow

HomePilot AI is built using a high-fidelity, AI-augmented workflow:

- **ChatGPT Projects** acts as the centralized strategist, architect, and co-founder with socialized memory.
- **GitHub Copilot Agent (VS Code)** serves as the execution layer, interpreting only refined, intentional prompts.
- **Gemini 2.5** supplements research and technical validation when needed.

This structure creates startup-grade iteration speed while minimizing technical debt.  
Every feature, task, and architectural decision is planned intentionally before any code is generated.

Learn more in [OPERATIONS.md](./OPERATIONS.md).

---

## Development Standards

- [Copilot Agent Execution Template](docs/copilot-agent-execution-template.md)

---

## 🤖 Built With

- TypeScript + Node.js
- Express.js
- GitHub Copilot Agents
- OpenAI (simulated fallback)
- Modular API-first architecture

---

## 🛣 Roadmap

- 🔌 Real API integration (Estated, RentCast, ATTOM)
- 🤖 AI agents for scheduling, negotiation, and legal review
- 🌐 Frontend UI (React or Next.js)
- 🔒 Secure offer-building flow

---

## 🧑‍💻 Author

Made by [@Steveaub](https://github.com/steveaub) — built for first-time buyers, by someone who's changing how homes are bought.
