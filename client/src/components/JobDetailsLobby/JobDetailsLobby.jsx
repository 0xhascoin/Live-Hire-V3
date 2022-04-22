import React from "react";
import "./jobDetailsLobby.scss";

import Job from '../Job/Job';

const JobDetailsLobby = ({darkTheme, setDarkTheme, job}) => {
  return (
    <div className="interview-details-container">
      <Job darkTheme={darkTheme} job={job} page="lobby"/>
    </div>
  );
};

export default JobDetailsLobby;
