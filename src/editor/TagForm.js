import React, { useState } from "react";
import TagChip from "./TagChip";
import "./TagForm.css";

function TagForm({ tagsList, setTagsList }) {
  const [inputValue, setInputValue] = useState("");
  // const [tagsList, setTagsList] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value.trim();

    if (value.indexOf(" ") > -1) {
      setInputValue(value.substring(0, value.indexOf(" ")));
    } else {
      setInputValue(value);
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && inputValue) {
      if (inputValue.startsWith("#")) {
        setTagsList([...tagsList, inputValue]);
        setInputValue("");
      } else {
        alert("Tags must start with '#'!");
      }
    }
  };

  return (
    <div className="input-container">
      <input
        className="tag-input"
        type="text"
        placeholder="Type a tag..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {tagsList.map((tag) => (
          <TagChip key={tag} tag={tag}></TagChip>
        ))}
      </div>
    </div>
  );
}

export default TagForm;
