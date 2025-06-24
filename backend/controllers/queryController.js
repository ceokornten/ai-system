import Query from '../models/Query.js';
import createOpenAI from '../config/openai.js';

export async function createQuery(req, res) {
  const { prompt } = req.body;
  const openai = createOpenAI(process.env.OPENAI_API_KEY);
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }]
    });
    const response = completion.data.choices[0].message.content;
    await Query.create({ user: req.user._id, prompt, response });
    res.json({ response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'AI error' });
  }
}

export async function listQueries(req, res) {
  const queries = await Query.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(queries);
}
