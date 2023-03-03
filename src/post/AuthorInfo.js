import React from "react";
import "./AuthorInfo.css";

const AuthorInfo = ({ author }) => {
  return (
    <div className="author-info">
      <img
        src={author?.profile_picture}
        alt={author?.username}
        className="author-avatar"
      />
      <div className="author-details">
        <h3 className="author-username">@{author?.username}</h3>
        <p className="author-name">{author?.name}</p>
      </div>
    </div>
  );
};

export default AuthorInfo;
