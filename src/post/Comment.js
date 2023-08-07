import React from "react";

export default function Comment({ comment }) {
  return (
    <div>
      <h3>{comment?.user.name}</h3>
      <p>{comment?.content}</p>
    </div>
  );
}
