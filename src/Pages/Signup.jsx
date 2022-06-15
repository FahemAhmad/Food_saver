import React from "react";

import * as yup from "yup";

import { Form, Formik } from "formik";
import ErrorMessage from "../Components/ErrorMessage";
import { registerUser } from "../Backend/apiCalls";

import { ToastFailure, ToastSuccess } from "../Components/Toast";
import { NavLink, useNavigate } from "react-router-dom";
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
        CPassword: "",
        Age: "",
        Gender: "",
      }}
      onSubmit={async (values, { resetForm }) => {
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
      {({ errors, touched, handleChange, values }) => (
        <div>
          <div className="RegisterPage">
            <div className="info">
              <h2 className="title">Reus</h2>
              <p className="description">
                Reducing food waste is a delicious way of saving money, helping
                to feed the world and protect the planet.
              </p>
            </div>
            <Form className="register-add-form">
              <div className="loginContainer">
                <div className="regi-form-contro">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="Name"
                    value={values.Name}
                    onChange={handleChange}
                  />
                  {errors.Name && touched.Name && (
                    <ErrorMessage error={errors.Name} />
                  )}
                </div>
                <div className="regi-form-contro">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    placeholder="Your email"
                    name="Email"
                    value={values.Email}
                    onChange={handleChange}
                  />
                  {errors.Email && touched.Email && (
                    <ErrorMessage error={errors.Email} />
                  )}
                </div>
                <div className="regi-form-contro">
                  <label className="label">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="Password"
                    value={values.Password}
                    onChange={handleChange}
                  />
                  {errors.Password && touched.Password && (
                    <ErrorMessage error={errors.Password} />
                  )}
                </div>
                <div className="regi-form-contro">
                  <label className="label">Confirm Password</label>
                  <input
                    type="password"
                    name="CPassword"
                    placeholder="Confirm Password"
                    value={values.CPassword}
                    onChange={handleChange}
                  />
                  {errors.CPassword && touched.CPassword && (
                    <ErrorMessage error={errors.CPassword} />
                  )}
                </div>
                <div className="regi-form-contro">
                  <label className="label">Age</label>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    placeholder="Enter Age"
                    name="Age"
                    value={values.Age}
                    onChange={handleChange}
                  />
                  {errors.Age && touched.Age && (
                    <ErrorMessage error={errors.Age} />
                  )}
                </div>
                <div className="regi-form-contro ">
                  <label className="label">Gender</label>

                  <select
                    type="text"
                    className="form-control"
                    name="Gender"
                    placeholder="Gender"
                    onChange={handleChange}
                  >
                    <option value={""}>Select your Gender</option>
                    {options.map((op, index) => (
                      <option key={index} value={op.value}>
                        {op.value}
                      </option>
                    ))}
                  </select>
                  {errors.Gender && touched.Gender && (
                    <ErrorMessage error={errors.Gender} />
                  )}
                </div>

                <input
                  type="submit"
                  className="butn butn-block"
                  value="Register"
                />
                <span className="go-to">
                  <div style={{ width: "100%", textAlign: "center" }}>
                    Have an Account?{" "}
                    <NavLink to="/sign_in" className="hoverLine go-to-login">
                      {" "}
                      Log In{" "}
                    </NavLink>{" "}
                  </div>
                </span>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Signup;
