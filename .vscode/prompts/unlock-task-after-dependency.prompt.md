---
mode: agent
tools: []
description: Ensures that future workflow steps stay locked until required tasks are completed. Unlocks tasks dynamically and triggers any necessary agents.
---

# Copilot Agent Execution Template

**User-facing outcome:**
Tasks in the workflow remain locked until dependencies are completed. Tasks unlock automatically, and agents are triggered as needed.

**System behavior:**

- Monitor task dependencies in the workflow.
- Keep future steps locked until prerequisites are met.
- Unlock tasks dynamically and trigger agents for the next steps.

**Triggering condition:**
A required task or dependency is completed in the workflow.
