import React, {useEffect, useState} from 'react';
import './interviewsManager.scss'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllJobsUserAppliedTo } from "../../actions/userActions";
import { getAllUserInterviews } from '../../actions/interviewActions';


// Components
import Navbar from '../../components/Navbar/Navbar';
import SavedHeader from '../../components/SavedHeader/SavedHeader';


const InterviewsManager = ({ darkTheme, setDarkTheme }) => {
  const [todaysDate, setTodaysDate] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getAllJobsAppliedTo = useSelector((state) => state.getAllJobsAppliedTo);
  const { jobsAppliedTo, loading: loadingApplied } = getAllJobsAppliedTo;

  const userInterviewList = useSelector((state) => state.userInterviewList);
  const { usersInterviews, loading: loadingInterviews } = userInterviewList;

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const getToday = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`
    return today
  }

  useEffect(() => {
    if(!userInfo) {
      history('/');
    }

    if(userInfo?.userType.toLowerCase() == "user") {
      dispatch(getAllJobsUserAppliedTo(userInfo?._id));
    } else if(userInfo?.userType.toLowerCase() == "employer") {
      dispatch(getAllUserInterviews(userInfo?._id));
    }
    setTodaysDate(getToday())
  }, []);

  console.log(usersInterviews, "usersInterviews");

  if(userInfo?.userType.toLowerCase() == "employer") {
    if(loadingInterviews) {
      return "Loading...."
    }
  } else if(userInfo?.userType.toLowerCase() == "user") {
    if(loadingApplied) {
      return "Loading...."
    }
  }

  
  return (
    <div className={darkTheme ? "interviews-manager dark" : "interviews-manager"}>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <SavedHeader title="Interviews Manager" darkTheme={darkTheme} />
      <div className="interview-title">
        {userInfo?.userType.toLowerCase() == "employer" ? (
          <h1>You have {usersInterviews?.length} interviews scheduled</h1>
          
          ) : (
          <h1>You have {jobsAppliedTo?.length} interviews scheduled</h1>

        )}
      </div>
      <div className="interviews-manager-container">
      {userInfo?.userType.toLowerCase() == "employer" ? (
        <div className="jobs-container">
        {usersInterviews?.map((job) => (  
          <div className="columns is-vcentered">
          <div className="column is-8 job-col">
          <div className="columns single-job is-vcentered">
            <img className="column is-2 logo-col small" 
              src={job.companyLogo} 
            />
            <div className="column content-col">
              <p className="job-level has-text-centered">
                {toTitleCase(job.jobLevel)}
              </p>
              <h2 className="job-title">{toTitleCase(job.jobTitle)}</h2>
              <p className="company-details">
                at <span className="company-name">{toTitleCase(job.companyName)}</span>
                - Remote
                <span className="application-count">
                  {job.date} - {job.time} {job.timezone && job.timezone}
                </span>
              </p>
            </div>
          </div>
          </div>
          <div className="column go-col has-text-centered">
            {todaysDate === job.date ? (
              <button className="button is-info is-light">Go to room</button>
              ) : (
              <p className="is-warning is-light disable">Room will open on <br />{job.date}</p>

            )}
          </div>
          </div>
          ))}
      </div>
      ): (
<div className="jobs-container">
        {jobsAppliedTo?.map((job) => (  
          <div className="columns is-vcentered">
          <div className="column is-8 job-col">
          <div className="columns single-job is-vcentered">
            <img className="column is-2 logo-col small" 
              src={job.companyLogo} 
            />
            <div className="column content-col">
              <p className="job-level has-text-centered">
                {toTitleCase(job.jobLevel)}
              </p>
              <h2 className="job-title">{toTitleCase(job.jobTitle)}</h2>
              <p className="company-details">
                at <span className="company-name">{toTitleCase(job.companyName)}</span>
                - Remote
                <span className="application-count">
                  {job.date} - {job.time} {job.timezone && job.timezone}
                </span>
              </p>
            </div>
          </div>
          </div>
          <div className="column go-col has-text-centered">
            {todaysDate !== job.date ? (
              <Link className="button is-info is-light" to={`/interview/${job._id}/lobby`} >Room will open on <br />{job.date}</Link>
              ) : (
              <p className="is-warning is-light disable">Room will open on <br />{job.date}</p>
            )}
          </div>
          </div>
          ))}
      </div>
      )}
    </div>
    </div>
  )
};

export default InterviewsManager;