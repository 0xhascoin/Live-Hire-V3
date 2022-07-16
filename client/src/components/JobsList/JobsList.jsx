import React, { useState, useEffect } from "react";
import "./jobsList.scss";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch } from 'react-icons/ai'

// Component
import Job from "../Job/Job";
import Loader from '../Loader/Loader';
import LoadingJob from '../LoadingJob/LoadingJob';


const JobsList = ({ darkTheme, filteredInterviews, setPage, page, search, setSearch, searchHandler }) => {

  const dispatch = useDispatch();

  // Get the interviews stored in redux state
  const interviewList = useSelector((state) => state.interviewList);
  const { loading, interviews, error } = interviewList;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const clearSearch = () => {
    setSearch("");
    searchHandler("");
  };
  

  return (
    <div className={darkTheme ? "jobs-list-container dark" : "jobs-list-container"}>
    <div className="has-text-centered mt-4">
      <AiOutlineSearch className="search-icon" style={{fontSize: '2rem'}} />
    </div>
    <div className="search">
              <input
            className="job-search-input"
            placeholder="E.g. Web developer, software engineer, etc."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            autoFocus
          />
          <div className="job-search-buttons">
            <button
              className={darkTheme ? "search-button dark" : "search-button"}
              onClick={() => searchHandler(search)}
            >
              <span>Search job</span>
            </button>
            <button className="clear-button" onClick={clearSearch}>
              <span>Clear input</span>
            </button>
          </div>
          </div>

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
