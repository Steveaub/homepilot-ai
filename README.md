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
- 🔒 Legal review or expert escalation (flat fee, optional)

---

## 🛠 Tech Stack

- **Frontend:** React (Next.js or Vite)
- **Backend:** Supabase (PostgreSQL, Auth)
- **AI Agents:** GitHub Copilot Chat + Copilot Agent + LLM APIs
- **MCP Protocol:** VS Code MCP server with Postgres integration

---

## 📂 Project Structure

```bash
├── .env.local               # Environment variables
├── prd.md                   # Product Requirements Document
├── copilot.project.empty.md # Copilot AI planning doc
├── README.md                # You're here!
```

---

## 📚 Documentation and References

### Strategic Insights
## Documentation and Research Insights

### Real Buyer and Seller Insights
- [Hacker News Real Estate Disruption Insights](docs/hackernews-insights.md)
- [New York Times Buyer/Seller Frustration Insights](docs/nytimes-comment-insights.md)

### Competitive Research
- [HomePilot vs Homa Competitive Agent Instructions](docs/homepilot-vs-homa-agent-instructions.md)
- [Competitive Intelligence Overview](docs/competitive-intelligence.md)

### Product Development

- [Product Requirements Document (PRD)](docs/prd.md)
- [Copilot Agent Execution Template](docs/copilot-agent-execution-template.md)

---

## 🧠 Why Now?

The real estate industry is undergoing major disruption due to lawsuits like _Sitzer-Burnett_ and _Batton2_. HomePilot AI positions itself as the **TurboTax for real estate** — built for this new era of buyer empowerment.

---

## 🚦 Getting Started

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

## 🧾 Example API Response

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
