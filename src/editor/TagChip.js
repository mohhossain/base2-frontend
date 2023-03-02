import React from "react";

const TagChip = ({ tag }) => {
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
    >
      {tag}
    </div>
  );
};

export default TagChip;
