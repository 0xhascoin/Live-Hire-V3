import React, { useState, useEffect } from "react";
import "./jobsList.scss";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";


// Component
import Job from "../Job/Job";
import Loader from '../Loader/Loader';
import LoadingJob from '../LoadingJob/LoadingJob';


const JobsList = ({ darkTheme, filteredInterviews, setPage, page }) => {

  const dispatch = useDispatch();

  // Get the interviews stored in redux state
  const interviewList = useSelector((state) => state.interviewList);
  const { loading, interviews, error } = interviewList;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  

  return (
    <div className={darkTheme ? "jobs-list-container dark" : "jobs-list-container"}>
      <div className="jobs-list">
      {
          filteredInterviews?.length > 0 ? (
            <>
              {filteredInterviews?.map((interview) => (
                <Job 
                  job={interview} 
                  id={interview?._id}
                  url={`/job/${interview._id}`}
                  key={interview?._id}
                  darkTheme={darkTheme}
                  />
              ))}
            </>
          ) : (    
          <>
            {interviews ? (    
              <>
              {
                interviews?.map((interview) => (
                  <Job 
                    job={interview} 
                    id={interview._id} 
                    url={`/job/${interview._id}`}
                    key={interview?._id}
                    darkTheme={darkTheme}
                    />
                ))
              }
              </>
            ) : (
              <>
                <LoadingJob />
                <LoadingJob />
              </>
            )}
          </>
          )
        }
      </div>
      {/* <button type="button" className="button" onClick={() => setPage(1)}>1</button>
      <button type="button" className="button" onClick={() => setPage(2)}>2</button>
      <button type="button" className="button" onClick={() => setPage(3)}>3</button> */}
    </div>
  );
};

export default JobsList;
