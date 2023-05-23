import BackButton from '@/app/component/Button/BackButton';
import EditButton from '@/app/component/Button/EditButton';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

export default async function page({ params: { id } }: Props) {
  const session = await getServerSession();
  const client = await connectDB;
  const db = client.db('forum');
  const board = await db.collection('post').findOne({
    _id: new ObjectId(id),
  });
  const isMyBoard = session ? board?.authorEmail === session.user?.email : false;
  
  return (
    <div>
      <h4>상세페이지</h4>
      <BackButton />
      {isMyBoard && <EditButton id={id} />}

      <h4>{board?.title || ''}</h4>
      <p>{board?.content || ''}</p>
    </div>
  );
}
