import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import "./PostDetails.css";
import axios from "axios";
import TagChip from "../editor/TagChip";
import AuthorInfo from "./AuthorInfo";

function PostDetails({ html, title, tags }) {
  const { id } = useParams();

  console.log(id);

  const [question, setQuestion] = useState({});
  // const location = useLocation();
  const date = new Date(question?.created_at);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  useEffect(() => {
    if (id) {
      // make a get request to localhost:3000/questions/:id using axois
      axios.get(`http://localhost:3000/questions/${id}`).then((res) => {
        console.log(res.data);
        // set the title and html to the title and content of the question
        setQuestion(res.data);
      });
    } else if (html && title) {
      setQuestion({
        title: title,
        content: html,
      });
    }
  }, []);

  console.log(question);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div></div>
      <div className="container q-detail">
        <AuthorInfo author={question.user}></AuthorInfo>
        <h1>{question ? question.title : null}</h1>
        <div className="post-details-date">{formattedDate}</div>
        <div className="tags">
          {question?.tags?.map((tag) => {
            return (
              <span key={tag.id} className="tag">
                <TagChip tag={tag.name}></TagChip>
              </span>
            );
          })}

          {tags?.map((tag) => {
            return (
              <span key={tag.id} className="tag">
                <TagChip tag={tag}></TagChip>
              </span>
            );
          })}
        </div>
        {question?.content ? parse(question.content) : null}
      </div>
    </div>
  );
}

export default PostDetails;