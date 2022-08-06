import React, { useEffect } from "react";
import "./viewApplied.scss";

import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThatApplied } from "../../actions/interviewActions";
import { useParams, Link } from "react-router-dom";
import { getOneInterview } from "../../actions/interviewActions";
import { useNavigate, useLocation } from "react-router-dom";


import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";

// Components
import Navbar from "../../components/Navbar/Navbar";
import SavedHeader from "../../components/SavedHeader/SavedHeader";

const flags = {
  UK: "🇬🇧",
  USA: "🇺🇸",
  EU: "🇪🇺",
  OTHER: "OTHER"
};

const ViewApplied = ({ darkTheme, setDarkTheme }) => {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const history = useNavigate();
  // console.log(jobId, "props");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getUsersThatApplied = useSelector((state) => state.getUsersThatApplied);
  const { usersThatApplied, loading } = getUsersThatApplied;

  const oneInterview = useSelector((state) => state.oneInterview);
  const { interview, loading: loadingInterview } = oneInterview;

  useEffect(() => {
    dispatch(getAllUsersThatApplied(jobId));
    dispatch(getOneInterview(jobId));
    // console.log("Dispatch");
    if(userInfo?.userType.toLowerCase() !== "employer") {
      history("/")
    } 
  }, []);

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  if (loading || loadingInterview) return "Loading...";
  return (
    <div className={darkTheme ? "view-applied dark" : "view-applied"}>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <SavedHeader title="View applicants details" darkTheme={darkTheme} />
      <div className="applications-profiles-container">
        {interview?.map((job) => (
        <div className="back-url">
          <Link to="/applications">Applications</Link> / <p>{job?.jobTitle} - {job?.companyName}</p>
        </div>
        ))}
        <div className="profiles">
          {usersThatApplied?.map((user) => (
            <div className="user-profile">
              <div className="user-profile-header">
                <h3 className="name">{toTitleCase(user.name)}</h3>
                <h4 className="location">
                  <span className="flag">{flags[user.location]}</span>
                  <span className="mx-2">{user.location}</span>
                </h4>
                <h4 className="location">
                  <span>{toTitleCase(user.email)}</span>
                </h4>
              </div>
              <div className="user-profile-content">
                <h4 className="description">
                  {user.userCV?.aboutMe ? (
                    <>
                      {user.userCV?.aboutMe?.length > 100 ? (
                        <>{user.userCV?.aboutMe.substring(0, 150) + "....."}</>
                      ) : (
                        <>{user.userCV?.aboutMe + "...."}</>
                      )}
                    </>
                  ) : (
                    "No description added by the user"
                  )}
                </h4>
              </div>
              <hr />
              <div className="user-profile-footer">
                {user.userCV?.githubUrl && (
                  <a
                    className="tag github-tag my-1 mx-2"
                    href={`http://github.com/${user.userCV?.githubUrl}`}
                  >
                    <span className="icon">
                      <AiFillGithub />
                    </span>
                    Github
                  </a>
                )}
                {user.userCV?.twitterUrl && (
                  <a
                    className="tag twitter-tag mx-2 my-1"
                    href={`http://twitter.com/${user.userCV?.twitterUrl}`}
                  >
                    <span className="icon">
                      <AiOutlineTwitter />
                    </span>
                    Twitter
                  </a>
                )}
                {user.userCV?.linkedInUrl && (
                  <a className="tag linkedin-tag my-1 mx-2" hred="linkedin.com">
                    <span className="icon">
                      <AiFillLinkedin />
                    </span>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewApplied;
