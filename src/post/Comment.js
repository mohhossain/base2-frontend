import React, { useState } from "react";
import "./Comment.css";
import Balancer from "react-wrap-balancer";

export default function Comment({ comment }) {
  const [showMore, setShowMore] = useState(false);
  const date = new Date(comment?.created_at);
  const formattedDate = date.toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="comment">
      <div className="comment-box">
        <p>
          {comment.content?.slice(0, showMore ? comment.content?.length : 600)}
          {comment.content?.length >= 600 && (
            <button
              id="read-more-button"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Read Less" : "Read More"}
            </button>
          )}
        </p>
        <p>{formattedDate}</p>
      </div>
      <div className="comment-author">
        <img height={50} width={50} src={comment?.user?.profile_picture}></img>
      </div>
    </div>
  );
}
