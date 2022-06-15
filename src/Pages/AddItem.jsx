import React from "react";
import format from "date-format";
import * as yup from "yup";

import { Form, Formik } from "formik";
import ErrorMessage from "../Components/ErrorMessage";

import { NavLink, useNavigate } from "react-router-dom";
import "./Signup.css";
import DatepickerField from "../Components/DatepickerField";
import UploadImage from "../Components/UploadImage";
import { createfoodItem } from "../Backend/apiCalls";
import { ToastFailure, ToastSuccess } from "../Components/Toast";

const validationSchema = yup.object().shape({
  Name: yup.string().required().label("Name"),
  ExpiryDate: yup.string().required().label("Expiry Date"),
  NotifyDate: yup.string().required().label("Notifcation Date"),
  ImageSrc: yup.mixed().required(),
  CategoryID: yup.number().required(),
});

const options = [
  { title: "Fridge", id: 2 },
  { title: "Pantry", id: 3 },
  { title: "Freezer", id: 1 },
];
function AddItem() {
  const navigate = useNavigate();
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        Name: "",
        ExpiryDate: "",
        NotifyDate: "",
        ImageSrc: "",
        CategoryID: undefined,
      }}
      onSubmit={async (values, { resetForm }) => {
        let formData = new FormData();
        formData.append("ImageSrc", values.ImageSrc);
        const { UserID } = JSON.parse(localStorage.getItem("user"));
        const expiry = format(values.ExpiryDate, "yyyy-mm-dd").split("T");
        const notif = format(values.NotifyDate, "yyyy-mm-dd").split("T");
        const Data = {
          CategoryID: parseInt(values.CategoryID),
          UserID: parseInt(UserID),
          Name: values.Name,
          ExpiryDate: expiry[0],
          NotifyDate: notif[0],
        };

        formData.append("Data", JSON.stringify(Data));

        await createfoodItem(formData)
          .then((res) => {
            ToastSuccess("Item added successfully");
            resetForm();
          })
          .catch((err) => {
            ToastFailure(err.response.data);
          });
      }}
    >
      {({ errors, touched, handleChange, values, setFieldValue }) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
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
                <label className="label">Expiry Date</label>
                <DatepickerField
                  name="ExpiryDate"
                  title={"Pick Expiry date :"}
                />
                {errors.ExpiryDate && touched.ExpiryDate && (
                  <ErrorMessage error={errors.ExpiryDate} />
                )}
              </div>
              <div className="regi-form-contro">
                <label className="label">Notify Date:</label>
                <DatepickerField
                  name="NotifyDate"
                  title={"Pick Notification date"}
                />
                {errors.NotifyDate && touched.NotifyDate && (
                  <ErrorMessage error={errors.NotifyDate} />
                )}
              </div>
              <div className="regi-form-contro">
                <label className="label">Category Id</label>
                <select
                  type="text"
                  className="form-control"
                  name="CategoryID"
                  placeholder="Gender"
                  onChange={handleChange}
                >
                  <option value={""}>Where to Store ?</option>
                  {options.map((op, index) => (
                    <option key={index} value={op.id}>
                      {op.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="regi-form-contro">
                <label className="label">Pick an Image</label>
                <UploadImage
                  name={"ImageSrc"}
                  values={values}
                  setFieldValue={setFieldValue}
                />
                {errors.ImageSrc && touched.ImageSrc && (
                  <ErrorMessage error={errors.ImageSrc} />
                )}
              </div>

              <button type="submit" className="butn butn-block">
                Add
              </button>
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
      )}
    </Formik>
  );
}

export default AddItem;
