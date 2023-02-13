import React from "react";
// import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";

function PostDetails() {
  const location = useLocation();
  console.log(location.state.question);
  return <div>{parse(location.state.question.content)}</div>;
}

export default PostDetails;
