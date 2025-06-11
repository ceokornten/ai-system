import { Configuration, OpenAIApi } from 'openai';
import { getSecret } from './secrets.js';

const apiKey = getSecret('OPENAI_API_KEY');

const configuration = new Configuration({ apiKey });

const openai = new OpenAIApi(configuration);

export default openai;
