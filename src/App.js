import "./App.css";
import { useState } from "react";
import Editor from "./Editor";
import UploadImageToS3WithNativeSdk from "./UploadImageToS3WithNativeSdk";

function App() {
  return (
    <div className="App">
      <Editor />
      {/* <UploadImageToS3WithNativeSdk></UploadImageToS3WithNativeSdk> */}
    </div>
  );
}

export default App;
