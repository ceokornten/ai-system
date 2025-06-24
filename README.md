# AI System

This repository contains a demo full‑stack application with a React/Tailwind dashboard and an Express/MongoDB backend. The original LINE agent code is kept for reference and a new `/frontend` and `/backend` folder provide a clean admin dashboard, authentication and OpenAI integration.

 ## Project Structure

```
ai-system/
├── backend/                 # Express server and API
├── frontend/                # React dashboard
├── config/                  # Legacy LINE agent config
├── controllers/             # LINE agent controllers
├── models/                  # LINE agent schemas
├── routes/                  # LINE webhook routes
├── scripts/                 # Helper scripts
├── README.md
└── .env.example             # Environment variables template
```

## Setup & Running

1. Copy the example env file and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
2. Start the backend API:
   ```bash
   cd backend
   npm install
   npm start
   ```
3. In another terminal start the React dashboard:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   The frontend proxies API requests to the backend on port **4000**.

 ## Features

 - React dashboard with login, AI query form and search bar.
 - Express REST API with JWT authentication and OpenAI GPT-4o integration.
 - Simple rate limiting per user when querying the AI.
- Example MongoDB search using text indexes.
- Original LINE webhook and learning agent scripts are still included.
