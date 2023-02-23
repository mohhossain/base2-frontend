import React from "react";
// import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import "./PostDetails.css";

function PostDetails({ html, title }) {
  const location = useLocation();
  // console.log(location.state.question);
  return (
    <div>
      <div className="container q-detail">
        <h1>{title ? title : location.state.question.title}</h1>
        {/* {parse(location.state.question.content)} */}

        {html ? parse(html) : parse(location.state.question.content)}
      </div>
    </div>
  );
}

export default PostDetails;
