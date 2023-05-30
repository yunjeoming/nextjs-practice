import React from 'react';
import BackButton from '../component/Button/BackButton';

export default function SignUp() {
  return (
    <div className="form">
      <h4>회원가입</h4>
      <form className="flex flex-col" action="/api/auth/signup" method="post">
        <input name="name" className="input" placeholder="이름" />
        <input name="email" className="input" placeholder="이메일" />
        <input type="password" className="input" name="password" placeholder="비밀번호" />
        <div className='flex justify-end'>
          <BackButton />
          <button type="submit" className='border bg-gray-50 dark:dark ml-2'>가입</button>
        </div>
      </form>
    </div>
  );
}
