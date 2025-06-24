import { Configuration, OpenAIApi } from 'openai';

export default function createOpenAI(apiKey) {
  const configuration = new Configuration({ apiKey });
  return new OpenAIApi(configuration);
}
