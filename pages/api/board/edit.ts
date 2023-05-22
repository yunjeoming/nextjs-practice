import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { _id, title, content } = req.body;
    const client = await connectDB;
    const db = client.db('forum');
    console.log(req.body);

    const filter = { _id: new ObjectId(_id) };
    const updateDoc = {
      $set: {
        title,
        content,
      },
    };
    await db.collection('post').updateOne(filter, updateDoc);

    res.redirect(302,`/detail/${_id}`);
  }
}
