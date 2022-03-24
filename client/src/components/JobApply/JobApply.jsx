import React from 'react';
import './jobApply.scss';

const JobApply = ({darkTheme}) => {
  return (
    <div className={darkTheme ? "column job-apply dark" : "column job-apply"}>
      <div className="apply-box">
        <h1 className="apply-title">RSVP here</h1>
        <p className="date">Date: 20th June 2022, 15:00pm</p>
        <button className="button apply-button">RSVP</button>
        <p className="date">Thanks for confirming your attendance</p>
      </div>
    </div>
  )
}

export default JobApply