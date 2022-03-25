import React from "react";
import "./job.scss";

import { BsFillArrowUpRightSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Job = ({ darkTheme, job, id }) => {

  return (
    <Link to={`/job/${id}`} className={!darkTheme ? "job" : "job dark"}>
      <img className="img" src={job.companyLogo} />
      <h5 className="job-title">{job.title}</h5>
      <p className="job-desc">
        {job.companyDescription.length > 150
          ? job.companyDescription.substring(0, 150) + "...."
          : job.companyDescription + "...."}
      </p>
      <div className="job-tags">
        <button className="company-name-tag">{job.companyName}</button>
        <button className="company-name-tag">{job.jobTitle}</button>
        <button className="company-name-tag salary">${job.minSalary}</button>
        <button className="company-name-tag applied">
          {job.applicationsCount} Applied
        </button>
        <button className="company-name-tag applied">
          Date: {job.date}
        </button>
      </div>
      <BsFillArrowUpRightSquareFill className="icon" />
    </Link>
  );
};

export default Job;
