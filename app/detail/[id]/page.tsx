import BackButton from '@/app/component/Button/BackButton';
import EditButton from '@/app/component/Button/EditButton';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import React from 'react';
import Comments from './Comments';
import LikeButton from './LikeButton';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface Props {
  params: {
    id: string;
  };
}

export default async function page({ params: { id } }: Props) {
  const session = await getServerSession(authOptions);
  const client = await connectDB;
  const db = client.db('forum');
  const boardId = new ObjectId(id);
  const board = await db.collection('post').findOne({
    _id: boardId,
  });
  const userLiked = await db.collection('liked').findOne({
    userId: new ObjectId(session.user.id),
  });
  const isLiked: boolean = userLiked?.posts.includes(id) || false;
  const isMyBoard = session ? board?.authorEmail === session.user?.email : false;

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <BackButton />
        <h4 className="font-bold">상세페이지</h4>
        {isMyBoard ? <EditButton id={id} /> : <span></span>}
      </div>
      <div className="border bg-gray-50 rounded-md p-4 dark:dark">
        <h4 className="mb-4">{board?.title || ''}</h4>
        <p>{board?.content || ''}</p>
      </div>
      <div className='my-2 pl-2'>
        좋아요 <LikeButton id={id} isLiked={isLiked} />
      </div>
      <Comments id={id} />
    </>
  );
}
