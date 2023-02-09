import React from "react";
import "./Post.css";
const Post = ({ username, fullName, profilePicture, title, content, date }) => {
  return (
    <div className="post-card-container">
      <div className="post-card-header">
        <img src={profilePicture} className="post-card-profile-picture" />
        <div className="post-card-header-text">
          <div className="post-card-username">{fullName}</div>
          <div className="post-card-full-name">{username}</div>
        </div>
      </div>
      <div className="post-card-title">{title}</div>
      {/* <div className="post-card-content">{content}</div> */}
      <div className="post-card-date">{date}</div>
    </div>
  );
};

export default Post;
