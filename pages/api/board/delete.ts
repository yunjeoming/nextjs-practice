import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({
      status: 401,
    });
  }

  if (req.method === 'POST') {
    const { id } = JSON.parse(req.body);
    const client = await connectDB;
    const db = client.db('forum');

    const filter = {
      _id: new ObjectId(id),
    };
    const targetBoard = await db.collection('post').findOne(filter);
    if (!targetBoard) {
      return res.status(404).json({
        status: 404,
      });
    }

    if (targetBoard.authorEmail !== session.user.email) {
      return res.status(500).json({
        status: 500,
      });
    }

    await db.collection('post').deleteOne(filter);
    res.status(200).json({
      status: 200,
    });
  }
}
