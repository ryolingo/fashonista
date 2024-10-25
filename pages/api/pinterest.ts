import { NextApiRequest, NextApiResponse } from 'next';
// Use default import instead of namespace import
import PinterestAPI from 'pinterest-node-api';

// Initialize the Pinterest client
const pinterest = new PinterestAPI();

// Set the user token using the environment variable
pinterest.setUserToken(process.env.NEXT_PUBLIC_PINTEREST_ACCESS_TOKEN);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { pin_id } = req.query;

  if (!pin_id) {
    return res.status(400).json({ error: 'Pin ID is required' });
  }

  try {
    // Make a request to get the pin data
    const response = await pinterest.pins.get(pin_id as string);

    // Send the response back to the client
    return res.status(200).json(response);
  } catch (error: any) {
    console.error('Failed to fetch pin data:', error.message);
    return res.status(500).json({ error: 'Failed to fetch pin data' });
  }
}
