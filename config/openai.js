import { Configuration, OpenAIApi } from 'openai';
import { getSecret } from './secrets.js';

const apiKey = getSecret('OPENAI_API_KEY');

export const openaiModel = process.env.OPENAI_MODEL || 'text-davinci-003';

const configuration = new Configuration({ apiKey });

const openai = new OpenAIApi(configuration);

export default openai;
