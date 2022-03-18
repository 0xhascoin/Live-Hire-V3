import React, { useState } from 'react'
import './findJobs.scss';

// Components
import Navbar from '../../components/Navbar/Navbar';
import SearchHero from '../../components/SearchHero/SearchHero';
import Job from '../../components/Job/Job';

const FindJobs = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <div className={darkTheme ? "find-jobs dark" : "find-jobs light"}>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
    </div>
  )
}

export default FindJobs