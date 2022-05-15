import React, { useEffect, useState } from "react";
import "./interviewsManager.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllJobsUserAppliedTo } from "../../actions/userActions";
import { getAllUserInterviews } from "../../actions/interviewActions";

import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { motion } from "framer-motion";

import { AiFillLock, AiFillUnlock } from "react-icons/ai";

// Components
import Navbar from "../../components/Navbar/Navbar";
import SavedHeader from "../../components/SavedHeader/SavedHeader";
import Job from "../../components/Job/Job";
import LoadingJob from "../../components/LoadingJob/LoadingJob";


const InterviewsManager = ({ darkTheme, setDarkTheme }) => {
  const [todaysDate, setTodaysDate] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getAllJobsAppliedTo = useSelector((state) => state.getAllJobsAppliedTo);
  const { jobsAppliedTo, loading: loadingApplied } = getAllJobsAppliedTo;

  const userInterviewList = useSelector((state) => state.userInterviewList);
  const { usersInterviews, loading: loadingInterviews } = userInterviewList;

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const getToday = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;
    return today;
  };

  useEffect(() => {
    if (!userInfo) {
      history("/");
    }

    if (userInfo?.userType.toLowerCase() == "user") {
      dispatch(getAllJobsUserAppliedTo(userInfo?._id));
    } else if (userInfo?.userType.toLowerCase() == "employer") {
      dispatch(getAllUserInterviews(userInfo?._id));
    }
    setTodaysDate(getToday());
  }, []);

  // console.log(usersInterviews, "usersInterviews");

  // if (userInfo?.userType.toLowerCase() == "employer") {
  //   if (loadingInterviews) {
  //     return "Loading....";
  //   }
  // } else if (userInfo?.userType.toLowerCase() == "user") {
  //   if (loadingApplied) {
  //     return "Loading....";
  //   }
  // }

  return (
    <div
      className={darkTheme ? "interviews-manager dark" : "interviews-manager"}
    >
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <SavedHeader title="Interviews Manager" darkTheme={darkTheme} />
      <div className="interview-title">
        {userInfo?.userType.toLowerCase() == "employer" ? (
          <h1>You have {usersInterviews?.length} interviews scheduled</h1>
        ) : (
          <h1>You have {jobsAppliedTo?.length} interviews scheduled</h1>
        )}
      </div>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        mb={6}
        className={
          darkTheme ? "jobs-list-container dark" : "jobs-list-container"
        }
      >
        {userInfo?.userType.toLowerCase() == "employer" ? (
          <>
            {loadingInterviews ? (
              <LoadingJob />
            ) : (
              <>
                {usersInterviews?.map((job) => (
                  <div className="columns is-vcentered">
                    <div className="column is-7">
                      <Job
                        job={job}
                        id={job._id}
                        darkTheme={darkTheme}
                        page="applications"
                      />
                    </div>
                    <div className="column go-to-col has-text-centered">
                      {job.date !== todaysDate ? (
                        <Link
                          className="go-to-link button"
                          to={`/interview/${job._id}/lobby`}
                        >
                          <span className="go-to-text">Join lobby</span>
                          <span className="icon">
                            <BsFillArrowRightSquareFill />
                          </span>
                        </Link>
                      ) : (
                        <div className="go-to-link button no-hover">
                          <span className="go-to-text">
                            Room will be open on
                            <br />
                            {job.date}{" "}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <>
            {loadingApplied ? (
              <LoadingJob />
            ) : (
              <>
                {jobsAppliedTo?.map((job) => (
                  <div className="columns is-vcentered">
                    <div className="column is-7">
                      <Job
                        job={job}
                        id={job._id}
                        darkTheme={darkTheme}
                        page="applications"
                      />
                    </div>
                    <div className="column go-to-col has-text-centered">
                      {job.date !== todaysDate ? (
                        <Link
                          className="go-to-link button"
                          to={`/interview/${job._id}/lobby`}
                        >
                          <span className="go-to-text">Join lobby</span>
                          <span className="icon">
                            <BsFillArrowRightSquareFill />
                          </span>
                        </Link>
                      ) : (
                        <div className="go-to-link button no-hover">
                          <span className="go-to-text">
                            Room will be open on
                            <br />
                            {job.date}{" "}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default InterviewsManager;
