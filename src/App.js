import "./App.css";
import { useState } from "react";
import Editor from "./Editor";

function App() {
  return (
    <div className="App">
      <Editor />
      {/* <UploadImageToS3WithNativeSdk></UploadImageToS3WithNativeSdk> */}
    </div>
  );
}

export default App;
