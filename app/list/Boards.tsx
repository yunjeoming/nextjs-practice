'use client';

import { Board } from '@/types/Board';
import Link from 'next/link';
import React, { FC, MouseEvent } from 'react';

interface Props {
  boards: Board[];
}

export default function Boards({ boards }: Props) {
  const handleDelete = (e: MouseEvent<HTMLSpanElement>, id: string) => {
    console.log('click');
    fetch(`/api/board/delete`, {
      method: 'POST', // delete 인식 못하는 이슈로 post 사용
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          const parentElem = (e.target as HTMLElement).parentElement!;
          parentElem.style.opacity = '0';
          setTimeout(() => {
            parentElem.remove();
          }, 1000);
        }
      })
      .catch((err) => {
        console.dir(err);
      });
  };
  return (
    <>
      {boards.map((board) => (
        <div key={board.id} className="border opacity-100 transition-all duration-500 ease-in">
          <Link prefetch={false} href={`/detail/${board.id}`}>
            <h4>{board.title}</h4>
          </Link>
          <p>{board.content}</p>
          <span className="cursor-pointer" onClick={(e) => handleDelete(e, board.id)}>
            삭제
          </span>
        </div>
      ))}
    </>
  );
}
