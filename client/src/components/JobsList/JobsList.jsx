import React from "react";
import "./jobsList.scss";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";

const JobsList = ({ darkTheme }) => {
  return (
    <div className="jobs-list-container">
      <div className="columns jobs-list">
        <div className={!darkTheme ? "column job" : "column job dark"}>
          <img
            className="img"
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png"
          />
          <h5 className="job-title">Web Developer</h5>
          <p className="job-desc">
            Apple Inc. is an American multinational technology company that
            specializes in consumer electronics, software and online services...
          </p>
          <div className="job-tags">
            <button className="company-name-tag">Apple</button>
            <button className="company-name-tag salary">$120K</button>
            <button className="company-name-tag applied">33 Applied</button>
          </div>
          <BsFillArrowUpRightSquareFill className="icon" />
        </div>
        <div className={!darkTheme ? "column job" : "column job dark"}>
          <img
            className="img"
            src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png"
          />
          <h5 className="job-title">Mechanical Engineer</h5>
          <p className="job-desc">
            Tesla, Inc. is an American electric vehicle and clean energy company
            based in Austin, Texas. Tesla designs and manufactures electric
            cars, battery...
          </p>
          <div className="job-tags">
            <button className="company-name-tag">Tesla</button>
            <button className="company-name-tag salary">$95K</button>
            <button className="company-name-tag applied">75 Applied</button>
          </div>
          <BsFillArrowUpRightSquareFill className="icon" />
        </div>
      </div>
      <div className="columns jobs-list">
        <div className={!darkTheme ? "column job" : "column job dark"}>
          <img
            className="img"
            src="https://vuejobs.com/storage/avatars/Ju27BSIL10fpoz5odqja3DoaV5JfnNFowAOnopEA.png"
          />
          <h5 className="job-title">Senior Fullstack Developer</h5>
          <p className="job-desc">
            Looking to work for an awesome team? You’ve come to the right place!
            Our team is a tight-knit group of young and talented professionals
            helping...
          </p>
          <div className="job-tags">
            <button className="company-name-tag">Parse Pay</button>
            <button className="company-name-tag salary">$60K</button>
            <button className="company-name-tag applied">7 Applied</button>
          </div>
          <BsFillArrowUpRightSquareFill className="icon" />
        </div>
        <div className={!darkTheme ? "column job" : "column job dark"}>
          <img
            className="img"
            src="https://vuejobs.com/storage/avatars/qNsWAphMS9Tnk6uZBxqGRWD2EaQKBxbUHLJvW2Hn.png"
          />
          <h5 className="job-title">Front-End Developer</h5>
          <p className="job-desc">
            Tesla, Inc. is an American electric vehicle and clean energy company
            based in Austin, Texas. Tesla designs and manufactures electric
            cars, battery...
          </p>
          <div className="job-tags">
            <button className="company-name-tag">Cognitive Space</button>
            <button className="company-name-tag salary">$45K</button>
            <button className="company-name-tag applied">75 Applied</button>
          </div>
          <BsFillArrowUpRightSquareFill className="icon" />
        </div>
      </div>
    </div>
  );
};

export default JobsList;
