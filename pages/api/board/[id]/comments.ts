import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      status: 400,
      result: '잘못된 boardId입니다.',
    });
  }

  if (req.method === 'GET') {
    const client = await connectDB;
    const db = client.db('forum');
    const filter = {
      boardId: new ObjectId(id),
    };
    const result = await db.collection('comment').find(filter).toArray();
    return res.status(200).json({
      status: 200,
      result,
    });
  }
}
