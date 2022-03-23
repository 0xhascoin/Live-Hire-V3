import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./findJobs.scss";

// Components
import Navbar from "../../components/Navbar/Navbar";
import UpdateProfileNotification from "../../components/UpdateProfileNotification/UpdateProfileNotification";
import SearchHero from "../../components/SearchHero/SearchHero";
import JobsList from "../../components/JobsList/JobsList";

import { getAllInterviews } from "../../actions/interviewActions";
import { getIsUserProfileUpdated } from "../../actions/userActions";

const FindJobs = ({ darkTheme, setDarkTheme }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const history = useNavigate();

  const interviewList = useSelector((state) => state.interviewList);
  const { loading, interviews, error } = interviewList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [filteredInterviews, setFilteredInterviews] = useState(interviews);

  const searchHandler = (searchText) => {
    let result = [];
    if (interviews) {
      let filteredData = interviews.filter(function (obj) {
        let title = obj.jobTitle.toString();
        title.toLowerCase().includes(searchText.toLowerCase()) &&
          result.push(obj);
      });
    }
    setFilteredInterviews(result);
  };

  useEffect(() => {
    dispatch(getAllInterviews(page));
  }, []);

  useEffect(() => {
    console.log("Page changed to, ", page);
    dispatch(getAllInterviews(page));
  }, [page]);

  return (
    <div className={darkTheme ? "find-jobs dark" : "find-jobs light"}>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <UpdateProfileNotification darkTheme={darkTheme} />
      <SearchHero
        darkTheme={darkTheme}
        search={search}
        setSearch={setSearch}
        searchHandler={searchHandler}
      />
      <JobsList darkTheme={darkTheme} filteredInterviews={filteredInterviews} page={page} setPage={setPage} />
    </div>
  );
};

export default FindJobs;
