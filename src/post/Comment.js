import React from "react";
import "./Comment.css";

export default function Comment({ comment }) {
  return (
    <div className="comment-box">
      {/* <h3>{comment?.user.name}</h3> */}
      <p>
        {comment?.content}
        {comment?.content}
        {comment?.content}
        {comment?.content}
        {comment?.content} {comment?.content}
        {comment?.content}
      </p>
      {/* add a line */}
      {/* <hr id="comment-break" /> */}
    </div>
  );
}
