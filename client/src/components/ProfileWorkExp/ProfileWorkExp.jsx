import React, { useState, useEffect } from "react";
import {
  addUserWorkExp,
  getUserWorkExp,
  deleteUserWorkExp,
} from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {AiFillCalendar} from 'react-icons/ai';
import "./profileWorkExp.scss";

import Loader from '../Loader/Loader';

const ProfileWorkExp = ({darkTheme}) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const usersWorkExp = useSelector((state) => state.usersWorkExp);
  const { workExp, loading } = usersWorkExp;

  const addToWorkExp = useSelector((state) => state.addToWorkExp);
  const { workExp: addWorkExp, loading: loadingAddWorkExp, success } = addToWorkExp;

  const [showModal, setShowModal] = useState(false);
  const [newWorkExp, setNewWorkExp] = useState({
    companyName: "",
    jobTitle: "",
    shortDesc: "",
    started: "",
    ended: "",
  });

  const [error, setError] = useState(false);

  const addWorkExpHandler = (e) => {
    e.preventDefault();

    if (
      newWorkExp.companyName == "" ||
      newWorkExp.jobTitle == "" ||
      newWorkExp.shortDesc == "" ||
      newWorkExp.started == "" ||
      newWorkExp.ended == ""
    ) {
      setError(true);
      // console.log("Error should now be true");
    } else {
      setError(false);
      const data = { newWorkExp, userId: userInfo._id };
      // console.log(data, "DATA");
      dispatch(addUserWorkExp(data));
      setShowModal(false);
      // console.log("Added new WorkExp");
      setNewWorkExp({
        companyName: "",
        jobTitle: "",
        shortDesc: "",
        started: "",
        ended: "",
      });
      // if(success) {

      //   dispatch(getUserWorkExp(userInfo?._id));
      // }
    }
  };

  // useEffect(() => {
  //   console.log("addUserWorkExp")
  //   dispatch(getUserWorkExp(userInfo?._id));
  // }, [dispatch])

  const deleteWorkExpHandler = async (e, thisWorkExp) => {
    e.preventDefault();
    const data = { thisWorkExp, userId: userInfo._id };
    dispatch(deleteUserWorkExp(data));
    dispatch(getUserWorkExp(userInfo?._id));
  };

  useEffect(() => {
    dispatch(getUserWorkExp(userInfo?._id));
    // console.log("Dispatch")
  }, [dispatch]);

  const closeModal = () => {
    setShowModal(false);
    setNewWorkExp({
      companyName: "",
      jobTitle: "",
      shortDesc: "",
      started: "",
      ended: "",
    });
    setError(false);
  };
  
  // if(loading) {
  //   return "Loading ...."
  // }
  return (
    <div className={darkTheme ? "work-experience-section dark" : "work-experience-section"}>
      <div className="field">
        <label className="label">Professional Experience</label>
        <label className="label label-subtitle">
          Let us know about your professional background, positions,
          companies... If you have been a freelancer or work on personal
          projects, include them here too.
        </label>
        {/* Example Job */}
        <div className="example-job">
          <h1 className="example-job-company">Example company name</h1>
          <h3 className="example-job-title">Example job title</h3>
          <p className="example-job-desc">
            Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut
            libero malesuada feugiat. Vestibulum ante ipsum primis in faucibus
            orci luctus et ultrices posuere cubilia Curae; Donec velit neque,
            auctor sit amet aliquam vel, ullamcorper sit amet ligula.
          </p>
          <p className="length-worked">
            <span>
              <AiFillCalendar />
            </span>
            <span className="mx-2">26/02/2020 - 26/04/2021</span>
          </p>
          {/*<p className="delete-work-exp">X</p>*/}
        </div>

        {loading ? (
          <Loader />
        ) : (
        <>
        {workExp?.map((work) => (
          <div className="example-job" key={work.companyName}>
            <h1 className="example-job-company">{work.companyName}</h1>
            <h3 className="example-job-title">{work.jobTitle}</h3>
            <p className="example-job-desc">{work.shortDesc}</p>
            <p className="length-worked">
              <span>
                <AiFillCalendar />
              </span>
              <span className="mx-2">
                {work.started} - {work.ended}
              </span>
            </p>
            <p
              className="delete-work-exp"
              onClick={(e) => deleteWorkExpHandler(e, work)}
            >
              X
            </p>
          </div>
        ))}
        </>
        )}

        {/* Add Work Experience */}
        <div className="add-section has-text-centered">
          <p className="subtitle">Add work experience</p>
          <button
            className="button add-new"
            onClick={() => setShowModal(true)}
            type="button"
          >
            <span>
              <i className="fas fa-plus"></i>
            </span>
            <span className="mx-2">Add New</span>
          </button>
        </div>

        <div className={showModal ? "modal is-active" : "modal"}>
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-card">
            <header className="modal-card-head has-text-centered">
              <p className="modal-card-title">Creating Company / Project</p>
              <button
                className="delete"
                aria-label="close"
                onClick={closeModal}
                type="button"
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="form create-form">
                {error && (
                  <p className="subtitle has-text-danger">
                    Please fill in all values
                  </p>
                )}
                <div className="field my-5">
                  <label className="label">Company Name</label>
                  <label className="label label-subtitle">
                    Concise and clear, name the role. Omit location or job type.
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="e.g. Facebook, Spotify etc."
                      value={newWorkExp.companyName}
                      onChange={(e) =>
                        setNewWorkExp({
                          ...newWorkExp,
                          companyName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="field my-5">
                  <label className="label">Job Title</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Job title at the company"
                      value={newWorkExp.jobTitle}
                      onChange={(e) =>
                        setNewWorkExp({
                          ...newWorkExp,
                          jobTitle: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="field my-5">
                  <label className="label">
                    A short description of your role
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      type="text"
                      placeholder="Short description of your role at this company"
                      value={newWorkExp.shortDesc}
                      onChange={(e) =>
                        setNewWorkExp({
                          ...newWorkExp,
                          shortDesc: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="field my-5">
                  <label className="label">From</label>
                  <div className="control">
                    <input
                      className="input"
                      type="date"
                      value={newWorkExp.started}
                      onChange={(e) =>
                        setNewWorkExp({
                          ...newWorkExp,
                          started: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="field my-5">
                  <label className="label">Till</label>
                  <div className="control">
                    <input
                      className="input"
                      type="date"
                      value={newWorkExp.ended}
                      onChange={(e) =>
                        setNewWorkExp({ ...newWorkExp, ended: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button save-modal-button"
                onClick={addWorkExpHandler}
                type="button"
              >
                Save changes
              </button>
              <button
                className="button cancel-modal-button"
                onClick={closeModal}
                type="button"
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWorkExp;
