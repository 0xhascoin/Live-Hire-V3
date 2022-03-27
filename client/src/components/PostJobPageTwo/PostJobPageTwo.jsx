import React, { useState } from "react";
import "./postJobPageTwo.scss";

const PostJobPageTwo = ({ darkTheme, job, setJob, page, setPage }) => {
  const [jobTitleError, setJobTitleError] = useState(false);
  const [jobLengthError, setJobLengthError] = useState(false);
  const [jobLevelError, setJobLevelError] = useState(false);
  const [responsibilitiesError, setResponsibilitiesError] = useState(false);
  const [requirementsError, setRequirementsError] = useState(false);
  const [bonusSkillsError, setBonusSkillsError] = useState(false);
  const [currencyError, setCurrencyError] = useState(false);
  const [minSalaryError, setMinSalaryError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const nextPage = (e) => {
    e.preventDefault();

    if (job.jobTitle.length < 3) {
      console.log("Job title must be more than 3 chars");
      setJobTitleError(true);
    } else {
      setJobTitleError(false);
      if (!job.jobLength || job.jobLength == "") {
        console.log("Choose a job length");
        setJobLengthError(true);
      } else {
        setJobLengthError(false);
        if (!job.jobLevel || job.jobLevel == "") {
          console.log("Choose a job level");
          setJobLevelError(true);
        } else {
          setJobLevelError(false);
          if (job.jobDetails.responsibilities.length < 100) {
            setResponsibilitiesError(true);
            console.log("Responsibilities must be more than 100 chars");
          } else {
            setResponsibilitiesError(false);
            if (
              !job.jobDetails.requirements ||
              job.jobDetails.requirements.length < 100
            ) {
              setRequirementsError(true);
              console.log("Requirements must be more than 100 char");
            } else {
              setRequirementsError(false);
              if (
                !job.jobDetails.bonusSkills ||
                job.jobDetails.bonusSkills.length < 30
              ) {
                setBonusSkillsError(true);
                console.log("Bonus skills must be more than 30 char");
              } else {
                setBonusSkillsError(false);
                if (!job.currency || job.currency == "") {
                  setCurrencyError(true);
                  console.log("Please select a currency");
                } else {
                  setCurrencyError(false);
                  if (!job.minSalary) {
                    setMinSalaryError(true);
                    console.log("Please enter the minimum salary");
                  } else {
                    setMinSalaryError(false);
                    if (!job.date) {
                      setDateError(true);
                      console.log("Please select a date");
                    } else {
                      setDateError(false);
                      if (!job.time) {
                        setTimeError(true);
                        console.log("Please select a time");
                      } else {
                        console.log(job);
                        setPage(page + 1);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  return (
    <div
      className={darkTheme ? "page-two-container dark" : "page-two-container"}
    >
      <h2 className="page-two-title">Job post details</h2>
      <p className="page-two-short-desc">
        Use the form to get started – you will have a chance to preview your job
        listing in the next step.
      </p>
      <hr />
      <div className="page-two-form">
        <div className="field my-5">
          <label className="label">
            Job title <span className="required">(required)</span>
          </label>
          <label className="label label-subtitle">
            Concise and clear, name the role. Omit location or job type.
          </label>
          {jobTitleError && (
            <span className="error-text has-text-danger has-text-light">
              Job title must be more than 3 characters
            </span>
          )}
          <div className="control">
            <input
              className={jobTitleError ? "input is-danger" : "input"}
              type="text"
              value={job.jobTitle}
              onChange={(e) => setJob({ ...job, jobTitle: e.target.value })}
              placeholder="Job title"
            />
          </div>
        </div>
        <div className="field my-5">
          <label className="label">
            Job type <span className="required">(required)</span>
          </label>
          {jobLengthError && (
            <span className="error-text has-text-danger has-text-light">
              Please select a job length from the dropdown
            </span>
          )}
          <div className="control">
            <div
              className={
                jobLengthError
                  ? "select is-normal is-danger"
                  : "select is-normal"
              }
            >
              <select
                onChange={(e) => setJob({ ...job, jobLength: e.target.value })}
                value={job.jobLength}
              >
                <option value={null}>Select from dropdown</option>
                <option value="Full time">Full time</option>
                <option value="Part time">Part time</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field my-5">
          <label className="label">
            Job level <span className="required">(required)</span>
          </label>
          {jobLevelError && (
            <span className="error-text has-text-danger has-text-light">
              Please select a job level from the dropdown
            </span>
          )}
          <div className="control">
            <div
              className={
                jobLevelError
                  ? "select is-normal is-danger"
                  : "select is-normal"
              }
            >
              <select
                onChange={(e) => setJob({ ...job, jobLevel: e.target.value })}
                value={job.jobLength}
              >
                <option value={null}>Select from dropdown</option>
                <option value="Full time">Junior</option>
                <option value="Part time">Mid-level</option>
                <option value="Part time">Senior</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field my-5">
          <label className="label">
            Responsibilities <span className="required">(required)</span>
          </label>
          {responsibilitiesError && (
            <span className="error-text has-text-danger has-text-light">
              Responsibilities must have more than 100 chars
            </span>
          )}
          <div className="control">
            <textarea
              className={
                responsibilitiesError ? "textarea is-danger" : "textarea"
              }
              rows="5"
              value={job.jobDetails.responsibilities}
              onChange={(e) =>
                setJob({
                  ...job,
                  jobDetails: {
                    ...job.jobDetails.requirements,
                    responsibilities: e.target.value,
                  },
                })
              }
            ></textarea>
          </div>
        </div>
        <div className="field my-5">
          <label className="label">
            Essential Skills & Requirements{" "}
            <span className="required">(required)</span>
          </label>
          {requirementsError && (
            <span className="error-text has-text-danger has-text-light">
              Requirements must have more than 100 chars
            </span>
          )}
          <div className="control">
            <textarea
              className={requirementsError ? "textarea is-danger" : "textarea"}
              rows="5"
              value={job.jobDetails.requirements}
              onChange={(e) =>
                setJob({
                  ...job,
                  jobDetails: {
                    ...job.jobDetails,
                    requirements: e.target.value,
                  },
                })
              }
            ></textarea>
          </div>
        </div>
        <div className="field my-5">
          <label className="label">
            Bonus Skills <span className="required">(required)</span>
          </label>
          {bonusSkillsError && (
            <span className="error-text has-text-danger has-text-light">
              Bonus skills must be more than 30 chars
            </span>
          )}
          <div className="control">
            <textarea
              className={bonusSkillsError ? "textarea is-danger" : "textarea"}
              rows="5"
              value={job.jobDetails.bonusSkills}
              onChange={(e) =>
                setJob({
                  ...job,
                  jobDetails: {
                    ...job.jobDetails,
                    bonusSkills: e.target.value,
                  },
                })
              }
            ></textarea>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default PostJobPageTwo;
