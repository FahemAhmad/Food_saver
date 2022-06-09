import React from "react";
import styled from "styled-components";
import breakpoint from "../Breakpoints";
import * as yup from "yup";
import Img from "../Assets/login.jpg";
import { Field, Form, Formik } from "formik";
import ErrorMessage from "../Components/ErrorMessage";
import { loginUser } from "../Backend/apiCalls";
import { ToastFailure, ToastSuccess } from "../Components/Toast";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const validationSchema = yup.object().shape({
  Email: yup.string().email().required().label("Email"),
  Password: yup.string().required().label("Password"),
});

function Login() {
  const navigate = useNavigate();
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        Email: "",
        Password: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        await loginUser(values)
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res?.data?.Data?.data));

            resetForm();
            navigate("/inventory");
            ToastSuccess("User Registered");
          })
          .catch((err) => {
            ToastFailure(err.response.data?.Data?.message);
          });
      }}
    >
      {({ values, handleChange, errors, touched }) => (
        <div className="containerlogin">
          <div className="login-form">
            <Form>
              <div className="avatar">
                <img src="/examples/images/avatar.png" alt="Avatar" />
              </div>
              <h2 className="text-center">Member Login</h2>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="Email"
                  placeholder="Email"
                  required="required"
                  onChange={handleChange}
                  value={values.Email}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="Password"
                  placeholder="Password"
                  required="required"
                  onChange={handleChange}
                  value={values.Password}
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  sty
                >
                  Sign in
                </button>
              </div>
              <div className="bottom-action clearfix">
                <a href="/sign_in" className="float-right">
                  Forgot Password?
                </a>
              </div>
            </Form>
            <p className="text-center small">
              Don't have an account? <a href="/sign_up">Sign up here!</a>
            </p>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Login;
