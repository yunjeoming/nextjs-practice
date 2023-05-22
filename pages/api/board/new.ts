import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const post = req.body;
    const client = await connectDB;
    const db = client.db('forum');
    await db.collection('post').insertOne(post);

    res.redirect(302, '/list');
  }
}
