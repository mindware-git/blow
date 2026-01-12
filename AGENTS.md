# AGENTS.md

This document provides instructions for setting up and running the different parts of this project.

## Code style
- TypeScript strict mode
- Single quotes, no semicolons
- Use functional patterns where possible

---

## Frontend (Next.js)

The frontend is a [Next.js](https://nextjs.org/) application.

### Setup
- **Install dependencies:** `bun install`

### Development
- **Start dev server:** `bun dev`
  - The server will be available at [http://localhost:3000](http://localhost:3000).

### Testing
- **Run tests:** `bun test`

---

## Backend (FastAPI)

The backend is a [FastAPI](https://fastapi.tiangolo.com/) application located in the `/api` directory.

### Setup
- **Install dependencies:** `uv sync`
  - This command should be run from within the `api` directory.

### Development
- **Start dev server:** `uvicorn main:app --reload`
  - This command should be run from within the `api` directory.
  - The server will be available at [http://localhost:8000](http://localhost:8000).

### Testing
- **Run tests:** `uv run pytest`
  - This command should be run from within the `api` directory.