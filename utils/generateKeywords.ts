import type { NextApiRequest, NextApiResponse } from 'next';
import { generateKeywords } from './geminiClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { userPreference } = req.body;
  if (!userPreference) {
    return res.status(400).json({ error: 'User preference is required' });
  }

  try {
    const keywords = await generateKeywords(userPreference);
    res.status(200).json({ keywords });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate keywords' });
  }
}
