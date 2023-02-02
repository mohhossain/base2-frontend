import "./App.css";
import { useState } from "react";
import Editor from "./Editor";
import LoginSignUp from "./LoginSignUp";

function App() {
  return (
    <div className="App">
      <div className="l-container">
        <LoginSignUp />
      </div>
      {/* <Editor /> */}
    </div>
  );
}

export default App;
