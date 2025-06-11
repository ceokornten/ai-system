#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { Configuration, OpenAIApi } from 'openai';

import Chat from '../models/Chat.js';

// Setup __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
import dotenv from 'dotenv';
// Load environment variables from .env at project root
dotenv.config();

// Setup OpenAI client
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

async function main() {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

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
      model: 'text-davinci-003',
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