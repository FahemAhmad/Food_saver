import React from "react";
import styled from "styled-components";
import breakpoint from "../Breakpoints";
import * as yup from "yup";
import Login from "../Assets/login.jpg";
import { Field, Form, Formik } from "formik";
import ErrorMessage from "../Components/ErrorMessage";
import { registerUser } from "../Backend/apiCalls";
import SelectField from "../Components/SelectField";
import { ToastFailure, ToastSuccess } from "../Components/Toast";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const validationSchema = yup.object().shape({
  Name: yup.string().required().label("Name").min(2).max(100),
  Email: yup.string().email().required().label("Email"),
  Password: yup.string().required().label("Password"),
  CPassword: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Passwords must match"),
  Age: yup.number().required().label("Age").nullable(true),
  Gender: yup.string().min(2, "Must be more than 10 characters"),
});

const options = [
  { value: "Male" },
  { value: "Female" },
  { value: "Prefer not to say" },
];

function Signup() {
  const navigate = useNavigate();
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        Name: "",
        Email: "",
        Password: "",
        Age: "",
        Gender: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        values.Age = parseInt(values.Age);
        await registerUser(values)
          .then((res) => {
            ToastSuccess("User Registered");
            navigate("/sign_in");
            resetForm();
          })
          .catch((err) => {
            ToastFailure(err.response.data);
          });
      }}
    >
      {({ errors, touched, handleBlur, handleChange, values }) => (
        <div className="containerSignUp">
          <div className="signup-form">
            <Form>
              <h2>Sign Up</h2>
              <p>Please fill in this form to create an account!</p>
              <hr />
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <span className="fa fa-user"></span>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="Name"
                    placeholder="Name"
                    value={values.Name}
                    onChange={handleChange}
                  />
                </div>
                {errors.Name && touched.Name && (
                  <ErrorMessage error={errors.Name} />
                )}
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-paper-plane"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    name="Email"
                    placeholder="Email Address"
                    value={values.Email}
                    onChange={handleChange}
                  />
                </div>
                {errors.Email && touched.Email && (
                  <ErrorMessage error={errors.Email} />
                )}
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    name="Password"
                    placeholder="Password"
                    value={values.Password}
                    onChange={handleChange}
                  />
                </div>
                {errors.Password && touched.Password && (
                  <ErrorMessage error={errors.Password} />
                )}
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                      <i className="fa fa-check"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    name="CPassword"
                    placeholder="Confirm Password"
                    value={values.CPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.CPassword && touched.CPassword && (
                  <ErrorMessage error={errors.CPassword} />
                )}
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-calendar-check-o"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="Age"
                    placeholder="Age"
                    required="required"
                    value={values.Age}
                    onChange={handleChange}
                  />
                </div>
                {errors.Age && touched.Age && (
                  <ErrorMessage error={errors.Age} />
                )}
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-genderless"></i>
                    </span>
                  </div>
                  <select
                    type="text"
                    className="form-control"
                    name="Gender"
                    placeholder="Gender"
                    required="required"
                    onChange={handleChange}
                  >
                    <option value={""}>Select your Gender</option>
                    {options.map((op, index) => (
                      <option key={index} value={op.value}>
                        {op.value}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.Gender && touched.Gender && (
                  <ErrorMessage error={errors.Gender} />
                )}
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-lg">
                  Sign Up
                </button>
              </div>
            </Form>
            <div className="text-center">
              Already have an account? <a href="/sign_in">Login here</a>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Signup;
