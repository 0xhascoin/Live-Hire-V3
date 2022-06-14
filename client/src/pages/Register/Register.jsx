import React, { useEffect, useState } from 'react';
import './register.scss';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../actions/userActions";

// Components



const Register = () => {

  const [user, setUser] = useState({
    name: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: ""
  });

  // userRegister
  const userRegister = useSelector((state) => state.userRegister);
  let { loading, error } = userRegister;


  const [nameError, setNameError] = useState(false)
  const [locationError, setLocationError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [emailExists, setEmailExists] = useState(false)
  

  const chooseUserType = (e, uType) => {
    e.preventDefault();
    setUser({
      name: "",
      location: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: uType
    });
  }

  const registerHandler = (e) => {
    e.preventDefault();
    if (user.name.length < 5 || user.name == "") {
      setNameError(true);
    } else {
      setNameError(false);
      if (user.email.length < 5 || user.email == "") {
        setEmailError(true);
      } else {
        setEmailError(false);
        if (user.password == "" || user.password.length < 5) {
          setPasswordError(true);
        } else {
          setPasswordError(false)
          if (user.confirmPassword == "" || user.confirmPassword.length < 5 || user.confirmPassword !== user.password) {
            setConfirmPasswordError(true);
            // alert("PASSWORDS DO NOT MATCH");
          } else {
            setConfirmPasswordError(false);
            if(user.location == "") {
              setLocationError(true);
            } else {
              setLocationError(false);
              dispatch(registerUser(user));

              history("/login/1")
            }
          }
          
        }
      }
    }
  }

  const history = useNavigate();
  const dispatch = useDispatch();

  // Gets the userRegister state from redux & stores it as userInfo
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // If a user is already logged in, redirect to the profile page
    if (userInfo) {
      history("/");
    }
  }, [history, userInfo]);


  useEffect(() => {
    if(error == "EXISTS") {
      // alert("Email already exists");
      setEmailExists(true);
    } 
  }, [error]);

  useEffect(() => {
    return () => {
     // alert("UNMOUNTING")
     dispatch({ type: "USER_REGISTER_RESET" });
  }
  },[])


  return (
    <div className="columns register-page">
      <div className="column is-6 login-form-col">
        <Link to="/" className="go-home">
          Go Home
    </Link>
        <h1 className="login-form-title">Welcome to Live Hire</h1>
        <p className="login-form-subtitle">Welcome! please enter your details to create an account</p>
        {emailExists && (
          <p className="login-form-subtitle has-text-danger">
            Email already in use.
          </p>
        )}
        <form className="form my-5" onSubmit={registerHandler}>
          <label class="label user-type-text">Are you an employer or looking for a job?</label>
          <div class="field is-grouped">
            <div class="control user-type-control">
              <button
                class={user.userType == "user" ? "button is-dark is-active" : "button is-dark is-outlined is-not-active"}
                onClick={(e) => chooseUserType(e, "user")}>
                <span>Job seeker</span>
                {user.userType == "user" && (
                  <span class="icon">
                    <i class="far fa-dot-circle"></i>
                  </span>
                )}
              </button>
            </div>
            <div class="control user-type-control">
              <button class={user.userType == "employer" ? "button is-dark is-active" : "button is-dark is-outlined is-not-active"}
                onClick={(e) => chooseUserType(e, "employer")}>              <span>Employer</span>
                {user.userType == "employer" && (
                  <span class="icon">
                    <i class="far fa-dot-circle"></i>
                  </span>
                )}</button>
            </div>
          </div>
          {user.userType !== "" && (
            <>

              <div class="field">
                <label class="label">Name</label>
                {nameError && (
                  <p className="error-text has-text-danger">
                    Name error
                </p>
                )}
                <div class="control">
                  <input
                    class={nameError ? "input is-danger" : "input"}
                    type="text"
                    placeholder="Enter your full name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })} />
                </div>
              </div>
              {/*
              TODO: ADD LOCATION ERROR STATE
              TODO: ADD LOCATION ERROR TO REGISTER HANDLER FUNCTION
            */}
              <div class="field">
                <label class="label">Location</label>
                {locationError && (
                  <p className="error-text has-text-danger">
                    Location error
                </p>
                )}
                <div class="control">
                  <div class={locationError ? "select is-danger" : "select"}>
                    <select value={user.location}
                      onChange={(e) => setUser({ ...user, location: e.target.value })}>
                      <option value="">
                        Select a location
                    </option>
                    <option value="AF">Afghanistan</option>
    <option value="AX">Åland Islands</option>
    <option value="AL">Albania</option>
    <option value="DZ">Algeria</option>
    <option value="AS">American Samoa</option>
    <option value="AD">Andorra</option>
    <option value="AO">Angola</option>
    <option value="AI">Anguilla</option>
    <option value="AQ">Antarctica</option>
    <option value="AG">Antigua and Barbuda</option>
    <option value="AR">Argentina</option>
    <option value="AM">Armenia</option>
    <option value="AW">Aruba</option>
    <option value="AU">Australia</option>
    <option value="AT">Austria</option>
    <option value="AZ">Azerbaijan</option>
    <option value="BS">Bahamas</option>
    <option value="BH">Bahrain</option>
    <option value="BD">Bangladesh</option>
    <option value="BB">Barbados</option>
    <option value="BY">Belarus</option>
    <option value="BE">Belgium</option>
    <option value="BZ">Belize</option>
    <option value="BJ">Benin</option>
    <option value="BM">Bermuda</option>
    <option value="BT">Bhutan</option>
    <option value="BO">Bolivia, Plurinational State of</option>
    <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
    <option value="BA">Bosnia and Herzegovina</option>
    <option value="BW">Botswana</option>
    <option value="BV">Bouvet Island</option>
    <option value="BR">Brazil</option>
    <option value="IO">British Indian Ocean Territory</option>
    <option value="BN">Brunei Darussalam</option>
    <option value="BG">Bulgaria</option>
    <option value="BF">Burkina Faso</option>
    <option value="BI">Burundi</option>
    <option value="KH">Cambodia</option>
    <option value="CM">Cameroon</option>
    <option value="CA">Canada</option>
    <option value="CV">Cape Verde</option>
    <option value="KY">Cayman Islands</option>
    <option value="CF">Central African Republic</option>
    <option value="TD">Chad</option>
    <option value="CL">Chile</option>
    <option value="CN">China</option>
    <option value="CX">Christmas Island</option>
    <option value="CC">Cocos (Keeling) Islands</option>
    <option value="CO">Colombia</option>
    <option value="KM">Comoros</option>
    <option value="CG">Congo</option>
    <option value="CD">Congo, the Democratic Republic of the</option>
    <option value="CK">Cook Islands</option>
    <option value="CR">Costa Rica</option>
    <option value="CI">Côte d'Ivoire</option>
    <option value="HR">Croatia</option>
    <option value="CU">Cuba</option>
    <option value="CW">Curaçao</option>
    <option value="CY">Cyprus</option>
    <option value="CZ">Czech Republic</option>
    <option value="DK">Denmark</option>
    <option value="DJ">Djibouti</option>
    <option value="DM">Dominica</option>
    <option value="DO">Dominican Republic</option>
    <option value="EC">Ecuador</option>
    <option value="EG">Egypt</option>
    <option value="SV">El Salvador</option>
    <option value="GQ">Equatorial Guinea</option>
    <option value="ER">Eritrea</option>
    <option value="EE">Estonia</option>
    <option value="ET">Ethiopia</option>
    <option value="FK">Falkland Islands (Malvinas)</option>
    <option value="FO">Faroe Islands</option>
    <option value="FJ">Fiji</option>
    <option value="FI">Finland</option>
    <option value="FR">France</option>
    <option value="GF">French Guiana</option>
    <option value="PF">French Polynesia</option>
    <option value="TF">French Southern Territories</option>
    <option value="GA">Gabon</option>
    <option value="GM">Gambia</option>
    <option value="GE">Georgia</option>
    <option value="DE">Germany</option>
    <option value="GH">Ghana</option>
    <option value="GI">Gibraltar</option>
    <option value="GR">Greece</option>
    <option value="GL">Greenland</option>
    <option value="GD">Grenada</option>
    <option value="GP">Guadeloupe</option>
    <option value="GU">Guam</option>
    <option value="GT">Guatemala</option>
    <option value="GG">Guernsey</option>
    <option value="GN">Guinea</option>
    <option value="GW">Guinea-Bissau</option>
    <option value="GY">Guyana</option>
    <option value="HT">Haiti</option>
    <option value="HM">Heard Island and McDonald Islands</option>
    <option value="VA">Holy See (Vatican City State)</option>
    <option value="HN">Honduras</option>
    <option value="HK">Hong Kong</option>
    <option value="HU">Hungary</option>
    <option value="IS">Iceland</option>
    <option value="IN">India</option>
    <option value="ID">Indonesia</option>
    <option value="IR">Iran, Islamic Republic of</option>
    <option value="IQ">Iraq</option>
    <option value="IE">Ireland</option>
    <option value="IM">Isle of Man</option>
    <option value="IL">Israel</option>
    <option value="IT">Italy</option>
    <option value="JM">Jamaica</option>
    <option value="JP">Japan</option>
    <option value="JE">Jersey</option>
    <option value="JO">Jordan</option>
    <option value="KZ">Kazakhstan</option>
    <option value="KE">Kenya</option>
    <option value="KI">Kiribati</option>
    <option value="KP">Korea, Democratic People's Republic of</option>
    <option value="KR">Korea, Republic of</option>
    <option value="KW">Kuwait</option>
    <option value="KG">Kyrgyzstan</option>
    <option value="LA">Lao People's Democratic Republic</option>
    <option value="LV">Latvia</option>
    <option value="LB">Lebanon</option>
    <option value="LS">Lesotho</option>
    <option value="LR">Liberia</option>
    <option value="LY">Libya</option>
    <option value="LI">Liechtenstein</option>
    <option value="LT">Lithuania</option>
    <option value="LU">Luxembourg</option>
    <option value="MO">Macao</option>
    <option value="MK">Macedonia, the former Yugoslav Republic of</option>
    <option value="MG">Madagascar</option>
    <option value="MW">Malawi</option>
    <option value="MY">Malaysia</option>
    <option value="MV">Maldives</option>
    <option value="ML">Mali</option>
    <option value="MT">Malta</option>
    <option value="MH">Marshall Islands</option>
    <option value="MQ">Martinique</option>
    <option value="MR">Mauritania</option>
    <option value="MU">Mauritius</option>
    <option value="YT">Mayotte</option>
    <option value="MX">Mexico</option>
    <option value="FM">Micronesia, Federated States of</option>
    <option value="MD">Moldova, Republic of</option>
    <option value="MC">Monaco</option>
    <option value="MN">Mongolia</option>
    <option value="ME">Montenegro</option>
    <option value="MS">Montserrat</option>
    <option value="MA">Morocco</option>
    <option value="MZ">Mozambique</option>
    <option value="MM">Myanmar</option>
    <option value="NA">Namibia</option>
    <option value="NR">Nauru</option>
    <option value="NP">Nepal</option>
    <option value="NL">Netherlands</option>
    <option value="NC">New Caledonia</option>
    <option value="NZ">New Zealand</option>
    <option value="NI">Nicaragua</option>
    <option value="NE">Niger</option>
    <option value="NG">Nigeria</option>
    <option value="NU">Niue</option>
    <option value="NF">Norfolk Island</option>
    <option value="MP">Northern Mariana Islands</option>
    <option value="NO">Norway</option>
    <option value="OM">Oman</option>
    <option value="PK">Pakistan</option>
    <option value="PW">Palau</option>
    <option value="PS">Palestinian Territory, Occupied</option>
    <option value="PA">Panama</option>
    <option value="PG">Papua New Guinea</option>
    <option value="PY">Paraguay</option>
    <option value="PE">Peru</option>
    <option value="PH">Philippines</option>
    <option value="PN">Pitcairn</option>
    <option value="PL">Poland</option>
    <option value="PT">Portugal</option>
    <option value="PR">Puerto Rico</option>
    <option value="QA">Qatar</option>
    <option value="RE">Réunion</option>
    <option value="RO">Romania</option>
    <option value="RU">Russian Federation</option>
    <option value="RW">Rwanda</option>
    <option value="BL">Saint Barthélemy</option>
    <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
    <option value="KN">Saint Kitts and Nevis</option>
    <option value="LC">Saint Lucia</option>
    <option value="MF">Saint Martin (French part)</option>
    <option value="PM">Saint Pierre and Miquelon</option>
    <option value="VC">Saint Vincent and the Grenadines</option>
    <option value="WS">Samoa</option>
    <option value="SM">San Marino</option>
    <option value="ST">Sao Tome and Principe</option>
    <option value="SA">Saudi Arabia</option>
    <option value="SN">Senegal</option>
    <option value="RS">Serbia</option>
    <option value="SC">Seychelles</option>
    <option value="SL">Sierra Leone</option>
    <option value="SG">Singapore</option>
    <option value="SX">Sint Maarten (Dutch part)</option>
    <option value="SK">Slovakia</option>
    <option value="SI">Slovenia</option>
    <option value="SB">Solomon Islands</option>
    <option value="SO">Somalia</option>
    <option value="ZA">South Africa</option>
    <option value="GS">South Georgia and the South Sandwich Islands</option>
    <option value="SS">South Sudan</option>
    <option value="ES">Spain</option>
    <option value="LK">Sri Lanka</option>
    <option value="SD">Sudan</option>
    <option value="SR">Suriname</option>
    <option value="SJ">Svalbard and Jan Mayen</option>
    <option value="SZ">Swaziland</option>
    <option value="SE">Sweden</option>
    <option value="CH">Switzerland</option>
    <option value="SY">Syrian Arab Republic</option>
    <option value="TW">Taiwan, Province of China</option>
    <option value="TJ">Tajikistan</option>
    <option value="TZ">Tanzania, United Republic of</option>
    <option value="TH">Thailand</option>
    <option value="TL">Timor-Leste</option>
    <option value="TG">Togo</option>
    <option value="TK">Tokelau</option>
    <option value="TO">Tonga</option>
    <option value="TT">Trinidad and Tobago</option>
    <option value="TN">Tunisia</option>
    <option value="TR">Turkey</option>
    <option value="TM">Turkmenistan</option>
    <option value="TC">Turks and Caicos Islands</option>
    <option value="TV">Tuvalu</option>
    <option value="UG">Uganda</option>
    <option value="UA">Ukraine</option>
    <option value="AE">United Arab Emirates</option>
    <option value="GB">United Kingdom</option>
    <option value="US">United States</option>
    <option value="UM">United States Minor Outlying Islands</option>
    <option value="UY">Uruguay</option>
    <option value="UZ">Uzbekistan</option>
    <option value="VU">Vanuatu</option>
    <option value="VE">Venezuela, Bolivarian Republic of</option>
    <option value="VN">Viet Nam</option>
    <option value="VG">Virgin Islands, British</option>
    <option value="VI">Virgin Islands, U.S.</option>
    <option value="WF">Wallis and Futuna</option>
    <option value="EH">Western Sahara</option>
    <option value="YE">Yemen</option>
    <option value="ZM">Zambia</option>
    <option value="ZW">Zimbabwe</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                {emailError && (
                  <p className="error-text has-text-danger">
                    Email error
                </p>
                )}
                <div class="control">
                  <input
                    class={emailError ? "input is-danger" : "input"}
                    type="email"
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>
              </div>
              <div class="field is-grouped">
                <div class="control password-control">
                  <label class="label">Password</label>
                  {passwordError && (
                    <p className="error-text has-text-danger">
                      Password error
                  </p>
                  )}
                  <input
                    class={passwordError ? "input is-danger" : "input"}
                    type="password"
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>
                <div class="control password-control">
                  <label class="label">Confirm Password</label>
                  {confirmPasswordError && (
                    <p className="error-text has-text-danger">
                      Passwords do not match.
                  </p>
                  )}
                  <input
                    class={confirmPasswordError ? "input is-danger" : "input"}
                    type="password"
                    placeholder="Confirm your password"
                    value={user.confirmPassword}
                    onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
                </div>
              </div>
              {/*            
            // TODO: CHANGE THIS TO COMPANY NAME
            // TODO: CREATE THE COMPANYNAMERROR STATE
            
                          {user.userType == "employer" && (
                <div class="field">
                  <label class="label">Company Name</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Enter your company name"
                      value={user.companyName}
                      onChange={(e) => setUser({ ...user, companyName: e.target.value })} />
                  </div>
                </div>
              )}
            */}

              <div class="field my-3">
                <div class="control">
                  <button className="button login-button is-fullwidth"
                    type="submit">
                    {loading ? (
                      <span>
                        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                      </span>
                    ) : (
                        <span>Register</span>
                      )}
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="sign-up-text has-text-centered">
            Have an account? <Link to="/login">Login to your account</Link>
          </div>
        </form>
      </div>
      <div className="column image-col">
      </div>
    </div>
  )
}

export default Register;
