import React, { useState } from "react";
import "./postJobPageOne.scss";

const PostJobPageOne = ({ darkTheme, job, setJob, page, setPage }) => {
  const [companyNameError, setCompanyNameError] = useState(false);
  const [companyDescError, setCompanyDescError] = useState(false);

  const nextPage = (e) => {
    e.preventDefault();

    if (job.companyName.length <= 2) {
      setCompanyNameError(true);
      console.log("Company Name INVALID", companyNameError);
    } else {
      setCompanyNameError(false);
      console.log("Company Name VALID", companyNameError);

      if (job.companyDescription.length < 100) {
        setCompanyDescError(true);
        console.log("Company description INVALID", companyDescError);
        console.log(companyDescError);
      } else {
        setCompanyDescError(false);
        console.log("Company description VALID", companyDescError);
        setPage(page + 1);
      }
    }
  };

  return (
    <div
      className={darkTheme ? "page-one-container dark" : "page-one-container"}
    >
      <h2 className="page-one-title">Company details</h2>
      <p className="page-one-short-desc">
        Fill the form below and let us know about your company. This information
        is required before posting a new job.
      </p>
      <hr />
      <div className="page-one-form">
        <div className="field my-5">
          <label className="label">Company name</label>
          {companyNameError && (
            <span className="error-text has-text-danger has-text-light">
              Company Name must be more than 3 characters
            </span>
          )}
          <div className="control">
            <input
              className={companyNameError ? "input is-danger" : "input"}
              type="text"
              placeholder="Your company name"
              value={job.companyName}
              onChange={(e) => setJob({ ...job, companyName: e.target.value })}
            />
          </div>
        </div>
        <div className="field my-3">
          <label className="label">Company logo</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Logo url"
              value={job.companyLogo}
              onChange={(e) => setJob({ ...job, companyLogo: e.target.value })}
            />
          </div>
        </div>
        <div className="field my-5">
          <label className="label">Company Description</label>
          {companyDescError && (
            <span className="error-text has-text-danger">
              Company description must be more than 100 characters
            </span>
          )}
          <div className="control">
            <textarea
              className={companyDescError ? "textarea is-danger" : "textarea"}
              placeholder="Company description"
              rows="10"
              value={job.companyDescription}
              onChange={(e) =>
                setJob({ ...job, companyDescription: e.target.value })
              }
            ></textarea>
          </div>
        </div>
        <div className="field has-text-centered">
          <button className="button next-button" onClick={(e) => nextPage(e)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostJobPageOne;
