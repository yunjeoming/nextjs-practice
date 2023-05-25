import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(401).json({
      status: 401,
    });
  }

  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      status: 400,
      result: '잘못된 boardId입니다.',
    });
  }

  if (req.method === 'POST') {
    const filter = {
      userId: new ObjectId(session.user.id),
    };
    const client = await connectDB;
    const likedDb = client.db('forum').collection('liked');
    const userLiked = await likedDb.findOne(filter);
    if (!userLiked) {
      return res.status(400).json({
        status: 400,
      });
    }

    const updateDoc = {
      $set: {
        ...userLiked,
        posts: userLiked.posts.filter((p: string) => p !== id),
      },
    };
    await likedDb.updateOne(filter, updateDoc);

    return res.status(200).json({
      status: 200,
    });
  }
}
