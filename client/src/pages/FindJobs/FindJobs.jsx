import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./findJobs.scss";

// Components
import Navbar from "../../components/Navbar/Navbar";
import UpdateProfileNotification from "../../components/UpdateProfileNotification/UpdateProfileNotification";
import SearchHero from "../../components/SearchHero/SearchHero";
import JobsList from "../../components/JobsList/JobsList";

// import { getAllInterviews } from '../../actions/interviewActions';
// import { getIsUserProfileUpdated } from '../../actions/userActions';


const FindJobs = ({ darkTheme, setDarkTheme }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  // const interviewList = useSelector((state) => state.interviewList);
  // const { loading, interviews, error } = interviewList;

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // const [filteredInterviews, setFilteredInterviews] = useState(interviews);

  // useEffect(() => {
  //   dispatch(getAllInterviews());
  // }, []);

  return (
    <div className={darkTheme ? "find-jobs dark" : "find-jobs light"}>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <UpdateProfileNotification darkTheme={darkTheme} />
      <SearchHero darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <JobsList darkTheme={darkTheme} />
    </div>
  );
};

export default FindJobs;
