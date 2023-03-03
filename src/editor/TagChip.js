import React from "react";
import { useNavigate } from "react-router-dom";

const TagChip = ({ tag }) => {
  const navigate = useNavigate();
  const handleTagClick = () => {
    tag = tag.startsWith("#") ? tag.slice(1) : tag;
    navigate(`/tags/${tag}`, { state: { tag } });
  };
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: "#ECECEC",
        borderRadius: "16px",
        padding: "4px 12px",
        margin: "4px",
        fontSize: "16px",
        fontWeight: "500",
        color: "#555555",
      }}
      onClick={handleTagClick}
    >
      {tag}
    </div>
  );
};

export default TagChip;
