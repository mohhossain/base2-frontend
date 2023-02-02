import React, { useState } from "react";
import "./LoginSignup.css";

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    if (isLogin) {
      // Handle login logic here
    } else {
      // Handle sign up logic here
    }
  };

  return (

    <div className="container login-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
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
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
            </>
            
        
      )}
          <div>
            <h1>Hello, there!</h1>
              <hr></hr>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      {!isLogin && (
        <div>
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            onChange={e => setProfilePicture(e.target.files[0])}
          />
        </div>
      )}
      <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      {/* <button type="button" onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Sign Up" : "Login"}
      </button> */}
      {isLogin ? (<p>Don't have an account? <a onClick={()=>setIsLogin(false)}>Sign up</a></p>) : (<p>Already have an account? <a onClick={()=>setIsLogin(true)}>Login</a></p>)}
      
      </form>
      </div>
      
      <div>
        <h1>HEllo</h1>
      </div>
    </div>
    
  );
};

export default LoginSignUp;
