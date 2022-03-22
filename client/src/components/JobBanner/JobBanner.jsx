import React from 'react';
import './jobBanner.scss';

const JobBanner = ({ darkTheme }) => {
  return (
    <div className={darkTheme ? "job-banner columns dark" : "job-banner columns"}>
      <div className="column">
        <p className="detail-title">Location</p>
        <p className="detail-description">Remote</p>
      </div>
      <div className="column">
        <p className="detail-title">Job type</p>
        <p className="detail-description">Full time</p>
      </div>
      <div className="column">
        <p className="detail-title">Job level</p>
        <p className="detail-description">Senior</p>
      </div>
    </div>
  )
}

export default JobBanner