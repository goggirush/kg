// pages/api/agent.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing messages array' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
    });

    res.status(200).json({ reply: completion.choices[0].message });
  } catch (err) {
    console.error('ChatGPT error:', err);
    res.status(500).json({ error: 'Failed to contact GPT' });
  }
}
