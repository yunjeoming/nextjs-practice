'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function SignUpButton() {
  const router = useRouter();
  const handleSignUp = () => {
    router.push('/signup');
  };
  return <button onClick={handleSignUp}>회원가입</button>;
}
