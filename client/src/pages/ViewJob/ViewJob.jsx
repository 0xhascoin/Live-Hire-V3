import React, { useEffect } from "react";
import "./viewJob.scss";

import { addIntToFavs, getUserFavs, getAUser } from "../../actions/userActions";
import {
  getOneInterview,
  hasUserApplied,
} from "../../actions/interviewActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

// Components
import Navbar from "../../components/Navbar/Navbar";
import JobHeader from "../../components/JobHeader/JobHeader";
import JobBanner from "../../components/JobBanner/JobBanner";
import JobDetails from "../../components/JobDetails/JobDetails";
import JobApply from "../../components/JobApply/JobApply";
import Loader from "../../components/Loader/Loader";

const ViewJob = ({ darkTheme, setDarkTheme }) => {
  const { id } = useParams();
  // console.log(id, "props");
  const dispatch = useDispatch();

  const oneInterview = useSelector((state) => state.oneInterview);
  const { interview } = oneInterview;

  const userFavsList = useSelector((state) => state.userFavsList);
  const { interviews } = userFavsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getUser = useSelector((state) => state.getUser);
  const { user } = getUser;

  useEffect(() => {
    id && dispatch(getOneInterview(id));
    if (userInfo?.userType.toLowerCase() == "user") {
      dispatch(hasUserApplied(id, userInfo?._id));
      // dispatch(getUserFavs(userInfo?._id));
      dispatch(getAUser(userInfo?._id));
      // console.log("User favs loaded.")
    }
    // console.log(interview, "interview");
  }, []);

  return (
    <>
      {interview ? (
        <>
          {interview?.map((int) => (
            <div
              className={
                darkTheme
                  ? "view-job-container dark"
                  : "view-job-container light"
              }
              key={int._id}
            >
              <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
              <JobHeader
                darkTheme={darkTheme}
                companyLogo={int.companyLogo}
                companyName={int.companyName}
                jobTitle={int.jobTitle}
              />
              <JobBanner darkTheme={darkTheme} jobLevel={int.jobLevel} jobLength={int.jobLength} minSalary={int.minSalary} currency={int.currency}/>
              <div className="columns">
                <JobDetails darkTheme={darkTheme} companyDescription={int.companyDescription} jobDetails={int.jobDetails} />
                <JobApply
                  darkTheme={darkTheme}
                  date={int.date}
                  time={int.time}
                  job={int}
                  id={id}
                />
              </div>
            </div>
          ))}
        </>
      ) : (
        <Loader />
      )}
    </>

    // {interview?.map((int) => (

    //   <div key={int._id}>
    //     <Header companyLogo={int.companyLogo} companyName={int.companyName} jobTitle={int.jobTitle}/>
    //     <Banner jobLevel={int.jobLevel} jobLength={int.jobLength}/>
    //     <div className="columns job-details-container">
    //       <JobDetails companyDescription={int.companyDescription} jobDetails={int.jobDetails}/>
    //         <Apply
    //           date={int.date}
    //           time={int.time}
    //           jobId={int._id}
    //           job={int}
    //           id={id}
    //          />
    //     </div>
    //   </div>
    // ))}
  );
};

export default ViewJob;
