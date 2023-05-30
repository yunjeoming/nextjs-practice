import BackButton from '@/app/component/Button/BackButton';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

export default async function EditPage({ params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>잘못된 접근입니다.</div>;
  }

  const client = await connectDB;
  const db = client.db('forum');
  const result = await db.collection('post').findOne({
    _id: new ObjectId(id),
  });
  return (
    <div className="form">
      <h4>글 수정</h4>
      <form action="/api/board/edit" method="POST">
        <input type="hidden" name="_id" defaultValue={id} />
        <input
          id="title"
          name="title"
          defaultValue={result?.title || ''}
          className="input"
          placeholder="제목을 입력해주세요."
        />
        <textarea
          id="content"
          name="content"
          defaultValue={result?.content || ''}
          className="input"
          placeholder="내용을 입력해주세요."
        />
        <div className="flex justify-end">
          <BackButton />
          <button type="submit" className="border bg-gray-50 ml-2">
            수정
          </button>
        </div>
      </form>
    </div>
  );
}
