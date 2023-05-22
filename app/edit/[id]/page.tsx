import BackButton from '@/app/component/Button/BackButton';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

export default async function EditPage({ params: { id } }: Props) {
  const client = await connectDB;
  const db = client.db('forum');
  const result = await db.collection('post').findOne({
    _id: new ObjectId(id),
  });
  return (
    <div>
      <h4>수정페이지</h4>
      <BackButton />

      <form action="/api/board/edit" method="POST">
        <input type="hidden" name="_id" defaultValue={id} />
        <div>
          <input
            id="title"
            name="title"
            defaultValue={result?.title || ''}
            className="border"
            placeholder="제목을 입력해주세요."
          />
        </div>
        <div>
          <textarea
            id="content"
            name="content"
            defaultValue={result?.content || ''}
            className="border"
            placeholder="내용을 입력해주세요."
          />
        </div>
        <BackButton />
        <button type="submit">수정</button>
      </form>
    </div>
  );
}
