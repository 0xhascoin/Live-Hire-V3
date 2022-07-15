import React, { useState, useEffect } from "react";
import "./navbar.scss";

import { FaMoon } from "react-icons/fa";
import { RiSunLine } from "react-icons/ri";
import { MdImportantDevices } from "react-icons/md";
import {
  AiOutlinePlayCircle,
  AiFillCaretUp,
  AiFillCaretDown,
} from "react-icons/ai";
import Logo from './L.png';

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

const Navbar = ({ darkTheme, setDarkTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getAllJobsAppliedTo = useSelector((state) => state.getAllJobsAppliedTo);
  const { jobsAppliedTo } = getAllJobsAppliedTo;

  // Logout function
  const logoutHandler = () => {
    dispatch(logout()); // Calls the Logout function in Redux
    history("/"); // Push the user to the Home Page
  };

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  useEffect(() => {
    if(location.pathname.substring(0, 16) === "/interview/room/") {
      // console.log("===========================")
      // console.log(location, 'Location changed');
      // console.log(location.pathname, 'Location changed');
      // console.log(location.pathname.substring(0, 16));
      sessionStorage.setItem("locationChanged", true);
    } else {
      if(sessionStorage.getItem("locationChanged")) {
        sessionStorage.removeItem("locationChanged")
        window.location.reload();
      }
    }

    // console.log(location.pathname.substring(0, 16), "Location PATHNAME")
  }, [location]);

  // useEffect(() => {

  // })

  // console.log(jobsAppliedTo?.length, "jobsAppliedTo");

  return (
    <nav
      className={darkTheme ? "navbar navbar-dark" : "navbar navbar-light"}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link
          to="/"
          className="navbar-item"
          style={
            darkTheme
              ? { color: "rgba(255, 255, 255, 0.92)" }
              : { color: "#1A202C" }
          }
        >
          {/* <MdImportantDevices style={{ marginRight: "1rem" }} /> */}
          <img src={Logo} style={{marginRight: "1rem", borderRadius: '3px'}}/>
          Live Hire
        </Link>

        
        {!darkTheme ? (
          <FaMoon
            className="navbar-burger dark-theme-button"
            onClick={() => setDarkTheme(!darkTheme)}

          />
        ) : (
          <RiSunLine
            className="navbar-burger light-theme-button"
            onClick={() => setDarkTheme(!darkTheme)}
          />
        )}
        

        <a
          role="button"
          className={
            showMenu
              ? "navbar-burger is-active burger-button"
              : "navbar-burger burger-button"
          }
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setShowMenu(!showMenu)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={showMenu ? "navbar-menu is-active" : "navbar-menu"}
      >
        <div className="navbar-end">
          <Link className="navbar-item" to="/post">
            <button
              className={darkTheme ? "post-job-button dark" : "post-job-button"}
            >
              Post job
            </button>
          </Link>

          <Link
            to="/"
            className={
              darkTheme
                ? "navbar-item navbar-item-dark"
                : "navbar-item navbar-item-light"
            }
          >
            Find Jobs
          </Link>
          <a
            className={
              darkTheme
                ? "navbar-item navbar-item-dark"
                : "navbar-item navbar-item-light"
            }
          >
            About Us
          </a>
          {!userInfo && (
            <>
              <Link
                to="/register"
                className={
                  darkTheme
                    ? "navbar-item navbar-item-dark"
                    : "navbar-item navbar-item-light"
                }
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className={
                  darkTheme
                    ? "navbar-item navbar-item-dark"
                    : "navbar-item navbar-item-light"
                }
              >
                Login
              </Link>
            </>
          )}

          {userInfo && (
            <div
            className={
                showDropdown
                  ? "navbar-item dropdown is-active"
                  : "navbar-item dropdown"
              }
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="dropdown-trigger">
                <button
                  className={darkTheme ? "button dark" : "button"}
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                >
                  <span className="first-letter">
                    <p>{userInfo?.name[0].toUpperCase()}</p>
                  </span>
                  <span>{toTitleCase(userInfo?.name)}</span>
                  <span className="icon is-small">
                    {showDropdown ? <AiFillCaretUp /> : <AiFillCaretDown />}
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  {userInfo?.userType.toLowerCase() === "user" && (
                    <Link to="/saved" className="dropdown-item">
                      Saved jobs{" "}
                      <span className="count">{jobsAppliedTo?.length}</span>
                    </Link>
                  )}
                  {userInfo?.userType.toLowerCase() === "employer" && (
                    <Link to="/applications" className="dropdown-item">
                      Applications
                    </Link>
                  )}
                  <Link to="/manage/interviews" className="dropdown-item">
                    Interview Manager
                  </Link>
                  {userInfo?.userType.toLowerCase() === "user" && (
                    <Link to="/account" className="dropdown-item">
                      Update Profile
                    </Link>
                  )}
                  <a href="#" className="dropdown-item" onClick={logoutHandler}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          )}
        
          {!darkTheme ? (
            <a className="navbar-item">
              <button
                className="dark-theme-button"
                onClick={() => setDarkTheme(!darkTheme)}
              >
                <FaMoon />
              </button>
            </a>
          ) : (
            <a className="navbar-item">
              <button
                className="light-theme-button"
                onClick={() => setDarkTheme(!darkTheme)}
              >
                <RiSunLine />
              </button>
            </a>
          )}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
