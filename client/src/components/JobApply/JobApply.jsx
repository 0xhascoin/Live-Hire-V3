import React, { useEffect, useState } from "react";
import "./jobApply.scss";

import {
  addIntToFavs,
  getUserFavs,
  getAUser,
} from "../../actions/userActions";
import {
  addToApplications,
  getAllInterviews,
} from "../../actions/interviewActions";


import { useDispatch, useSelector } from "react-redux";

const JobApply = ({ darkTheme, id, date, time, job }) => {
  const dispatch = useDispatch();

  const userFavsList = useSelector((state) => state.userFavsList);
  const { interviews } = userFavsList;

  const oneInterview = useSelector((state) => state.oneInterview);
  const { interview } = oneInterview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getUser = useSelector((state) => state.getUser);
  const { user } = getUser;

  const hasThisUserApplied = useSelector((state) => state.hasThisUserApplied);
  const { userApplied } = hasThisUserApplied;
  const [applied, setApplied] = useState(userApplied);

  const applyToJob = (likedInterview) => {
    // console.log(userInfo, "UserInfo ApplyToJob")
    // dispatch(await getUserFavs(userInfo._id));
    const data = { likedInterview, userId: userInfo._id };
    setApplied(true);
    dispatch(addIntToFavs(data));
    dispatch(addToApplications(likedInterview._id, user));
  };

  return (
    <div className={darkTheme ? "column job-apply dark" : "column job-apply"}>
      <div className="apply-box">
        <h1 className="apply-title">RSVP here</h1>
        <p className="date">Date: {date}, {time} - {job.timezone && job.timezone}</p>
        {userInfo ? (
        <>
        {userInfo?.userType.toLowerCase() != "employer" && (
          <>
            {userApplied || applied ? (
              <p className="date">Thanks for confirming your attendance</p>
            ): (
              <button className="button apply-button" onClick={() => applyToJob(job)}>RSVP</button>
            )}
          </>
        )}
        </>
      ) : (
        <p className="date">Login to apply.</p>
      )}
        
        
      </div>
    </div>
  );
};

export default JobApply;
