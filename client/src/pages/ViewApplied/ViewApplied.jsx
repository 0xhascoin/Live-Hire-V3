import React, { useEffect } from "react";
import "./viewApplied.scss";

import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThatApplied } from "../../actions/interviewActions";
import { useParams, Link } from "react-router-dom";

import {AiFillGithub, AiOutlineTwitter, AiFillLinkedin} from 'react-icons/ai';

// Components
import Navbar from "../../components/Navbar/Navbar";
import SavedHeader from "../../components/SavedHeader/SavedHeader";

const ViewApplied = ({ darkTheme, setDarkTheme }) => {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  console.log(jobId, "props");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getUsersThatApplied = useSelector((state) => state.getUsersThatApplied);
  const { usersThatApplied, loading } = getUsersThatApplied;

  useEffect(() => {
    dispatch(getAllUsersThatApplied(jobId));
    console.log("Dispatch");
  }, []);

  if (loading) return "Loading...";
  return (
    <div className={darkTheme ? "view-applied dark" : "view-applied"}>
      {console.log(usersThatApplied, "usersThatApplied")}
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <SavedHeader title="View applicants details" darkTheme={darkTheme} />
      <div className="applications-profiles-container">
        <div className="profiles">
            {usersThatApplied?.map((user) => (
                <div className="user-profile">
                <div className="user-profile-header">
                  <h3 className="name">{user.name}</h3>
                  <h4 className="location">
                    <span className="flag">🇬🇧</span>
                    <span className="mx-2">{user.location}</span>
                  </h4>
                  <h4 className="location">
                    <span>{user.email}</span>
                  </h4>
                </div>
                <div className="user-profile-content">
                  <h4 className="description">
                      {user.userCV?.aboutMe ? (
                          <>
                            {user.userCV?.aboutMe?.length > 100 ? (
                                <>
                                {user.userCV?.aboutMe.substring(0, 150) + "....."}
                                </>
                            ) : (
                                <>
                                {user.userCV?.aboutMe + "...."} 
                                </>
                            )}
                          </>
                      ) : (
                          "No description added by the user"
                      )}
                       
                  </h4>
                </div>
                <hr />
                <div className="user-profile-footer">
                  <p className="tag github-tag my-1">
                    <span className="icon">
                      <AiFillGithub />
                    </span>
                    Github
                  </p>
                  <p className="tag twitter-tag mx-2 my-1">
                  <span className="icon">
                      <AiOutlineTwitter />
                    </span>
                    Twitter
                  </p>
                  <p className="tag linkedin-tag my-1">
                  <span className="icon">
                      <AiFillLinkedin />
                    </span>
                    LinkedIn
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewApplied;
