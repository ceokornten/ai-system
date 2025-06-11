#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import openai, { openaiModel } from '../config/openai.js';
import connectDB from '../config/database.js';

import Chat from '../models/Chat.js';

// Setup __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
import dotenv from 'dotenv';
// Load environment variables from .env at project root
dotenv.config();

async function main() {
  // Connect to MongoDB
  await connectDB(process.env.MONGODB_URI);

  const promptsDir = path.resolve(__dirname, '../prompts');
  const files = await fs.readdir(promptsDir);

  for (const file of files) {
    if (!file.endsWith('.txt')) continue;

    const channelId = path.basename(file, '.txt');
    const templatePath = path.join(promptsDir, file);
    const template = await fs.readFile(templatePath, 'utf8');

    // Fetch recent chat logs for this channel
    const logs = await Chat.find({ channelId })
      .sort({ timestamp: -1 })
      .limit(100)
      .lean();

    // Prepare log summary
    const logText = logs
      .map((msg) => `${msg.role}: ${msg.message}`)
      .reverse()
      .join('\n');

    // Ask OpenAI to improve the prompt template based on logs
    const improvePrompt = `Improve the following assistant prompt for channel ${channelId} based on recent conversation logs:\n\nCurrent Prompt:\n${template}\n\nLogs:\n${logText}\n\nRevised Prompt:`;
    const response = await openai.createCompletion({
      model: openaiModel,
      prompt: improvePrompt,
      max_tokens: 512,
      temperature: 0.5,
    });

    const improved = response.data.choices[0].text.trim();
    if (improved) {
      await fs.writeFile(templatePath, improved, 'utf8');
      console.log(`Updated prompt template for channel: ${channelId}`);
    }
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('Error in mainLearner:', err);
  process.exit(1);
});