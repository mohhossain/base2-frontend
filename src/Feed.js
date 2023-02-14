import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import "./Feed.css";

function Feed() {
  const [questions, setQuestions] = useState([]);
  // fetch all the questions using useEffect from localhost:3000/questions
  useEffect(() => {
    axios.get("http://localhost:3000/questions").then((res) => {
      console.log(res.data);
      setQuestions(res.data);
    });
  }, []);
  return (
    <div className="profile-container">
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
