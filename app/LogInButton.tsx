'use client';

import { signIn } from 'next-auth/react';

export default function LogInButton() {
  const handleLogIn = () => {
    signIn();
  };
  return <button onClick={handleLogIn}>로그인</button>;
}
