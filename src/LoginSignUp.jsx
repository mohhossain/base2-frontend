import React, { useState } from "react";
import "./LoginSignup.css";
import axios from "axios";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [signUpClass, setSignUpClass] = useState("signUpClass");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }
    // formData.append("profile_picture", profilePicture);
    formData.append("username", username);
    if (isLogin) {
      console.log(email, password);
      axios
        .post("http://127.0.0.1:3000/login", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          setErrors(error.response.data.errors);
          console.log(error.response.data.errors);
        });
      // Handle login logic here
    } else {
      console.log(formData.profile_picture);
      axios
        .post("http://127.0.0.1:3000/signup", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          setErrors(error.response.data.errors);
          console.log(error.response.data.errors);
        });

      // Handle sign up logic here
    }
  };

  return (
    <div className="container login-container">
      <div className="form-container">
        {/* <h1 style={{fontSize: "5vw", margin: "0px"}}>{"</>"}</h1> */}
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Close_tag_icon.svg/1200px-Close_tag_icon.svg.png"></img> */}
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          {!isLogin && (
            <>
              <h1>Let's get you started..</h1>
              <hr></hr>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </>
          )}
          <div>
            {isLogin && (
              <>
                <h1>Hello, there 👋!</h1>
                <hr></hr>
              </>
            )}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isLogin && (
            <div>
              <label>Profile Picture</label>
              <br></br>
              <input
                className="profilePicture"
                type="file"
                accept="image/*"
                id="profilePicture"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </div>
          )}

          {errors
            ? errors?.map((error) => <p className="error">{error}</p>)
            : null}
          <button type="submit" className={signUpClass}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
          {/* <button type="button" onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Sign Up" : "Login"}
      </button> */}
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <a
                onClick={() => {
                  setIsLogin(false);
                  setSignUpClass("signUpClass");
                }}
              >
                <strong>Sign up</strong>
              </a>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <a
                onClick={() => {
                  setSignUpClass("");
                  setIsLogin(true);
                }}
              >
                <strong>Login</strong>
              </a>
            </p>
          )}
        </form>
      </div>

      <div className="content">
        {/* <h1></h1> */}
        <Player
          autoplay
          loop
          src="https://assets2.lottiefiles.com/packages/lf20_iVPQC8jyX2.json"
          style={{ height: "500px", width: "500px" }}
        ></Player>
      </div>
    </div>
  );
};

export default LoginSignUp;
