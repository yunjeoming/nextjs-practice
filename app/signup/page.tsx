import React from 'react';
import BackButton from '../component/Button/BackButton';

export default function SignUp() {
  return (
    <div>
      <h2>회원가입</h2>
      <form className='flex flex-col' action="/api/auth/signup" method="post">
        <input name="name" placeholder="이름" />
        <input name="email" placeholder="이메일" />
        <input type="password" name="password" placeholder="비밀번호" />
        <BackButton />
        <button type="submit">가입</button>
      </form>
    </div>
  );
}
