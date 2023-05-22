import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const client = await connectDB;
    const db = client.db('forum');
    const result = await db.collection('post').find().toArray();

    if (!result.length) {
      res.status(200).json('데이터가 없습니다.');
    } else {
      res.status(200).json(result);
    }
  }

  if (req.method === 'POST') {
    res.status(200).json('the end');
  }
}
