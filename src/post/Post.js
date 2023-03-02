import React from "react";
import { useNavigate } from "react-router-dom";
import "./Post.css";
import TagChip from "../editor/TagChip";

const Post = ({ username, name, profile_picture, question }) => {
  const { title, content } = question;
  const date = new Date(question?.created_at);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/posts/${question.id}`);
  };

  return (
    <div className="post-card-container">
      {/* <h1>Hello</h1> */}
      <div className="post-card">
        <div className="post-card-header">
          <img
            src={profile_picture}
            className="post-card-profile-picture"
            alt={name[0]}
          />
          <div className="post-card-header-text">
            <div className="post-card-username">{name}</div>
            <div className="post-card-full-name">@{username}</div>
            <div className="post-card-full-name">{formattedDate}</div>
          </div>
        </div>
        <div className="post-content">
          <div className="post-card-title" onClick={handlePostClick}>
            {title}
          </div>
          <div>
            {question?.tags?.map((tag) => {
              return (
                <span key={tag.id} className="tag">
                  <TagChip tag={tag.name}></TagChip>
                </span>
              );
            })}
            <p className="post-card-full-name">
              {question.reactions.length} reactions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
