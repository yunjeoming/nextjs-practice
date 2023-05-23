'use client';

import { signOut } from 'next-auth/react';

export default function LogOutButton() {
  const handleLogOut = () => {
    signOut();
  };
  return <button onClick={handleLogOut}>로그아웃</button>;
}
