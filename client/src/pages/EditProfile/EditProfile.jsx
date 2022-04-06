import React, { useState } from "react";
import "./editProfile.scss";

import { useSelector, useDispatch } from "react-redux";
import {updateUsersCV} from '../../actions/userActions'

// Components
import Navbar from "../../components/Navbar/Navbar";
import SavedHeader from "../../components/SavedHeader/SavedHeader";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";

const EditProfile = ({ darkTheme, setDarkTheme }) => {
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({
    title: "",
    aboutMe: "",
    twitterUrl: "",
    githubUrl: "",
  });

  const [error, setError] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    console.log("Updating Profile");
    if (
      userDetails.title == "" ||
      userDetails.aboutMe == "" ||
      userDetails.twitterUrl == "" ||
      userDetails.githubUrl == ""
    ) {
      setError(true);
    } else {
      setError(false);
      dispatch(
        await updateUsersCV(
          userInfo?._id,
          userDetails.title,
          userDetails.aboutMe,
          userDetails.twitterUrl,
          userDetails.githubUrl
        )
      );
    }
  };

  return (
    <div className={darkTheme ? "edit-profile dark" : "edit-profile"}>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <SavedHeader title="My profile" darkTheme={darkTheme} />
      <EditProfileForm darkTheme={darkTheme} error={error} userDetails={userDetails} setUserDetails={setUserDetails} updateProfileHandler={updateProfileHandler} />
    </div>
  );
};

export default EditProfile;
