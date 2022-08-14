import React, { useEffect } from "react";
import "./job.scss";
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";
import { GrLocation } from 'react-icons/gr';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThatApplied } from "../../actions/interviewActions";

const Job = ({ darkTheme, job, id, page }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const getUsersThatApplied = useSelector((state) => state.getUsersThatApplied);
  const { usersThatApplied, loading } = getUsersThatApplied;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  useEffect(() => {
    // dispatch(getAllUsersThatApplied(id));
    // console.log("Dispatch");
  }, []);

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  // if(loading) {
  //   return "Loading...."
  // } else {
  //   // console.log(job.jobTitle, usersThatApplied);
  //   // console.log(loading, "Loading")
  // }

  // return (
  //   <>
  //     {page !== "applications" ? (
  //       <Link to={`/job/${id}`} className={!darkTheme ? "job" : "job dark"}>
  //         <img className="img" src={job.companyLogo} />
  //         <div className="names">
  //         <h5 className="job-title">{job.jobTitle}</h5>
  //         <h5 className="job-company-name">{job.companyName}</h5>
  //         </div>
  //         <div className="location">
  //           <GrLocation style={{color: 'grey', fontSize: '1.1rem'}}/> - Remote
  //         </div>
  //         <div className="price">
  //         ${job.minSalary} / <span style={{color: 'grey'}}>Year</span>
  //         </div>
  //         <div className="type">
  //         <p className="tag is-info is-light">{job.jobLength}</p>
  //         <p className="tag is-info is-light mx-2">{job.date}</p>
  //         </div>
  //       {/*
  //         <p className="job-desc">
  //           {job.companyDescription.length > 150
  //             ? job.companyDescription.substring(0, 150) + "...."
  //             : job.companyDescription + "...."}
  //         </p>

  //         <div className="job-tags">
  //           <button className="company-name-tag">{job.companyName}</button>
  //           <button className="company-name-tag">{job.jobTitle}</button>
  //           <button className="company-name-tag salary">
  //             ${job.minSalary}
  //           </button>
  //           <button className="company-name-tag applied">
  //             {job.applicationsCount} Applied
  //           </button>
  //           <button className="company-name-tag applied">
  //             Date: {job.date}
  //           </button>
  //         </div>
  //         */}
  //         {page !== "lobby" && (
  //           <button className="button is-link apply-button" style={{backgroundColor: '#2541b2', fontWeight: 'bold'}}>Apply Now</button>

  //         )}
  //       </Link>
  //     ) : (
  //       <div className={!darkTheme ? "job" : "job dark"}>
  //         <Link to={`/job/${id}`}>
  //           <img className="img" src={job.companyLogo} />
  //           <div className="names">
  //         <h5 className="job-title">{job.jobTitle}</h5>
  //         <h5 className="job-company-name">{job.companyName}</h5>
  //         </div>
  //         <div className="location">
  //           <GrLocation style={{color: 'grey', fontSize: '1.1rem'}}/> - Remote
  //         </div>
  //         <div className="price">
  //         ${job.minSalary} / <span style={{color: 'grey'}}>Year</span>
  //         </div>
  //         <div className="type">
  //         <p className="tag is-info is-light">{job.jobLength}</p>
  //         <p className="tag is-info is-light mx-2">{job.date}</p>
  //         </div>
  //         {/*
  //           <h5 className="job-title">{job.title}</h5>

  //           <p className="job-desc">
  //             {job.companyDescription.length > 150
  //               ? job.companyDescription.substring(0, 150) + "...."
  //               : job.companyDescription + "...."}
  //           </p>
  //           <div className="job-tags">
  //             <button className="company-name-tag">{job.companyName}</button>
  //             <button className="company-name-tag">{job.jobTitle}</button>
  //             <button className="company-name-tag salary">
  //               ${job.minSalary}
  //             </button>
  //             <button className="company-name-tag applied">
  //               {job.applicationsCount} Applied
  //             </button>
  //             <button className="company-name-tag applied">
  //               Date: {job.date}
  //             </button>
  //           </div>
  //           */}
  //         </Link>

  //           <button className="button is-link apply-button" style={{backgroundColor: '#2541b2', fontWeight: 'bold'}}>Apply Now</button>
  //       </div>
  //     )}
  //   </>
  // );
  function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}


  return (
    <div class="job" onClick={() => navigate(`/job/${id}`)}>
      <div className="header">
        <div className="logo">
          <img src={job.companyLogo} />
        </div>
        <div className="text">
          <h1>{job.companyName}</h1>
        </div>
      </div>
      <div className="job-title">
        {job.jobTitle}
      </div>
      <div className="desc">
        <p>
          {job.companyDescription.substring(0, 60)}...
        </p>
      </div>
      <div className="tags-container">
        <span className="tag is-info is-light">{job.jobLength}</span>
        <span className="tag is-info is-light">{job.jobLevel} Level</span>
        <span className="tag is-primary is-light">${numberWithCommas(`${job.minSalary}`)}</span>
      </div>
      <div className="foot">
        <button className="button is-link">View Job</button>
        <p className="text">Posted {moment(job.createdAt).fromNow()}</p>
      </div>
    </div>
  )
};

export default Job;
