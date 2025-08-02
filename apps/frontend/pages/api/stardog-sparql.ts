import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST allowed' });
    }

    const query = req.body?.toString();
    if (!query) {
        return res.status(400).json({ error: 'Missing query body' });
    }

    const STARDOG_ENDPOINT = process.env.NEXT_PUBLIC_STARDOG_ENDPOINT;
    const STARDOG_USERNAME = process.env.NEXT_PUBLIC_STARDOG_USERNAME;
    const STARDOG_PASSWORD = process.env.STARDOG_PASSWORD;



    if (!STARDOG_ENDPOINT || !STARDOG_USERNAME || !STARDOG_PASSWORD) {
        console.log("endpoint:", STARDOG_ENDPOINT);
        console.log("username:", STARDOG_USERNAME);
        console.log("pass:", STARDOG_PASSWORD);
        return res.status(500).json({ error: 'Stardog environment variables not configured' });
    }

    try {
        const stardogRes = await fetch(STARDOG_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${STARDOG_USERNAME}:${STARDOG_PASSWORD}`).toString('base64')}`,
                'Content-Type': 'application/sparql-query',
                'Accept': 'application/sparql-results+json',
            },
            body: query,
        });

        const text = await stardogRes.text(); // parse body first as raw text
        const contentType = stardogRes.headers.get('content-type');

        let data: any = null;

        if (contentType?.includes('application/json')) {
            data = JSON.parse(text);
        } else {
            try {
                data = JSON.parse(text); // ✅ attempt to parse normally
            } catch {
                data = { raw: text };    // fallback if it's not valid JSON
            }
        }

        if (!stardogRes.ok) {
            console.error('[Stardog Error]', data);
            return res.status(stardogRes.status).json({
                error: 'Stardog responded with error',
                status: stardogRes.status,
                details: data,
            });
        }

        return res.status(200).json(data);
    } catch (err) {
        console.error('[Stardog connection failed]', err);
        return res.status(500).json({ error: 'Failed to connect to Stardog' });
    }
}
