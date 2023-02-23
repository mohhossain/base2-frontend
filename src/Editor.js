import React from "react";
import { useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import AWS from "aws-sdk";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import imageCompression from "browser-image-compression";
import "./Editor.css";
import Modal from "react-modal";
import PostDetails from "./PostDetails";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflowY: "scroll",
    maxHeight: "70vh",
  },
};

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

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

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

  const handlePreview = () => {
    setHtml(quillRef.current.getEditor().root.innerHTML);
    setIsOpen(true);
  };

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

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  return (
    <div>
      <div className="input-container">
        <form className="editor">
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="modal-content">
              {title && html ? (
                <>
                  <PostDetails html={html} title={title} />
                </>
              ) : (
                <h3>Nothing to preview</h3>
              )}
            </div>
          </Modal>
          {/* <Modal
            isOpen={modalIsOpen}
            className="preview-modal"
            onRequestClose={() => setIsOpen(false)}
            contentLabel="Example Modal"
          >
            <div className="modal-content">
              {title && html ? (
                <>
                  <PostDetails html={html} title={title} />
                </>
              ) : (
                <h3>Nothing to preview</h3>
              )}
            </div>
          </Modal> */}
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
        <div className="post-control-buttons">
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
          <button onClick={handlePreview} className="preview-button">
            Preview
          </button>
          {/* <button onClick={handleSubmit} className="submit-button">
            Delete
          </button> */}
        </div>
      </div>

      {/* <div className="container">{html ? parse(html) : null}</div> */}
    </div>
  );
}

export default Editor;
