import { Board } from '@/types/Board';
import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
  boards: Board[];
}

export default function Boards({ boards }: Props) {
  return (
    <>
      {boards.map((board) => (
        <div key={board.id} className="border">
          <Link prefetch={false} href={`/detail/${board.id}`}>
            <h4>{board.title}</h4>
          </Link>
          <p>{board.content}</p>
        </div>
      ))}
    </>
  );
}
