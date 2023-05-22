'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function EditButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(`/edit/${id}`);
      }}
    >
      수정
    </button>
  );
}
