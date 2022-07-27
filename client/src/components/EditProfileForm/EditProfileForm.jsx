import React, { useEffect, useState } from "react";
import "./editProfileForm.scss";
import axios from 'axios';

import { useSelector, useDispatch } from "react-redux";
import { AiFillGithub, AiOutlineTwitter, AiOutlineCloudUpload } from "react-icons/ai";
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
  const [myCV, setMyCV] = useState("");
  const [cv, setCV] = useState("");



  const uploadCV = async (file) => {

    const get = async (cv) => {
      try {
        const getData = () => axios.patch(`https://v2lhbackend.herokuapp.com/api/uploadcv/${userInfo?._id}`, { cv });
        const { data } = await getData();
        console.log("CV LINK: ", data);
        setMyCV(data);
      } catch (error) {
        console.log(error);
      }
    }
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "livehirelogos");
    data.append("cloud_name", "hasan029512");
    fetch("https://api.cloudinary.com/v1_1/hasan029512/image/upload", {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        console.log("My CV: ", data.url);
        get(data.url)
      })
      .catch(error => {
        console.log("ERROR: ", error);
      })
  }
  

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  useEffect(() => {
    // console.log("addUserWorkExp")
    dispatch(getUserWorkExp(userInfo?._id));
    console.log(userInfo)

    const getUserCV = async () => {
      const response = await fetch(`https://v2lhbackend.herokuapp.com/api/getcv/${userInfo?._id}`);
      const json = await response.json();

      if(response.ok) {
        console.log("JSON: ", json);
        setMyCV(json);
      }
    }

    getUserCV()
  }, [dispatch])

  return (
    <div className={darkTheme ? "edit-profile-container dark" : "edit-profile-container"}>
      <div className="edit-profile-form">
        {error && (
          <p className="has-text-danger subtitle">
            Please fill in all the details
          </p>
        )}
        <h1 className="title">{toTitleCase(userInfo?.name)}</h1>
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
        <div className="field my-3 upload-cv is-small">
          <label className="label">Upload CV</label>

          <div class="file has-name is-small">
        <label class="file-label">
          <input class="file-input" type="file" name="resume" onChange={(e) => uploadCV(e.target.files[0])} />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
          <span class="file-name">
            {myCV == "" ? "File name" : myCV}
          </span>
        </label>
      </div>
</div>
{cv && (
<div className="my-5">
  <a href={myCV.slice(0, -3) + "jpg"} download>View CV</a>
</div>
  )}

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
        <ProfileWorkExp darkTheme={darkTheme} />
        <hr />
        <ProfileEdu darkTheme={darkTheme} />
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
