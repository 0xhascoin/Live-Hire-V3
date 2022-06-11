import React from "react";
import "./updateProfileNotification.scss";
import { Link } from "react-router-dom";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";

const UpdateProfileNotification = ({ darkTheme }) => {
  return (
    <Link
      className={
        darkTheme ? "notification dark-theme" : "notification light-theme"
      }
      to={'/account'}
    >
      <span>Update your profile</span>
      <span className="icon">
        <BsFillArrowUpRightSquareFill />
      </span>
    </Link>
  );
};

export default UpdateProfileNotification;
