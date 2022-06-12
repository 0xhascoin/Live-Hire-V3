import React, { useState } from "react";
import "./postJobPageThree.scss";
import parse from 'html-react-parser';

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {createInterviewAction} from "../../actions/interviewActions";

const PostJobPageThree = ({
  darkTheme,
  job,
  setJob,
  page,
  setPage,
  setSelectedTimezone,
  selectedTimezone,
}) => {
  
  const history = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [imageUrl, setImageUrl] = useState("")

  const createInterview = (e) => {
    e.preventDefault();
    dispatch(
         createInterviewAction(
          job.companyName,
          job.companyLogo,
          job.companyDescription,
          job.jobTitle,
          job.jobLength,
          job.jobLevel,
          job.jobDetails,
          job.currency,
          job.minSalary,
          userInfo.name,
          job.date,
          job.time,
          job.timezone
        )
      );
      setPage(page+1);
  }

  return (
    <div
      className={
        darkTheme ? "page-three-container dark" : "page-three-container"
      }
    >
      <h2 className="page-three-title">Job post preview</h2>
      <hr />
      <div className="page-three-form">
        <img src={job.companyLogo} style={{height: '60px', width: '60px'}} />
        <h2 className="job-title">
          {job.jobTitle} - <span className="job-length">{job.jobLength}</span>
        </h2>
        <h2 className="job-companyName">
          {job.companyName} -{" "}
          <span className="job-salary">
            {job.currency}
            {job.minSalary}
          </span>
        </h2>
        <h2 className="job-date-time">
          {job.date} at <span className="job-time">{job.time}</span> -{" "}
          {job.timezone}
        </h2>
        {/* <hr /> */}
        <div style={{padding: '1rem'}} />
        <h1 className="job-companyDescription-title">Company Description</h1>
        <h2 className="job-companyDescription">{parse(job.companyDescription)}</h2>
        {/* <h1 className="job-companyDescription-title">Responsibilities</h1>
        <h2 className="job-companyDescription">{job.jobDetails?.responsibilities}</h2> */}
        <div style={{padding: '1rem'}} />
        {/* <h1 className="job-companyDescription-title">Requirements</h1> */}
        <h2 className="job-companyDescription">{parse(job.jobDetails?.requirements)}</h2>
        <div style={{padding: '1rem'}} />
        {/* <h1 className="job-companyDescription-title">Bonus Skills</h1>
        <h2 className="job-companyDescription">{job.jobDetails?.bonusSkills}</h2> */}
        <div className="field my-5 buttons-field">
          <button
            className="button back-button"
            onClick={() => setPage(page - 1)}
          >
            Go back
          </button>
          <button className="button next-button" onClick={(e) => createInterview(e)}>
            Post job
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostJobPageThree;
