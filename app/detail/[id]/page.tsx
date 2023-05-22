import BackButton from '@/app/component/Button/BackButton';
import EditButton from '@/app/component/Button/EditButton';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextPage } from 'next';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

export default async function page({ params: { id } }: Props) {
  const client = await connectDB;
  const db = client.db('forum');
  const result = await db.collection('post').findOne({
    _id: new ObjectId(id),
  });
  return (
    <div>
      <h4>상세페이지</h4>
      <BackButton />
      <EditButton id={id} />

      <h4>{result?.title || ''}</h4>
      <p>{result?.content || ''}</p>
    </div>
  );
}
