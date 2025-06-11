import fs from 'fs/promises';
import path from 'path';

// Build a prompt string for the given channel, user message, and history
export default async function buildPrompt(channelId, userMessage, history = []) {
  const promptsDir = path.resolve(process.cwd(), 'prompts');
  const templatePath = path.join(promptsDir, `${channelId}.txt`);
  let template;
  try {
    template = await fs.readFile(templatePath, 'utf8');
  } catch {
    template = `You are an AI assistant for channel ${channelId}.`;
  }

  // Replace placeholder if present
  template = template.replace(/{{\s*serviceName\s*}}/g, channelId);

  // Format recent history (oldest first)
  const historyText = history
    .reverse()
    .map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.message}`)
    .join('\n');

  // Construct final prompt
  const promptParts = [template];
  if (historyText) {
    promptParts.push('Conversation history:');
    promptParts.push(historyText);
  }
  promptParts.push(`User: ${userMessage}`);
  promptParts.push('Assistant:');

  return promptParts.join('\n');
}