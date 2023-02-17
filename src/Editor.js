import React from "react";
import { useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import AWS from "aws-sdk";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import imageCompression from "browser-image-compression";
import "./Editor.css";

const S3_BUCKET = "thebase2stuffs";
const REGION = "us-east-1";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

function Editor() {
  const [content, setContent] = useState(null);
  const [html, setHtml] = useState(null);
  const quillRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [title, setTitle] = useState(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];

      console.log("file name: " + file.name);

      const params = {
        ACL: "public-read",
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
      };

      myBucket.putObject(params).send((err) => {
        if (err) console.log(err);
        else {
          myBucket.getSignedUrl(
            "getObject",
            { Bucket: S3_BUCKET, Key: file.name },
            (err, url) => {
              if (err) console.log(err);
              else {
                console.log("this is the url: " + url);
                console.log(
                  "this is alternate url: " +
                    `https://thebase2stuffs.s3.amazonaws.com/${file.name}`
                );
                setImageUrl(url);
                quillRef.current
                  ?.getEditor()
                  .insertEmbed(
                    null,
                    "image",
                    `https://thebase2stuffs.s3.amazonaws.com/${file.name}`
                  );
              }
            }
          );
        }
      });
    };
  };
  //   react quill modules
  const modules = useMemo(
    () => ({
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
    }),
    []
  );

  const handleSubmit = () => {
    console.log("clicked");
    setContent(quillRef.current.getEditor().getText());
    console.log(quillRef.current.getEditor().root.innerHTML);
    setHtml(quillRef.current.getEditor().root.innerHTML);

    // make a post request to the server
    axios
      .post(
        "http://localhost:3000/post",
        {
          title,
          content: quillRef.current.getEditor().root.innerHTML,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <div className="input-container">
        <form className="editor" >
          <input
            type="text"
            name="name"
            className="CodeMirror title"
            placeholder="This is the title....."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
          <ReactQuill
            className="CodeMirror"
            ref={quillRef}
            modules={modules}
            placeholder="Type your content here..."
          />
        </form>
      </div>
      <button onClick={handleSubmit} className="submit-button">Submit</button>

      <div className="container">{html ? parse(html) : null}</div>
    </div>
  );
}

export default Editor;
