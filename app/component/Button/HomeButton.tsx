'use client'

import { useRouter } from 'next/navigation';
import React from 'react';

export default function HomeButton() {
  const router = useRouter();
  return (
    <button
      className="border"
      onClick={() => {
        router.push('/');
      }}
    >
      Home
    </button>
  );
}
