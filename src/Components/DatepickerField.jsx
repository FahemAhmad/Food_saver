import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "./DatePicker.css";

const DatepickerField = ({ title, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <>
      <h5 style={{ margin: "0 20%", fontWeight: "lighter" }}>{title}</h5>
      <DatePicker
        style={{ margin: "0 20%" }}
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
