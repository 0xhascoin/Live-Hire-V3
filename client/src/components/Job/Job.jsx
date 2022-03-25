import React, { useEffect } from "react";
import "./job.scss";

import { BsFillArrowUpRightSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThatApplied } from "../../actions/interviewActions";

const Job = ({ darkTheme, job, id, page }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getUsersThatApplied = useSelector((state) => state.getUsersThatApplied);
  const { usersThatApplied } = getUsersThatApplied;

  useEffect(() => {
    dispatch(getAllUsersThatApplied(id));
  }, []);

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <>
    {page !== "applications" ? (
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
        <button className="company-name-tag applied">Date: {job.date}</button>
      </div>
      <BsFillArrowUpRightSquareFill className="icon" />
    </Link>
    ) : (
<div className={!darkTheme ? "job" : "job dark"}>
  <Link to={`/job/${id}`}>
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
        <button className="company-name-tag applied">Date: {job.date}</button>
      </div>
      </Link>
      {page === "applications" && (
        <div className="applications-container">
          <h2 className="applications-title">Applications: {usersThatApplied?.length}</h2>
          {usersThatApplied?.map((application) => (
            <button className="company-name-tag">
              {toTitleCase(application.name)}<br />
              {application.userCV?.githubUrl && <a href={`http://github.com/${application.userCV?.githubUrl}`}>Github</a>}<br />
              {application.userCV?.twitterUrl && <a href={`http://twitter.com/${application.userCV?.twitterUrl}`}>Twitter</a>}
            </button>
          ))}
        </div>
      )}
      <BsFillArrowUpRightSquareFill className="icon" />
    </div>
    )}
    </>
    
  );
};

export default Job;
