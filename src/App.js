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

function App() {
  // get user and setUser from the UserContext\
  // const { user, setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="App">
      {/* set up the routes */}
      <Routes>
        {user ? (
          <>
            <Route path="/profile" element={<Dashboard />} />
            <Route path="/editor" element={<Editor />} />
            {/* <Route path="/posts" element={}></Route> */}
          </>
        ) : (
          <>
            <Route path="/" element={<LoginSignUp />} />
          </>
        )}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
