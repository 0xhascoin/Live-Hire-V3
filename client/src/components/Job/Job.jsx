import React from "react";
import "./job.scss";

import { BsFillArrowUpRightSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Job = ({ darkTheme, job, key }) => {
  return (
    <Link to={`/job/${key}`} className={!darkTheme ? "job" : "job dark"}>
      <img className="img" src={job.logo} />
      <h5 className="job-title">{job.title}</h5>
      <p className="job-desc">{job.description}</p>
      <div className="job-tags">
        <button className="company-name-tag">{job.companyName}</button>
        <button className="company-name-tag salary">${job.salary}</button>
        <button className="company-name-tag applied">
          {job.applicationCount} Applied
        </button>
      </div>
      <BsFillArrowUpRightSquareFill className="icon" />
    </Link>
  );
};

export default Job;
