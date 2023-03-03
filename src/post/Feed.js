import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import "./Feed.css";
import { useParams } from "react-router-dom";

function Feed() {
  const [questions, setQuestions] = useState([]);
  const { tag } = useParams();
  // fetch all the questions using useEffect from localhost:3000/questions
  useEffect(() => {
    // if tag starts with a #, remove the # and set it to a variable
    if (tag && tag.startsWith("#")) {
      tag = tag.slice(1);
    }
    {
      tag
        ? axios.get(`http://127.0.0.1:3000/tags/${tag}`).then((res) => {
            console.log(res.data);
            setQuestions(res.data);
          })
        : axios.get("http://127.0.0.1:3000/questions").then((res) => {
            console.log(res.data);
            setQuestions(res.data);
          });
    }
  }, [tag]);
  return (
    <div className="profile-container">
      {tag && <h1 className="display-tag">#{tag}</h1>}
      {questions &&
        questions.map((question) => {
          return (
            <Post
              username={question.user.username}
              profile_picture={question.user.profile_picture}
              name={question.user.name}
              question={question}
            ></Post>
          );
        })}
    </div>
  );
}

export default Feed;
