import "./profileEdu.scss";
import React, { useState, useEffect } from "react";
import "./profileEdu.scss";
import {
  addUserEducation,
  getUserEducation,
  deleteUserEducation,
} from "../../actions/userActions";

import { useDispatch, useSelector } from "react-redux";
import { AiFillCalendar } from "react-icons/ai";

const ProfileEdu = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const usersEducation = useSelector((state) => state.usersEducation);
  const { education, loading } = usersEducation;

  const [showModal, setShowModal] = useState(false);

  const [newEdu, setNewEdu] = useState({
    course: "",
    university: "",
    from: "",
    till: "",
  });

  const [error, setError] = useState(false);

  const addEduHandler = async (e) => {
    e.preventDefault();
    if (
      newEdu.course == "" ||
      newEdu.university == "" ||
      newEdu.from == "" ||
      newEdu.till == ""
    ) {
      setError(true);
      console.log("Error should now be true");
    } else {
      setError(false);
      const data = { newEdu, userId: userInfo._id };
      dispatch(await addUserEducation(data));
      setShowModal(false);
      setNewEdu({
        course: "",
        university: "",
        started: "",
        ended: "",
      });
      dispatch(getUserEducation(userInfo?._id));
    }
  };

  useEffect(() => {
    dispatch(getUserEducation(userInfo?._id));
  }, [dispatch]);

  const deleteEduHandler = async (e, thisEdu) => {
    e.preventDefault();
    const data = { thisEdu, userId: userInfo._id };
    dispatch(await deleteUserEducation(data));
    dispatch(getUserEducation(userInfo?._id));
  };

  const closeModal = () => {
    setShowModal(false);
    setNewEdu({
      course: "",
      university: "",
      started: "",
      ended: "",
    });
    setError(false);
  };

  return (
    <div className="work-experience-section">
      <div className="field">
        <label className="label">Education & diplomas</label>
        {/* Example Job */}
        <div className="example-job">
          <h1 className="example-job-title">University name</h1>
          <h3 className="example-job-desc">Degree name</h3>
          <p className="length-worked">
            <span>
              <AiFillCalendar />
            </span>
            <span className="mx-2">26/02/2020 - 26/04/2021</span>
          </p>
          {/*<p className="delete-work-exp">X</p>*/}
        </div>

        {loading ? (
          "Loading..."
        ) : (
          <>
            {education?.map((edu) => (
              <div className="example-job" key={edu.university}>
                <h1 className="example-job-company">{edu.university}</h1>
                <h3 className="example-job-title">{edu.course}</h3>
                <p className="length-worked">
                  <span>
                    <AiFillCalendar />
                  </span>
                  <span className="mx-2">
                    {edu.from} - {edu.till}
                  </span>
                </p>
                <p
                  className="delete-work-exp"
                  onClick={(e) => deleteEduHandler(e, edu)}
                >
                  X
                </p>
              </div>
            ))}
          </>
        )}

        {/* Add Work Experience */}
        <div className="add-section has-text-centered">
          <p className="subtitle">Add education</p>
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
              <p className="modal-card-title">Creating Course / Degree</p>
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
                  <label className="label">Course / Degree</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={newEdu.companyName}
                      onChange={(e) =>
                        setNewEdu({ ...newEdu, course: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="field my-5">
                  <label className="label">School / University</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={newEdu.jobTitle}
                      onChange={(e) =>
                        setNewEdu({ ...newEdu, university: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="field my-5">
                  <label className="label">From</label>
                  <div className="control">
                    <input
                      className="input"
                      type="date"
                      value={newEdu.from}
                      onChange={(e) =>
                        setNewEdu({ ...newEdu, from: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="field my-5">
                  <label className="label">Till</label>
                  <div className="control">
                    <input
                      className="input"
                      type="date"
                      value={newEdu.till}
                      onChange={(e) =>
                        setNewEdu({ ...newEdu, till: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button save-modal-button"
                onClick={addEduHandler}
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

export default ProfileEdu;
