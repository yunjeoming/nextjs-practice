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
    const { _id, title, content } = req.body;
    const client = await connectDB;
    const db = client.db('forum');

    const filter = { _id: new ObjectId(_id) };
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

    const updateDoc = {
      $set: {
        title,
        content,
      },
    };
    await db.collection('post').updateOne(filter, updateDoc);

    res.redirect(302, `/detail/${_id}`);
  }
}
