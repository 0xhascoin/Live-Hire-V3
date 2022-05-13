import React from "react";
import "./loadingJob.scss";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";

const job = {
  companyLogo:
    "https://img.buzzfeed.com/buzzfeed-static/static/2020-03/5/23/enhanced/25a67c968a0a/enhanced-262-1583449224-1.png?output-format=jpg&output-quality=auto",
  title: "...",
  companyDescription: "",
  companyName: "V7 labs",
  jobTitle: "",
  minSalary: "",
  applicationsCount: "",
  date: "",
};

const LoadingJob = () => {
  return (
    <div className="job box">
      <img className="img" src={job.companyLogo} />
      <h5 className="job-title">{job.title}</h5>
      <p className="job-desc">
        {job.companyDescription.length > 150
          ? job.companyDescription.substring(0, 150) + "...."
          : job.companyDescription + "...."}
      </p>
      <div className="job-tags">
        <button className="company-name-tag"></button>
        <button className="company-name-tag"></button>
        <button className="company-name-tag salary"></button>
        <button className="company-name-tag applied"></button>
        <button className="company-name-tag applied"></button>
      </div>
    </div>
  );
};

export default LoadingJob;
