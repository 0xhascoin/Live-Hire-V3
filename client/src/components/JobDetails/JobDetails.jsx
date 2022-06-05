import React from "react";
import "./jobDetails.scss";

import parse from 'html-react-parser';


const JobDetails = ({darkTheme, companyDescription, jobDetails}) => {
  return (
    <div className={darkTheme ? "job-details column is-8 dark" : "job-details column is-8"}>
      <h1 className="job-details-title">Company description</h1>
      <hr />
      <p className="job-details-subtitle">
        {companyDescription}
      </p>
      <div className="my-6"/>
      <h1 className="job-details-title">Job description</h1>
      <hr />
      <h1 className="job-details-title2">Responsibilities</h1>
      <p className="job-details-subtitle">
      {jobDetails.responsibilities}
      </p>
      <div className="my-6"/>
      <h1 className="job-details-title2">Requirements</h1>
      <p className="job-details-subtitle">
      {parse(jobDetails.requirements)}
      </p>
      <div className="my-6"/>
      <h1 className="job-details-title2">Bonus skills</h1>
      <p className="job-details-subtitle">
      {jobDetails.bonusSkills}
      </p>
    </div>
  );
};

export default JobDetails;
