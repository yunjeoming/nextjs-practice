import { connectDB } from '@/util/database';
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
    const { name, email } = session.user;
    const post = {
      ...req.body,
      authorName: name,
      authorEmail: email
    };
    const client = await connectDB;
    const db = client.db('forum');
    await db.collection('post').insertOne(post);

    res.redirect(302, '/list');
  }
}
