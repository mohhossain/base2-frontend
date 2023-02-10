import React from "react";
import "./Post.css";
const Post = ({
  username,
  fullName,
  profilePicture,
  title,
  content,
  date,
  skills,
}) => {
  return (
    <div className="post-card-container">
      <div className="post-card">
        <div className="post-card-header">
          <img src={profilePicture} className="post-card-profile-picture" />
          <div className="post-card-header-text">
            <div className="post-card-username">{fullName}</div>
            <div className="post-card-full-name">@{username}</div>
          </div>
        </div>
        <div className="post-content">
          <div className="post-card-title">{title}</div>
          <div className="post-skills">
            {skills.map((skill) => (
              <p>#{skill}</p>
            ))}
          </div>
          <div className="post-card-date">{date}</div>
          <div className="reactions">
            <p>{"\u{1F44D}"}</p>
            <p>&#10084;</p>
            <p>{"\u{1F4A1}"}</p>
            <p>{"\u{1F914}"}</p>
            <p>{"\u{1F44E}"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
