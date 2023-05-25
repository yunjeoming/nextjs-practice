'use client';

import React, { useState } from 'react';

export default function LikeButton({ id, isLiked }: { id: string; isLiked: boolean }) {
  const [liked, setLiked] = useState(isLiked);

  const handleClick = () => {
    const targetLiked = liked ? 'unliked' : 'liked';
    fetch(`/api/board/${id}/${targetLiked}`, {
      method: 'post',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setLiked((state) => !state);
        }
      })
      .catch((err) => console.dir(err));
  };

  return (
    <span className="text-lg cursor-pointer" onClick={handleClick}>
      {liked ? '★' : '☆'}
    </span>
  );
}
