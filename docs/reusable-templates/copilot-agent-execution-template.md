# Copilot Agent Execution Template

## Task Overview

Clearly describe the outcome or behavior you want to achieve. Focus on the objective — not on how it gets implemented or where.

## Expected Output

Define what success looks like:

* **User Experience**: What should the user see, do, or receive?
* **System Changes**: What should update or improve?
* **Behavior**: What should happen automatically or conditionally?

## Instruction Rule: Outcome Only — Let Copilot Decide the How

✅ Tell Copilot the goal.
🛑 Don’t mention filenames, methods, lines, or implementation details.

Let Copilot use workspace context to determine the correct files, functions, and dependencies.

#### Examples:

* ✅ “Real Zillow data shows in UI instead of mock.”
* ❌ “Update parseZillowHTML.ts to fix fallback returns.”

## Optional Notes

You may provide business rules, platform constraints, or user priorities. These guide Copilot’s decisions without dictating structure.

#### Examples:

* Must support mobile users.
* Needs to preserve accessibility.
* Should gracefully degrade if Zillow data is malformed.

## Success Criteria

* The goal is met.
* All required dependencies are updated automatically.
* No regressions or broken functionality.

This template is for strategic guidance. You define the outcome. Copilot handles implementation with full workspace awareness.
