import React from 'react';
import './jobHeader.scss';

const JobHeader = ({ darkTheme }) => {
  return (
    <div className={darkTheme ? "job-header columns is-vcentered dark" : "job-header columns is-vcentered"}>
      <div className="column job-header-logo-col is-2">
        <img src="https://vuejobs.com/storage/avatars/Ju27BSIL10fpoz5odqja3DoaV5JfnNFowAOnopEA.png" alt="logo" className="logo" />
      </div>
      <div className="column job-header-name-col">
        <h3 className="job-title">Front-End Developer</h3>
        <p className="job-company-name">at <span className="bold">Pixar</span></p>
      </div>
    </div>
  )
}

export default JobHeader