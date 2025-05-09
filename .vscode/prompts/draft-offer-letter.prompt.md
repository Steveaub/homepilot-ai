---
mode: agent
tools: [OfferContext, DraftOfferModal, parserUtils]
description: Generates a pre-filled offer letter using the buyer’s profile and the pasted listing. Includes contingencies and an optional $99 legal review upsell.
---

# Copilot Agent Execution Template

**User-facing outcome:**
A draft offer letter is generated, pre-filled with buyer details and listing information. Contingencies are included, and the user is offered a $99 legal review upsell.

**System behavior:**

- Parse the pasted listing and retrieve buyer profile from context.
- Pre-fill the offer letter with relevant details and standard contingencies.
- Present the draft in the offer modal, with an upsell option for legal review.

**Triggering condition:**
User requests to draft an offer letter after pasting a listing or from the offer workflow.
