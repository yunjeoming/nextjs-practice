import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({
      status: 401,
    });
  }

  if (req.method === 'POST') {
    const { boardId, content } = JSON.parse(req.body);
    const { name, email } = session.user;
    const comment = {
      boardId: new ObjectId(boardId),
      authorName: name,
      authorEmail: email,
      content,
    };
    const client = await connectDB;
    const db = client.db('forum');
    await db.collection('comment').insertOne(comment);
    res.status(201).json({
      status: 201,
      result: comment,
    });
  }
}
