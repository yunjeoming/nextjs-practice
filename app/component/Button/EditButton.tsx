'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function EditButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <button
      className="border bg-gray-50 dark:dark"
      onClick={() => {
        router.push(`/edit/${id}`);
      }}
    >
      수정
    </button>
  );
}
