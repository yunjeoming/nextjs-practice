'use client'

import { useRouter } from 'next/navigation';
import React from 'react';

export default function BackButton() {
  const router = useRouter();
  return (
    <button className='component-btn'
      onClick={() => {
        router.back();
      }}
    >
      {'< 이전'}
    </button>
  );
}
