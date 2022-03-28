import React, { useState, useEffect } from 'react';
import './postJob.scss';

// Components
import Navbar from '../../components/Navbar/Navbar';
import SavedHeader from '../../components/SavedHeader/SavedHeader';
import PostJobPageOne from '../../components/PostJobPageOne/PostJobPageOne';
import PostJobPageTwo from '../../components/PostJobPageTwo/PostJobPageTwo';


const PostJob = ({ darkTheme, setDarkTheme }) => {
  const [page, setPage] = useState(2);
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [job, setJob] = useState({
    companyName: "",
    companyLogo: "",
    companyDescription: "",
    jobTitle: "",
    jobLength: "",
    jobLevel: "",
    jobDescription: "",
    jobDetails: {
      responsibilities: "",
      requirements: "",
      bonusSkills: ""
    },
    currency: "",
    minSalary: "",
    date: "",
    time: "",
    timezone: ""
  });

  useEffect(() => {
    console.log("selectedTimezone");
    setJob({ ...job, timezone: selectedTimezone.label });
  }, [selectedTimezone])

  return (
    <div className={darkTheme ? "post-job-container dark" : "post-job-container"}>
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <SavedHeader title="Post a job" darkTheme={darkTheme} />

        <div className={darkTheme ? "post-container dark" : "post-container"}>
            <h3 className="post-title">Create job listing</h3>
            {page == 1 && <PostJobPageOne darkTheme={darkTheme} job={job} setJob={setJob} page={page} setPage={setPage}/> }
            {page == 2 && <PostJobPageTwo darkTheme={darkTheme} job={job} setJob={setJob} page={page} setPage={setPage} selectedTimezone={selectedTimezone} setSelectedTimezone={setSelectedTimezone} /> }
        </div>
    </div>
  )
}

export default PostJob