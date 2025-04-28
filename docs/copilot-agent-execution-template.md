# Copilot Agent Execution Template (Workspace-Aware Precision Model)

## Task Overview

### Goal
Clearly state what outcome the user wants. Be specific about the final result

### Feature/Functionality
Explain the feature or functionality that needs to be added, improved, or modified.

## Context

### Codebase Context
- Use your workspace awareness to locate appropriate files, modules, and directories.
- If full file paths are necessary to avoid ambiguity, they will be explicitly specified inside the individual Task description.
- Otherwise, you are trusted to identify the correct files and modules based on project structure and logical inference.
- If a critical file is missing or uncertain, raise a comment politely instead of guessing or fabricating placeholder files.

### Existing Behavior
Briefly summarize the current behavior of the relevant feature or system.

### Expected Behavior
Clearly define what the behavior should be after the task is complete.

## Constraints

### Technical Constraints
- Maintain system stability and project structure.
- Preserve all existing core flows unless explicit improvements are required.
- Follow existing code patterns, linting rules (e.g., ESLint, Prettier), naming conventions, and security practices.
- Modify as many files as necessary to achieve clean, stable integration.
- Raise an alert if structural conflicts or missing critical files are detected.

### Non-Goals
State what should explicitly not be modified (e.g., auth modules, unrelated reporting modules, billing systems) when neccessary.

## Deliverables

### Expected Output
Define what should be created, modified, or updated.

### Testing Requirements
Describe how the changes should be tested (e.g., unit tests, integration tests, visual validation, manual testing).

## Additional Notes

### Preferred Practices
- Favor clean, maintainable, and understandable code.
- Follow established project conventions unless otherwise specified.
- Optimize for developer experience and long-term maintainability.

---

