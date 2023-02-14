import "./App.css";
import React, { useState, useContext } from "react";
import Editor from "./Editor";
import LoginSignUp from "./LoginSignUp";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import { UserContext } from "./context/UserContext";
import { UserContextProvider } from "./context/UserContext";
import axios from "axios";
import Error from "./Error";
import PostDetails from "./PostDetails";
import Feed from "./Feed";
import Navbar from "./Navbar";

function App() {
  // get user and setUser from the UserContext\
  // const { user, setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="App">
      <Navbar></Navbar>
      {/* set up the routes */}
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Dashboard />} />
            <Route path="/editor" element={<Editor />} />
            {/* <Route path="/posts" element={}></Route> */}
            <Route path="/posts/:id" element={<PostDetails />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/posts/:id" element={<PostDetails />} />
          </>
        )}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
