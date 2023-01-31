import React from "react";
import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor() {
  const [content, setContent] = useState(null);
  const quillRef = useRef(null);

  const imageHandler = (a) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];

      // file type is only image.
      if (/^image\//.test(file.type)) {
        quillRef.current.getEditor().insertEmbed(null, "image", file.path);
      } else {
        console.warn("You could only upload images.");
      }
    };
  };
  //   react quill modules
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["code-block"],
        ["image"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  return (
    <div>
      <ReactQuill ref={quillRef} modules={modules}></ReactQuill>
    </div>
  );
}

export default Editor;
