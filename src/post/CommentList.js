import React from "react";
import Comment from "./Comment";

function CommentList({ comments, aProp }) {
  console.log(comments, aProp);
  return (
    <div>
      {/* maps the comments and render the comment component */}
      {comments?.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

export default CommentList;
