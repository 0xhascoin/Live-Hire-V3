import React, { useState } from 'react'
import './findJobs.scss';


// Components
import Navbar from '../../components/Navbar/Navbar';
import UpdateProfileNotification from '../../components/UpdateProfileNotification/UpdateProfileNotification';
import SearchHero from '../../components/SearchHero/SearchHero';
import JobsList from '../../components/JobsList/JobsList';
import Job from '../../components/Job/Job';

const FindJobs = ({ darkTheme, setDarkTheme }) => {
  return (
    <div className={darkTheme ? "find-jobs dark" : "find-jobs light"}>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <UpdateProfileNotification darkTheme={darkTheme} />
      <SearchHero darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <JobsList darkTheme={darkTheme} />
    </div>
  )
};

export default FindJobs