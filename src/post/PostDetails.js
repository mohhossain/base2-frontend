import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import "./PostDetails.css";
import axios from "axios";
import TagChip from "../editor/TagChip";

function PostDetails({ html, title, tags }) {
  const { id } = useParams();

  console.log(id);

  const [question, setQuestion] = useState({});
  const location = useLocation();

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
    <div>
      <div className="container q-detail">
        <h1>{question ? question.title : null}</h1>
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
