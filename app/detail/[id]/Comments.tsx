'use client';

import { Comment } from '@/types/Board';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

export default function Comments({ id }: { id: string }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const onChangeComment = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  }, []);

  const handleClick = () => {
    if (!comment) {
      return;
    }

    const input = {
      boardId: id,
      content: comment,
    };

    fetch(`/api/comment/new`, {
      method: 'POST',
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          fetchComments();
          setComment('');
        }
      })
      .catch((err) => console.dir(err));
  };

  const fetchComments = useCallback(() => {
    fetch(`/api/board/${id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.result);
      })
      .catch((err) => console.dir(err));
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div>
      <div>
        {comments.map((c) => (
          <div
            key={c._id}
            className="flex items-center justify-between border px-4 py-2 rounded-md bg-gray-50 mb-2 dark:dark"
          >
            <div className="flex-grow">{c.content}</div>
            <span className="basis-10 text-xs">{c.authorName}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input className="flex-grow rounded-md mr-2 px-4 border dark:text-gray-700" onChange={onChangeComment} value={comment} />
        <button className="border text-sm" onClick={handleClick}>
          댓글 등록
        </button>
      </div>
    </div>
  );
}
