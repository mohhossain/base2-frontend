import React, { useEffect, useContext } from "react";
import "./Dashboard.css";
import Post from "./Post";

import { UserContext } from "./context/UserContext";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  // add 5 random tech skills to the user
  let skills = ["HTML", "CSS", "JavaScript", "React", "Node"];

  // map the skills and return a p tag with the skill
  let skillsList = skills.map((skill) => {
    return <p>{skill}</p>;
  });

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="intro">
          <img
            className="profile-image"
            src={user?.profile_picture}
            alt="profile"
          />
          <div className="info">
            <h2>{user?.name}</h2>
            <p>@{user?.username}</p>
          </div>
        </div>
        {/* add 20px margin */}
        <h2>Bio</h2>
        <h3>"{user?.bio} some texts go here"</h3>
        <h2>Skills</h2>
        <div className="skills">{skillsList}</div>
      </div>
      <div className="profile-info"></div>

      <Post
        username="johndoe"
        fullName="John Doe"
        profilePicture="https://picsum.photos/200"
        title="Hello World"
        content="This is a sample post card. This is a sample post card.This is a sample post card.This is a sample post card.This is a sample post card.This is a sample post card.This is a sample post card.This is a sample post card.This is a sample post card.This is a sample post card.This is a sample post card.This is a sample post card."
        date="2023-02-09"
      />
    </div>
  );
}

export default Dashboard;
