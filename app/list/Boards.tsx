'use client';

import { Board } from '@/types/Board';
import { User } from '@/types/User';
import Link from 'next/link';
import React, { MouseEvent } from 'react';

interface Props {
  user: User | null;
  boards: Board[];
}

export default function Boards({ boards, user }: Props) {
  const handleDelete = (e: MouseEvent<HTMLSpanElement>, id: string) => {
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
        <div
          key={board._id}
          className="border rounded-md opacity-100 transition-all duration-500 ease-in mb-4 p-4 bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
        >
          <Link prefetch={false} href={`/detail/${board._id}`}>
            <h4 className="font-bold ellipsis">{board.title}</h4>
          </Link>
          <p>{board.content}</p>
          {user?.isRole === 'admin' ||
            (user?.email === board.authorEmail && (
              <div className="flex justify-end text-xs">
                <span className="cursor-pointer" onClick={(e) => handleDelete(e, board._id)}>
                  삭제
                </span>
              </div>
            ))}
        </div>
      ))}
    </>
  );
}
