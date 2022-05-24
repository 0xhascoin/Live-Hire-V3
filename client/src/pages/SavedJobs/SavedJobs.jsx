import React, { useEffect } from "react";
import "./savedJobs.scss";

import { useDispatch, useSelector } from "react-redux";
import { getAllJobsUserAppliedTo } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


// Components
import Navbar from "../../components/Navbar/Navbar";
import SavedHeader from "../../components/SavedHeader/SavedHeader";
import Job from "../../components/Job/Job";
import Loader from "../../components/Loader/Loader";
import LoadingJob from "../../components/LoadingJob/LoadingJob";

const SavedJobs = ({ darkTheme, setDarkTheme }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getAllJobsAppliedTo = useSelector((state) => state.getAllJobsAppliedTo);
  const { jobsAppliedTo, loading } = getAllJobsAppliedTo;

  useEffect(() => {
    if (!userInfo || userInfo?.userType.toLowerCase() !== "user") {
      history("/");
    } else {
      dispatch(getAllJobsUserAppliedTo(userInfo?._id));
    }
  }, [history, userInfo, dispatch]);

  return (
    <div
      className={
        darkTheme ? "saved-jobs-container dark" : "saved-jobs-container"
      }
    >
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <SavedHeader title="Saved jobs" darkTheme={darkTheme} />
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
          {loading ? (
                      <>          
                      <LoadingJob />
                      <LoadingJob />
                      </>
          ) : (
            <>
            {jobsAppliedTo?.map((job) => (
              <Job darkTheme={darkTheme} job={job} id={job._id} key={job._id} />
            ))}
          </>
          )}
          {/* {jobsAppliedTo ? (
            <>
              {jobsAppliedTo?.map((job) => (
                <Job darkTheme={darkTheme} job={job} id={job._id} />
              ))}
            </>
          ) : (
            <Loader />
          )} */}
        </div>
      </motion.div>
    </div>
  );
};

export default SavedJobs;
