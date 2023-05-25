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
          <div key={c._id} className="flex justify-between border">
            <div>{c.content}</div>
            <span>{c.authorName}</span>
          </div>
        ))}
      </div>
      <input onChange={onChangeComment} value={comment} />
      <button onClick={handleClick}>댓글 등록</button>
    </div>
  );
}
