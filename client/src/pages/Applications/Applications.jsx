import React, { useEffect } from "react";
import "./applications.scss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUserInterviews } from "../../actions/interviewActions";
import { motion } from 'framer-motion';

// Components
import Navbar from "../../components/Navbar/Navbar";
import SavedHeader from "../../components/SavedHeader/SavedHeader";
import Job from "../../components/Job/Job";
import Loader from "../../components/Loader/Loader";

const Applications = ({ darkTheme, setDarkTheme }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userInterviewList = useSelector((state) => state.userInterviewList);
  const { usersInterviews } = userInterviewList;

  useEffect(() => {
    if (!userInfo || userInfo?.userType.toLowerCase() !== "employer") {
      history("/");
    } else {
      dispatch(getAllUserInterviews(userInfo?._id));
    }
  }, [history, userInfo, dispatch]);

  return (
    <div className={darkTheme ? "applications dark" : "applications"}>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <SavedHeader title="Applications" darkTheme={darkTheme} />
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        mb={6}
        className={
          darkTheme ? "jobs-list-container dark" : "jobs-list-container"
        }
      >
        <div className="jobs-list">
          {usersInterviews ? (
            <>
              {usersInterviews?.map((job) => (
                <Job job={job} id={job._id} darkTheme={darkTheme} page="applications" />
              ))}
            </>
          ) : (
            <Loader />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Applications;
