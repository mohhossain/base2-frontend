import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import "./Comment.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function CommentList({ post_id }) {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    console.log(post_id, "this is the post id");
    axios
      .get(`http://localhost:3000/answers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // make a axios post request to http://127.0.0.1:3000/answers
    // with the content of the comment and the post_id

    try {
      axios
        .post(
          "http://127.0.0.1:3000/answers",
          {
            content: content,
            question_id: post_id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          // setNewComment(res.data);

          setComments([res.data, ...comments]);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form type="submit">
        <textarea
          placeholder="What are you thinking?.."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </form>
      {/* maps the comments and render the comment component */}
      {comments?.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

export default CommentList;
