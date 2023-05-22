import React from 'react';
import BackButton from '../component/Button/BackButton';

export default function New() {
  return (
    <div>
      <h4>글 작성</h4>
      <form action="/api/board/new" method="POST">
        <div>
          <input id="title" name="title" className="border" placeholder="제목을 입력해주세요." />
        </div>
        <div>
          <textarea id="content" name="content" className="border" placeholder="내용을 입력해주세요." />
        </div>
        <BackButton />
        <button type="submit">작성</button>
      </form>
    </div>
  );
}
