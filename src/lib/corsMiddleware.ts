import Cors from 'cors';

// Initialize the CORS middleware
const cors = Cors({
  origin: process.env.baseURL, // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Allow cookies and credentials
});

// Helper function to run middleware
import { NextApiRequest, NextApiResponse } from 'next';

export function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: (req: NextApiRequest, res: NextApiResponse, callback: (result: unknown) => void) => void) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
