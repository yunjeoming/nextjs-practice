import { connectDB } from '@/util/database';
import Link from 'next/link';
import React from 'react';
import HomeButton from '../component/Button/HomeButton';
import Boards from './Boards';
import { Board } from '@/types/Board';
import { getServerSession } from 'next-auth';
import { User } from '@/types/User';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// static rendering -> dynamic rendering
export const dynamic = 'force-dynamic';

// List 페이지를 60초마다 새로 불러옴
// export const revalidate = 60;

export default async function List() {
  // /api/list로 GET요청해서 데이터를 받아올 경우 cache
  // await fetch('/list', {
  //   cache: 'force-cache', // 캐시 사용하지 않을 때 no-store
  //   next: {
  //     revalidate: 60, // 해당 fetch를 60초마다 실행해서 새로운 데이터를 불러옴
  //   }
  // });

  const session = await getServerSession(authOptions);
  const user = (session?.user as User) || null;
  const client = await connectDB;
  const db = client.db('forum');
  const boards: Board[] = (await db.collection('post').find().toArray()).map(
    (doc) =>
      ({
        _id: doc._id.toString(),
        title: doc.title,
        content: doc.content,
        authorName: doc.authorName,
        authorEmail: doc.authorEmail,
      } as Board)
  );

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <h2 className='text-2xl'>게시판 목록</h2>
        <Link href={'/new'} className="link bg-gray-50 dark:dark">
          글 작성
        </Link>
      </div>
      <Boards user={user} boards={boards} />
    </>
  );
}
