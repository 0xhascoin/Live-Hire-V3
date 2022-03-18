import React, { useState } from "react";
import "./navbar.scss";

import { FaMoon } from "react-icons/fa";
import { RiSunLine } from "react-icons/ri";
import { MdImportantDevices } from "react-icons/md";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = ({ darkTheme, setDarkTheme }) => {
  const [showMenu, setShowMenu] = useState(true);
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
          <MdImportantDevices style={{ marginRight: "1rem" }} />
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
          <a className="navbar-item">
            <button
              className={darkTheme ? "post-job-button dark" : "post-job-button"}
            >
              Post job
            </button>
          </a>

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
            Saved Jobs
          </a>
          <a
            className={
              darkTheme
                ? "navbar-item navbar-item-dark"
                : "navbar-item navbar-item-light"
            }
          >
            About Us
          </a>
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
