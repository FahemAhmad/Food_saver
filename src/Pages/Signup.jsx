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

const validationSchema = yup.object().shape({
  Name: yup.string().required().label("Name").min(2).max(100),
  Email: yup.string().email().required().label("Email"),
  Password: yup.string().required().label("Password"),
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
        <Container>
          <Box>
            <Section1 />
            <Section2>
              <Form style={{ height: "100%" }}>
                <MainHeading>Sign Up</MainHeading>

                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    padding: "2% 0%",
                  }}
                >
                  <TextField type="text" name="Name" placeholder="Name" />
                  {errors.Name && touched.Name && (
                    <ErrorMessage error={errors.Name} />
                  )}
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
                  <TextField type="text" name="Age" placeholder="Age" />
                  {errors.Age && touched.Age && (
                    <ErrorMessage error={errors.Age} />
                  )}
                  <SelectField
                    name={"Gender"}
                    options={options}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.Gender}
                    error={errors.Gender}
                    touched={touched.Gender}
                  />
                  <Button type="submit">Register</Button>
                </div>
              </Form>
              <Span>OR -- Already have an Account ?</Span>
              <Button onClick={() => navigate("/sign_in")}>Login</Button>
            </Section2>
          </Box>
        </Container>
      )}
    </Formik>
  );
}

export default Signup;

const Container = styled.div`
  background-color: #f9eee2;

  min-height: 100vh;
  width: 100%;
  padding: 1% 3%;
`;

const Box = styled.div`
  border: 1px solid #f3d3b7;
  height: 100%;
  display: flex;
  @media only screen and ${breakpoint.device.xs} {
    flex-direction: column;
  }
  @media only screen and ${breakpoint.device.sm} {
    flex-direction: row;
  }
`;

const Section1 = styled.section`
  background-image: url(${Login});

  @media only screen and ${breakpoint.device.xs} {
    width: 100%;
    height: 40vw;
    background-position: 50% 50%;
    background-size: cover;
  }
  @media only screen and ${breakpoint.device.sm} {
    width: 50%;
    height: 95vh;
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
  padding: 20px 0;
`;
