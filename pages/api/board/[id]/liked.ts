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

    // userLiked가 있으면 posts에 추가, 없으면 새로 만들어준다.
    if (userLiked) {
      const updateDoc = {
        $set: {
          ...userLiked,
          posts: [...userLiked.posts, id],
        },
      };
      await likedDb.updateOne(filter, updateDoc);
    } else {
      await likedDb.insertOne({
        userId: filter.userId,
        posts: [id],
      });
    }

    return res.status(200).json({
      status: 200,
    });
  }
}
