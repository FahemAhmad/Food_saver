import React from "react";
import DatePicker from "react-datepicker";
import "./DatePicker.css";

const DatepickerNoForm = ({ selected, onChange }) => {
  return (
    <>
      <DatePicker selected={selected} onChange={(val) => onChange(val)} />
    </>
  );
};

export default DatepickerNoForm;
