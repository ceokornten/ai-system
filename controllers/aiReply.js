import openai from '../config/openai.js';

import Chat from '../models/Chat.js';
import buildPrompt from '../utils/promptBuilder.js';


class AiReplyController {
  // Handle incoming LINE event and respond via provided lineClient
  async handleEvent(event, lineClient) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.resolve(null);
    }

    const userId = event.source.userId;
    const channelId = event.destination;
    const userText = event.message.text;

    // Save user message
    await Chat.create({
      channelId,
      userId,
      role: 'user',
      message: userText,
      timestamp: new Date(),
    });

    // Fetch recent chat history (last 10 messages)
    const history = await Chat.find({ channelId })
      .sort({ timestamp: -1 })
      .limit(10)
      .lean();

    // Build prompt for this channel
    const prompt = await buildPrompt(channelId, userText, history);

    // Call OpenAI to generate a response
    let botReply;
    try {
      const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 512,
        temperature: 0.7,
      });
      botReply = completion.data.choices[0].text.trim();
    } catch (err) {
      console.error('OpenAI API error:', err);
      botReply = 'Sorry, something went wrong.';
    }

    // Save AI reply
    await Chat.create({
      channelId,
      userId,
      role: 'assistant',
      message: botReply,
      timestamp: new Date(),
    });

    // Reply via LINE Messaging API
    return lineClient.replyMessage(event.replyToken, {
      type: 'text',
      text: botReply,
    });
  }
}

export default new AiReplyController();