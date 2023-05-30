import React from 'react';
import BackButton from '../component/Button/BackButton';
import { getServerSession } from 'next-auth';
import LogInButton from '../LogInButton';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function New() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div>
        로그인 해주세요 👉
        <LogInButton />
      </div>
    );
  }
  return (
    <div className="form">
      <h4>글 작성</h4>
      <form action="/api/board/new" method="POST">
        <input id="title" name="title" className="input" placeholder="제목을 입력해주세요." />
        <textarea id="content" name="content" className="input" placeholder="내용을 입력해주세요." />
        <div className="flex justify-end">
          <BackButton />
          <button type="submit" className="border bg-gray-50 ml-2">
            작성
          </button>
        </div>
      </form>
    </div>
  );
}
