

## Task Overview

Describe the outcome or behavior you want to achieve. Focus on the *objective*, not the *implementation*. This should state what the system should accomplish from the user’s point of view.

## Expected Output

### ✅ User Experience

* What should the user be able to see, do, or accomplish once this is complete?
* Think in terms of benefits or capabilities (e.g. "users can get mortgage offers from 3 lenders" or "users can get context-aware education").

### ✅ System Changes

* What changes should happen behind the scenes?
* This could be improvements in logic, behavior, or automation — but **don’t** mention filenames, methods, or specific components.

### ✅ Behavior

* What should happen automatically or conditionally?
* Include event-driven expectations (e.g. "when a user reaches Step 3, they’re offered education about inspections").

## Instruction Rule: Outcome Only — Let Copilot Decide the How

✅ Describe what the system should accomplish.
🛑 **Avoid** referencing file names, method names, components, folders, functions, or line numbers.

Let Copilot use full workspace context to determine which files or modules need to be created, updated, or referenced.

### Good Examples:

* ✅ “Buyers should see real mortgage rates based on listing ZIP code.”
* ✅ “Users get a prompt to learn more about grant eligibility after they reach the pre-approval step.”
* ❌ “Update `parseZillow.ts` to return ZIP code.”
* ❌ “Add grant explanation in `learn-more.html`.”

## Optional Notes

You can add platform constraints, business rules, or user expectations that should be considered, without dictating how to solve them.

### Examples:

* Must support mobile and desktop.
* Should handle incomplete or missing data gracefully.
* Must maintain accessibility compliance.

## Success Criteria

* The intended goal is met from the user’s perspective.
* Any data dependencies or logic paths update as expected.
* No regressions or broken flows are introduced.

This template is for **strategic guidance**, not implementation detail. You define *what* to build — Copilot decides *how*.
