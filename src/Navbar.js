import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "./context/UserContext";
import { BsPencilSquare } from "react-icons/bs";
import { SlLogin } from "react-icons/sl";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            base2
          </Link>
        </div>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search"
            className={isOpen ? "hidden" : ""}
          />
        </div>
        <div className="navbar-links">
          {user ? (
            <>
              <div className="profile">
                <div className="profile-and-post">
                  <a href="/editor">
                    <BsPencilSquare className="create-icon" />
                  </a>
                  <img
                    className="post-card-profile-picture"
                    onClick={toggleProfileDropdown}
                    src={user?.profile_picture}
                  />
                </div>

                <div
                  className={`profile-dropdown ${isProfileOpen ? "open" : ""}`}
                >
                  {/* profile info */}
                  <div className="profile">
                    <img
                      className="profile-picture"
                      src={user?.profile_picture}
                    />
                    <div className="profile-info-text">
                      <h4>{user?.name}</h4>
                      <p>@{user?.username}</p>
                    </div>

                    <hr></hr>

                    <button>
                      <Link to="/profile">View Profile</Link>
                    </button>
                  </div>
                  <Link to="/profile"></Link>
                </div>
              </div>
            </>
          ) : (
            <SlLogin className="create-icon" />
          )}
        </div>
        <div className="navbar-icons">
          <button onClick={toggleDrawer} className="navbar-icon">
            &#9776;
          </button>
        </div>
      </div>
      <div className={`navbar-drawer ${isOpen ? "open" : ""}`}>
        <a href="/profile">Profile</a>
        <a href="/editor">Create Post</a>
      </div>
    </nav>
  );
};

export default Navbar;
