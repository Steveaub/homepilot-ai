---
mode: agent
tools: [EscalationAgent, AgentStatusFeed]
description: Triggers if an offer hasn’t received a response in 3 days. Sends a follow-up using EscalationAgent and updates AgentStatusFeed.
---

# Copilot Agent Execution Template

**User-facing outcome:**
A follow-up message is sent to the listing agent after 3 days of no response, and the user is notified of the escalation.

**System behavior:**

- Detect offers with no response after 3 days.
- Use EscalationAgent to send a follow-up communication.
- Update AgentStatusFeed with escalation status and notify the user.

**Triggering condition:**
An offer remains unanswered for 3 days after submission.
