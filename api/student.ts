// Vercel API route to proxy requests to the student API
// This file should be placed in: /api/student.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Extract query parameters
    const { action, matricNo } = req.query;

    if (!action || !matricNo) {
      res.status(400).json({ error: 'Missing required parameters' });
      return;
    }

    // Make request to the actual API
    const apiUrl = `https://uirms.ui.edu.ng/backend/student.php?action=${action}&matricNo=${matricNo}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Student-Result-Checker/1.0',
      },
    });

    if (!response.ok) {
      res.status(response.status).json({ error: 'API request failed' });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
