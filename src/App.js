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
  const { user } = React.useContext(UserContext);
  console.log(user);
  // const token = localStorage.getItem("token");

  // if there is a token in local storage, set the user
  // React.useEffect(() => {
  //   if (token) {
  //     // fetch to /me to get the user using axios
  //     axios
  //       .get("http://localhost:3000/me", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         // set the user
  //         setUser(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, []);
  return (
    <div className="App">
      <div className="l-container">
        {/* <LoginSignUp />
         */}

        {/* set up the routes */}
        {/* <UserContextProvider> */}
          <Routes>
            {user ? (
              <Route path="/profile" element={<Dashboard />} />
            ) : (
              <>
                <Route path="/" element={<LoginSignUp />} />
                <Route path="/editor" element={<Editor />} />
              </>
            )}
            <Route path="*" element={<Error />} />
            {/* <Route path="/profile" element={<Dashboard />} /> */}
          </Routes>
        {/* </UserContextProvider> */}
        {/* <Editor /> */}
      </div>
      {/* <Editor /> */}
    </div>
  );
}

export default App;
