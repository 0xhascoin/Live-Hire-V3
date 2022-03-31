import React, { useState, useEffect } from "react";
import "./postJob.scss";

// Components
import Navbar from "../../components/Navbar/Navbar";
import SavedHeader from "../../components/SavedHeader/SavedHeader";
import PostJobPageOne from "../../components/PostJobPageOne/PostJobPageOne";
import PostJobPageTwo from "../../components/PostJobPageTwo/PostJobPageTwo";
import PostJobPageThree from "../../components/PostJobPageThree/PostJobPageThree";

const PostJob = ({ darkTheme, setDarkTheme }) => {
  const [page, setPage] = useState(1);
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [job, setJob] = useState({
    companyName: "Marpipe",
    companyLogo: "https://vuejobs.com/storage/avatars/WhAv15pkn3IzuIQBP3g75fRDS7Kpi5BZQ8sMu9nu.jpeg",
    companyDescription: "The workflow behind advertising creative has been undisrupted for 60 years. Come join the platform that's changing that! Marpipe is a rapidly-growing, early stage technology company bringing data-driven decision making to the creative process in advertising. We are a team that’s obsessed with the science and data behind creativity.",
    jobTitle: "Front-End Developer",
    jobLength: "Full time",
    jobLevel: "Senior",
    jobDescription: "",
    jobDetails: {
      responsibilities:
        "Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services. Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services. ",
      requirements:
        "Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services. \nApple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services. \nApple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services. ",
      bonusSkills:
        "Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services. \nApple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services. \nApple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services. ",
    },
    currency: "$",
    minSalary: "250,000",
    date: "2022-03-31",
    time: "15:45pm",
    timezone: "GMT +0",
  });

  // useEffect(() => {
  //   console.log("selectedTimezone");
  //   setJob({ ...job, timezone: selectedTimezone.label });
  // }, [selectedTimezone])

  return (
    <div
      className={darkTheme ? "post-job-container dark" : "post-job-container"}
    >
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <SavedHeader title="Post a job" darkTheme={darkTheme} />

      <div className={darkTheme ? "post-container dark" : "post-container"}>
        <h3 className="post-title">Create job listing</h3>
        {page == 1 && (
          <PostJobPageOne
            darkTheme={darkTheme}
            job={job}
            setJob={setJob}
            page={page}
            setPage={setPage}
          />
        )}
        {page == 2 && (
          <PostJobPageTwo
            darkTheme={darkTheme}
            job={job}
            setJob={setJob}
            page={page}
            setPage={setPage}
            selectedTimezone={selectedTimezone}
            setSelectedTimezone={setSelectedTimezone}
          />
        )}
        {page == 3 && (
          <PostJobPageThree
            darkTheme={darkTheme}
            job={job}
            setJob={setJob}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default PostJob;
