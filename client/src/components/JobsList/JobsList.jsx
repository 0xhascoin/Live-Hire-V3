import React from "react";
import "./jobsList.scss";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";
import Job from "../Job/Job";

const jobs = [
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png',
    title: 'Web Developer',
    description: 'Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services...',
    companyName: 'Apple',
    salary: '120K',
    applicationCount: '33'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
    title: 'Mechanical Engineer',
    description: 'Tesla, Inc. is an American electric vehicle and clean energy company based in Austin, Texas. Tesla designs and manufactures electric cars, battery...',
    companyName: 'Tesla',
    salary: '75K',
    applicationCount: '456'
  },
  {
    logo: 'https://vuejobs.com/storage/avatars/Ju27BSIL10fpoz5odqja3DoaV5JfnNFowAOnopEA.png',
    title: 'Senior Fullstack Developer',
    description: 'Looking to work for an awesome team? You have come to the right place! Our team is a tight-knit group of young and talented professionals helping...',
    companyName: 'Parse Pay',
    salary: '60K',
    applicationCount: '25'
  },
  {
    logo: 'https://vuejobs.com/storage/avatars/qNsWAphMS9Tnk6uZBxqGRWD2EaQKBxbUHLJvW2Hn.png',
    title: 'Front-End Developer',
    description: 'Looking to work for an awesome team? You have come to the right place! Our team is a tight-knit group of young and talented professionals helping...',
    companyName: 'Cognitive Space',
    salary: '35K',
    applicationCount: '12'
  }
]

const JobsList = ({ darkTheme }) => {
  return (
    <div className={darkTheme ? "jobs-list-container dark" : "jobs-list-container"}>
      <div className="jobs-list">
        {jobs.map((job, index) => (
          <Job job={job} key={index} darkTheme={darkTheme} />
        ))}
      </div>
    </div>
  );
};

export default JobsList;
