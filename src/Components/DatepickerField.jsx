import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "./DatePicker.css";

const DatepickerField = ({ title, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <>
      <DatePicker
        style={{
          margin: "0",
          width: "100%",
          minheight: 41,
          background: "#fff",
          boxShadow: "none",
          borderColor: "#e3e3e3",
        }}
        placeholderText={title}
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
    </>
  );
};

export default DatepickerField;
