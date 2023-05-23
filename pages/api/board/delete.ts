import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id } = JSON.parse(req.body);
    const client = await connectDB;
    const db = client.db('forum');
    const filter = {
      _id: new ObjectId(id),
    };
    await db.collection('post').deleteOne(filter);
    res.status(200).json({
      status: 200
    });
  }
}
