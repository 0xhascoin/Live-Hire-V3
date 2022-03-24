import React from 'react';
import './jobHeader.scss';

const JobHeader = ({ darkTheme, companyLogo, jobTitle, companyName }) => {
  return (
    <div className={darkTheme ? "job-header columns is-vcentered dark" : "job-header columns is-vcentered"}>
      <div className="column job-header-logo-col is-2">
        <img src={companyLogo} alt="logo" className="logo" />
      </div>
      <div className="column job-header-name-col">
        <h3 className="job-title">{jobTitle}</h3>
        <p className="job-company-name">at <span className="bold">{companyName}</span></p>
      </div>
    </div>
  )
}

export default JobHeader