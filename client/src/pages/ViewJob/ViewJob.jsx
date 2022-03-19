import React from "react";
import "./viewJob.scss";

// Components
import Navbar from "../../components/Navbar/Navbar";
import JobHeader from "../../components/JobHeader/JobHeader";
import JobBanner from "../../components/JobBanner/JobBanner";
import JobDetails from "../../components/JobDetails/JobDetails";
import JobApply from "../../components/JobApply/JobApply";

const ViewJob = ({ darkTheme, setDarkTheme }) => {
  return (
    <div className="view-job-container">
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <JobHeader />
      <JobBanner />
      <div className="columns">
        <JobDetails />
        <JobApply />
      </div>
    </div>
  );
};

export default ViewJob;
