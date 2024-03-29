import { strictEqual } from "assert";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { handleSignUpAPI } from "../../services/customerService";
import "./signup.css";

const SignUp = () => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    gender: true,
    dateOfBirth: null,
    phoneNumber: "",
    errMessage: "",
    isShowPassword: false,
    isShowConfirm: false,
  });

  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/");
    }
  });

  const handleUsername = (e) => {
    setState((previousState) => {
      return { ...previousState, username: e.target.value };
    });
  };

  const handleEmail = (e) => {
    setState((previousState) => {
      return { ...previousState, email: e.target.value };
    });
  };

  const handlePassword = (e) => {
    setState((previousState) => {
      return { ...previousState, password: e.target.value };
    });
  };

  const handleConfirm = (e) => {
    setState((previousState) => {
      return { ...previousState, confirm: e.target.value };
    });
  };

  const handleShowHidePassword = () => {
    setState((previousState) => {
      return { ...previousState, isShowPassword: !state.isShowPassword };
    });
  };

  const handleShowHideConfirm = () => {
    setState((previousState) => {
      return { ...previousState, isShowConfirm: !state.isShowConfirm };
    });
  };

  const handleDateOfBirth = (e) => {
    setState((previousState) => {
      return { ...previousState, dateOfBirth: e.target.value };
    });
  };

  const handlePhoneNumber = (e) => {
    setState((previousState) => {
      return { ...previousState, phoneNumber: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState((previousState) => {
      return { ...previousState, errMessage: "" };
    });

    if (!state.email || !state.password || !state.username || !state.confirm) {
      setState((previousState) => {
        return { ...previousState, errMessage: "Missing required parameter!" };
      });
    } else if (state.password.length < 6)
      setState((previousState) => {
        return {
          ...previousState,
          errMessage:
            "Your password must be at least 6 characters. Please try a different password",
        };
      });
    else if (state.password !== state.confirm)
      setState((previousState) => {
        return {
          ...previousState,
          errMessage:
            "Your confirmation password does not match. Please try again",
        };
      });
    else if (state.phoneNumber != "" && state.phoneNumber.length != 10)
      setState((previousState) => {
        return {
          ...previousState,
          errMessage: "Invalid phone number",
        };
      });
    else {
      try {
        setState((previousState) => {
          return {
            ...previousState,
            errMessage: "Checking...",
          };
        });
        await handleSignUpAPI(state).then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data.data) {
            localStorage.setItem(
              "user-info",
              JSON.stringify(response.data.data)
            );
            history.push("/");
          }
        });
      } catch (error) {
        setState((previousState) => {
          return {
            ...previousState,
            errMessage: error.response.data.msg,
          };
        });
      }
    }
  };

  return (
    <div>
      <div className="container-fluid bg-login login-container">
        <main className="signup-form">
          <form onSubmit={handleSubmit}>
            <h1 className="login-title mb-4">Sign up</h1>
            <div className="form-group row mb-3">
              <div className="col-sm-3 col-form-label">
                <label htmlFor="username">Username</label>
                <span>*</span>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  onChange={handleUsername}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <div className="col-sm-3 col-form-label">
                <label htmlFor="email">Email</label>
                <span>*</span>
              </div>
              <div className="col-sm-9">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={handleEmail}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <div className="col-sm-3 col-form-label">
                <label htmlFor="password">Password</label>
                <span>*</span>
              </div>
              <div className="col-sm-9 customize-input-password">
                <input
                  type={state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePassword}
                />
                <span onClick={handleShowHidePassword}>
                  <i
                    className={
                      state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="form-group row mb-3">
              <div className="col-sm-3 col-form-label">
                <label htmlFor="verify-password">Confirm</label>
                <span className="starConfirm">*</span>
              </div>
              <div className="col-sm-9 customize-input-password">
                <input
                  type={state.isShowConfirm ? "text" : "password"}
                  className="form-control"
                  id="verify-password"
                  onChange={handleConfirm}
                />
                <span onClick={handleShowHideConfirm}>
                  <i
                    className={
                      state.isShowConfirm ? "fas fa-eye" : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <fieldset className="form-group row mb-3">
              <legend className="col-form-label col-sm-3 pt-0">Gender</legend>
              <div className="col-sm-9 ">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio" // 01
                    id="check1"
                    name="gridRadios" // 02
                    defaultValue="option1"
                    defaultChecked
                    onChange={() => {
                      setState((previousState) => {
                        return { ...previousState, gender: !state.gender };
                      });
                    }}
                  />
                  <label className="form-check-label" htmlFor="check1">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="check2"
                    name="gridRadios"
                    defaultValue="option2"
                    onChange={() => {
                      setState((previousState) => {
                        return { ...previousState, gender: !state.gender };
                      });
                    }}
                  />
                  <label className="form-check-label" htmlFor="check2">
                    Female
                  </label>
                </div>
              </div>
            </fieldset>
            <div className="form-group row mb-3">
              <label
                htmlFor="date-of-birth"
                className="col-sm-3 col-form-label"
              >
                Date of Birth
              </label>
              <div className="col-sm-9">
                <input
                  type="date"
                  className="form-control text-center"
                  id="date-of-birth"
                  onChange={handleDateOfBirth}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label htmlFor="phone-number" className="col-sm-3 col-form-label">
                Phone number
              </label>
              <div className="col-sm-9">
                <input
                  type="tel"
                  className="form-control"
                  id="phone-number"
                  onChange={handlePhoneNumber}
                />
              </div>
            </div>
            <div className="form-group row mb-3 text-center">
              <div className="col-sm-12">
                <div style={{ color: "red" }} className="errMessage">
                  {state.errMessage}
                </div>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};
export default SignUp;
