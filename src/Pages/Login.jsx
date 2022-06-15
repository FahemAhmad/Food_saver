import React from "react";
import * as yup from "yup";

import { Form, Formik } from "formik";

import { loginUser } from "../Backend/apiCalls";
import { ToastFailure, ToastSuccess } from "../Components/Toast";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import Wave from "react-wavify";
import ErrorMessage from "../Components/ErrorMessage";
import { setCookie } from "../Backend/Aurh";

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
            setCookie("token", res.data.Data.token, 1);

            localStorage.setItem("user", JSON.stringify(res?.data?.Data?.data));
            resetForm();
            navigate("/inventory");
          })
          .catch((err) => {
            ToastFailure(err.response.data?.Data?.message);
          });
      }}
    >
      {({ values, handleChange, errors, touched }) => (
        <div>
          <div className="LoginPage">
            <div className="info">
              <h2 className="title">Reus</h2>
              <p className="description">
                Reducing food waste is a delicious way of saving money, helping
                to feed the world and protect the planet.
              </p>
            </div>
            <Form className="login-add-form">
              <div className="loginContainer">
                <div className="form-contro ">
                  <label className="label">Username</label>
                  <input
                    type="text"
                    name="Email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                    value={values.Email}
                  />
                  {errors.Email && touched.Email && (
                    <ErrorMessage error={errors.Email} />
                  )}
                </div>
                <div className="form-contro ">
                  <label className="label">Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    name="Password"
                    onChange={handleChange}
                    value={values.Password}
                  />
                  {errors.Password && touched.Password && (
                    <ErrorMessage error={errors.Password} />
                  )}
                </div>
                <input type="submit" className="butn butn-block" />
                <div
                  style={{
                    width: "100%",

                    textAlign: "center",
                  }}
                >
                  <NavLink to="/sign_up" className="hoverLine go-to-register">
                    Create New Account
                  </NavLink>
                </div>
              </div>
            </Form>
          </div>
          <div>
            <Wave
              className="second-wave"
              fill="rgba(93,188,156,0.5)"
              paused={false}
              options={{
                height: 20,
                amplitude: 20,
                speed: 0.25,
                points: 5,
              }}
            />
            <Wave
              className="wave"
              fill="#5dbc9c"
              paused={false}
              options={{
                height: 40,
                amplitude: 37,
                speed: 0.25,
                points: 5,
              }}
            />
          </div>
        </div>
        // <div className="containerlogin">
        //   <div className="login-form">
        //     <Form>
        //       <div className="avatar">
        //         <img src="/examples/images/avatar.png" alt="Avatar" />
        //       </div>
        //       <h2 className="text-center">Member Login</h2>
        //       <div className="form-group">
        //         <input
        //           type="text"
        //           className="form-control"
        //           name="Email"
        //           placeholder="Email"
        //           required="required"
        //           onChange={handleChange}
        //           value={values.Email}
        //         />
        //       </div>
        //       <div className="form-group">
        //         <input
        //           type="password"
        //           className="form-control"
        //           name="Password"
        //           placeholder="Password"
        //           required="required"
        //           onChange={handleChange}
        //           value={values.Password}
        //         />
        //       </div>
        //       <div className="form-group">
        //         <button
        //           type="submit"
        //           className="btn btn-primary btn-lg btn-block"
        //           sty
        //         >
        //           Sign in
        //         </button>
        //       </div>
        //       <div className="bottom-action clearfix">
        //         <a href="/sign_in" className="float-right">
        //           Forgot Password?
        //         </a>
        //       </div>
        //     </Form>
        //     <p className="text-center small">
        //       Don't have an account? <a href="/sign_up">Sign up here!</a>
        //     </p>
        //   </div>
        // </div>
      )}
    </Formik>
  );
}

export default Login;
