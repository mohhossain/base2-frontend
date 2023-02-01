import React from "react";
import { useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import AWS from "aws-sdk";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";

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
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const closeModal = () => {
    setShowModal(false);
  };

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket
      .putObject(params)
      //   .on("httpUploadProgress", (evt) => {
      //     setProgress(Math.round((evt.loaded / evt.total) * 100));
      //   })
      .send((err) => {
        if (err) console.log(err);
        else {
          myBucket.getSignedUrl(
            "getObject",
            { Bucket: S3_BUCKET, Key: file.name },
            (err, url) => {
              if (err) console.log(err);
              else {
                console.log(url);
                setImageUrl(url);
              }
            }
          );
        }
      });
  };

  const imageHandler = (url) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];

      const params = {
        ACL: "public-read",
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
      };

      myBucket
        .putObject(params)
        //   .on("httpUploadProgress", (evt) => {
        //     setProgress(Math.round((evt.loaded / evt.total) * 100));
        //   })
        .send((err) => {
          if (err) console.log(err);
          else {
            myBucket.getSignedUrl(
              "getObject",
              { Bucket: S3_BUCKET, Key: file.name },
              (err, url) => {
                if (err) console.log(err);
                else {
                  console.log("this is the url: " + url);
                  setImageUrl(url);
                  quillRef.current?.getEditor().insertEmbed(null, "image", url);
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
  };

  return (
    <div>
      <ReactQuill ref={quillRef} modules={modules} />
      <button onClick={handleSubmit}>Submit</button>
      <div>{html ? parse(html) : null}</div>
    </div>
  );
}

export default Editor;
