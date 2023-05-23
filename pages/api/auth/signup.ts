import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password: oldPwd } = req.body;

    if (!name) {
      return res.status(400).json({
        status: 400,
      });
    }

    if (!email) {
      return res.status(400).json({
        status: 400,
      });
    }

    const client = await connectDB;
    const db = client.db('forum');
    const hasEmail = await db.collection('user').findOne({ email });
    if (hasEmail) {
      return res.status(409).json({
        status: 409,
      });
    }

    const password = await bcrypt.hash(oldPwd, 10);
    const user = {
      name,
      email,
      password,
      isRole: 'user'
    };
    await db.collection('user').insertOne(user);

    res.status(200).json({
      status: 200,
    });
  }
}
