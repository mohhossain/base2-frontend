import React from "react";
import "./Dashboard.css";

function Dashboard() {
  let user = {
    username: "amandaKlaasen",
    email: "amanda@microsoft.com",
    bio: "I am a software engineer at Microsoft",
    profile_picture:
      "https://www.american.edu/uploads/profiles/large/Stephen_Kostyo_006arw.JPG",
  };
  return (
    <div
      style={{
        backgroundColor: "#f1f1f1",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <div className="">
        {/* <h1>Dashboard</h1> */}
        <div className="profile">
          <div className="intro">
            <img id="profile-image" src={user.profile_picture} alt="profile" />
            <h1>@{user.username}</h1>
            <p style={{ fontSize: "20px", color: "rgb(98, 98, 98)" }}>
              {user.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
