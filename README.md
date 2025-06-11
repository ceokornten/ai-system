 # LINE AI Agent System

 This project implements a multi-agent AI system for 10 LINE OA chat channels. Each LINE channel has its own AI agent, and a main AI “brain” continuously learns from all conversation logs and shared documents to improve response templates.

 ## Project Structure

 ```
 line-ai-agent-system/
├── config/
│   └── .env.example         # Environment variable template
│   ├── database.js          # MongoDB connection helper
│   └── openai.js            # OpenAI client setup
 ├── controllers/
 │   └── aiReply.js           # Logic to generate and send AI replies
 ├── cron/
 │   └── mainLearner.js       # On-demand learning agent script
 ├── docker-compose.yml       # Optional Docker Compose setup
 ├── Dockerfile               # Node.js Docker image definition
 ├── index.js                 # Entry point (Express server)
 ├── package.json             # NPM dependencies and scripts
 ├── prompts/
 │   └── service1.txt         # Example prompt template (add one per channel)
 ├── routes/
 │   └── lineWebhook.js       # LINE Messaging API webhook route
 ├── scripts/
 │   └── setup.sh             # Setup script for Docker or PM2
 ├── utils/
 │   └── promptBuilder.js     # Builds prompt per service/channel
 ├── models/
 │   ├── Chat.js              # Chat history schema
 │   ├── Article.js           # Articles schema
 │   ├── Video.js             # Video transcripts schema
 │   ├── Media.js             # Media metadata schema
 │   └── WebLink.js           # Web links schema
 └── .dockerignore            # Files to ignore in Docker build
 ```

 ## Setup & Running

1. Copy the example env file and fill in your credentials:
   ```bash
   cp config/.env.example .env
   ```
 2. Run `scripts/setup.sh` to start via Docker Compose or PM2.
 3. The webhook server listens on port **3000** by default.
 4. To trigger the learning agent on demand: `npm run learn`.

 ## Features

 - Webhook listener for LINE Messaging API.
 - Per-channel prompt templates in `prompts/`.
 - MongoDB storage for chats, articles, videos, media, and links.
 - Main AI learner to enhance prompts based on logs and documents.
 - Optional admin dashboard routes can be added under `routes/admin`.
 - Docker support or PM2-based local deployment.