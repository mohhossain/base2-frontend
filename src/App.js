import "./App.css";
import { useState } from "react";
import Editor from "./Editor";
import LoginSignUp from "./LoginSignUp";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="App">
      <div className="l-container">
        {/* <LoginSignUp />
         */}

        {/* set up the routes */}
        <Routes>
          <Route path="/" element={<LoginSignUp />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/profile" element={<Dashboard />} />
        </Routes>
        {/* <Editor /> */}
      </div>
      {/* <Editor /> */}
    </div>
  );
}

export default App;
