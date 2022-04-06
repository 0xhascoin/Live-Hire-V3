import React, { useEffect } from "react";
import "./editProfileForm.scss";

import { useSelector, useDispatch } from "react-redux";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import {
  addUserWorkExp,
  getUserWorkExp,
  deleteUserWorkExp,
} from "../../actions/userActions";


// Components
import ProfileWorkExp from '../ProfileWorkExp/ProfileWorkExp';
import ProfileEdu from "../ProfileEdu/ProfileEdu";

const EditProfileForm = ({
  error,
  userDetails,
  setUserDetails,
  updateProfileHandler,
  darkTheme
}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  useEffect(() => {
    console.log("addUserWorkExp")
    dispatch(getUserWorkExp(userInfo?._id));
  }, [dispatch])

  return (
    <div className={darkTheme ? "edit-profile-container dark" : "edit-profile-container"}>
      <div className="edit-profile-form">
        {error && (
          <p className="has-text-danger subtitle">
            Please fill in all the details
          </p>
        )}
        <h1 className="title">Name: {toTitleCase(userInfo?.name)}</h1>
        <div className="field my-5">
          <label className="label">Professional title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Frontend developer, Full-stack, etc"
              value={userDetails.title}
              onChange={(e) =>
                setUserDetails({ ...userDetails, title: e.target.value })
              }
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Describe yourself</label>
          <label className="label label-subtitle">
            Introduce yourself with enthusiasm in a few lines and do not forget
            to make a list of the different projects in which you can work, the
            methodologies you use, your technical skills and even the
            deliverables that you can show.
          </label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Describe yourself"
              value={userDetails.aboutMe}
              onChange={(e) =>
                setUserDetails({ ...userDetails, aboutMe: e.target.value })
              }
            ></textarea>
          </div>
        </div>
        <div className="columns">
          <div className="field column is-4">
            <label className="label">Twitter Username </label>
            <div
              className="control has-icons-left"
              style={{ minWidth: "100%" }}
            >
              <input
                className="input"
                type="text"
                placeholder="Twitter Username"
                value={userDetails.twitterUrl}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, twitterUrl: e.target.value })
                }
              />
              <span className="icon is-small is-left">
                <AiOutlineTwitter />
              </span>
            </div>
          </div>
          <div className="field column is-4">
            <label className="label">GitHub Username </label>
            <div
              className="control has-icons-left"
              style={{ minWidth: "100%" }}
            >
              <input
                className="input"
                type="text"
                placeholder="Github Username"
                value={userDetails.githubUrl}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, githubUrl: e.target.value })
                }
              />
              <span className="icon is-small is-left">
                <AiFillGithub />
              </span>
            </div>
          </div>
        </div>
        <hr />
        <ProfileWorkExp />
        <hr />
        <ProfileEdu />
        <hr />
        <div className="submit-profile-box">
          <button
            className="button submit-profile-button"
            type="button"
            onClick={updateProfileHandler}
          >
            Update profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
