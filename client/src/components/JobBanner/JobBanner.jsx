import React from 'react';
import './jobBanner.scss';

const JobBanner = ({ darkTheme, jobLevel, jobLength, minSalary }) => {
  return (
    <div className={darkTheme ? "job-banner columns dark" : "job-banner columns"}>
      <div className="column">
        <p className="detail-title">Location</p>
        <p className="detail-description">Remote</p>
      </div>
      <div className="column">
        <p className="detail-title">Job type</p>
        <p className="detail-description">{jobLength}</p>
      </div>
      <div className="column">
        <p className="detail-title">Job level</p>
        <p className="detail-description">{jobLevel}</p>
      </div>
      <div className="column">
        <p className="detail-title">Salary</p>
        <p className="detail-description">{minSalary}</p>
      </div>
    </div>
  )
}

export default JobBanner