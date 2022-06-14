import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

import "./login.scss";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/userActions";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [takenError, setTakenError] = useState(false);

  const [loginSuccess, setLoginSuccess] = useState(false);

  const history = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;

  const { registerSuccess } = useParams();

  const loginHandler = (e) => {
    e.preventDefault();
    if (user.email.length < 5 || user.email == "") {
      setEmailError(true);
    } else {
      setEmailError(false);
      if (user.password == "" || user.password.length < 5) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
        // setSignedIn(true);
        dispatch(loginUser(user));
      }
    }
  };

  useEffect(() => {
    // If they are already logged in then redirect to the profile page.
    if (userInfo) {
      history("/");
    }
  }, [history, userInfo]);
  

  useEffect(() => {
    if(error == "INCORRECT PASSWORD") {
      // alert("Email already exists");
      setTakenError(true);
    } 
  }, [error]);

  useEffect(() => {
    if(registerSuccess === "1") {
      setLoginSuccess(true);
    }

    return () => {
     // alert("UNMOUNTING")
     dispatch({ type: "USER_LOGIN_RESET" });
  }
  }, [])

  return (
    <div className="columns login-page">
      <div className="column is-6 login-form-col">
        <Link to="/" className="go-home">
          Go Home
        </Link>
        <h1 className="login-form-title">Welcome back</h1>
        <p className="login-form-subtitle">
          Welcome back, please enter your details
        </p>
        {takenError && (
          <p className="login-form-subtitle has-text-danger">
            Incorrect email or password
          </p>
        )}
        {loginSuccess && (
          <p className="login-form-subtitle has-text-primary">
            Register success! You can now login.
          </p>
        )}

        <form className="form my-5" onSubmit={loginHandler}>
          <div className="field">
            <label className="label">Email</label>
            {emailError && (
              <p className="error-text has-text-danger">Email error</p>
            )}
            <div className="control">
              <input
                className={emailError ? "input is-danger" : "input"}
                type="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            {passwordError && (
              <p className="error-text has-text-danger">Password error</p>
            )}
            <div className="control">
              <input
                className={passwordError ? "input is-danger" : "input"}
                type="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
          </div>
{/*<a className="forgot-password">Forgot password</a>*/}
          <div className="field my-3">
            <div className="control">
              <button
                className="button login-button is-fullwidth"
                type="submit"
              >
                {loading ? <span>Loading ...</span> : <span>Sign In</span>}
              </button>
            </div>
          </div>
          <div className="sign-up-text has-text-centered">
            Do not have an account? <Link to="/register">Sign up for free</Link>
          </div>
        </form>
      </div>
      <div className="column image-col"></div>
    </div>
  );
};

export default Login;
