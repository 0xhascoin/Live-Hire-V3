import React from "react";
import "./updateProfileNotification.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";

const UpdateProfileNotification = ({ darkTheme }) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={
        darkTheme ? "notification dark-theme" : "notification light-theme"
      }
    >
      <Link to='/account'>
        <span>Update your profile</span>
        <span className="icon">
          <BsFillArrowUpRightSquareFill />
        </span>
      </Link>
    </motion.div>
  );
};

export default UpdateProfileNotification;
