import { connectDB } from '@/util/database';
import Link from 'next/link';
import React from 'react';
import HomeButton from '../component/Button/HomeButton';
import Boards from './Boards';
import { Board } from '@/types/Board';

export default async function List() {
  const client = await connectDB;
  const db = client.db('forum');
  const boards: Board[] = (await db.collection('post').find().toArray()).map((doc) => ({
    id: doc._id.toString(),
    title: doc.title,
    content: doc.content,
  }));

  return (
    <div>
      <div>List</div>
      <div>
        <HomeButton />
      </div>
      <Link href={'/new'}>글 작성</Link>
      <Boards boards={boards} />
    </div>
  );
}
