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
        values.age = parseInt(values.age);

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
      {({ errors, touched }) => (
        <Container>
          <Box>
            <Section1 />
            <Section2>
              <Form style={{ height: "100%" }}>
                <MainHeading>Login</MainHeading>

                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    padding: "2% 0% 0% 0%",
                  }}
                >
                  <TextField type="email" name="Email" placeholder="Email" />
                  {errors.Email && touched.Email && (
                    <ErrorMessage error={errors.Email} />
                  )}
                  <TextField
                    type="password"
                    name="Password"
                    placeholder="Password"
                  />
                  {errors.Password && touched.Password && (
                    <ErrorMessage error={errors.Password} />
                  )}

                  <Button type="submit">Login</Button>
                </div>
              </Form>
              <Span>OR -- Dont have an Account ?</Span>
              <Button onClick={() => navigate("/sign_up")}>Sign Up</Button>
            </Section2>
          </Box>
        </Container>
      )}
    </Formik>
  );
}

export default Login;

const Container = styled.div`
  background-color: #f9eee2;

  min-height: 100vh;
  width: 100%;
`;

const Box = styled.div`
  position: absolute;
  inset: 0;
  margin: auto;
  border: 1px solid #f3d3b7;
  height: 100%;
  margin: 2% 5%;

  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and ${breakpoint.device.xs} {
    flex-direction: column;
  }
  @media only screen and ${breakpoint.device.sm} {
    flex-direction: row;
  }
`;

const Section1 = styled.section`
  background-image: url(${Img});

  @media only screen and ${breakpoint.device.xs} {
    width: 100%;
    height: 40vw;
    background-position: 50% 50%;
    background-size: cover;
  }
  @media only screen and ${breakpoint.device.sm} {
    width: 50%;
    height: 45vh;
    background-position: 50% 50%;
    background-size: cover;
  }
`;

const Section2 = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2% 0%;

  width: 100%;
`;

const TextField = styled(Field)`
  margin: 0% 20%;
  padding: 15px 10px;
  background-color: #f9eee2;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #f3d3b7;
  padding: 10px;
  margin: 0% 20%;
`;

const MainHeading = styled.h1`
  font-size: 2.5rem;
  color: #8e4404;
  font-style: italic;
  font-weight: 900;
  width: 100%;
  text-align: center;
`;

const Span = styled.span`
  font-size: 1rem;
  color: black;
  width: 100%;
  text-align: center;
  padding: 10px 0;
`;
