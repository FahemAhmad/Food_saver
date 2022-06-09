import React from "react";
import DatePicker from "react-datepicker";
import "./DatePicker.css";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
const DatepickerNoForm = ({
  selected,
  onChange,
  withPortal = true,
  touched = false,
  onClose,
}) => {
  return (
    <>
      <Div />
      <Div />
      {withPortal && (
        <Text style={{ marginRight: 30 }}>Search by Expiry :</Text>
      )}

      <DatePicker
        selected={selected}
        onChange={(val) => onChange(val)}
        placeholderText={"Expiry search"}
        withPortal={withPortal}
      />
      {touched && (
        <CloseIcon
          style={{ margin: "auto", color: "red", cursor: "pointer" }}
          size={40}
          onClick={onClose}
        />
      )}
      <Div />
      <Div />
    </>
  );
};

export default DatepickerNoForm;

const Div = styled.div`
  flex: 1;
`;

const Text = styled.h2`
  color: #8e4404;
  display: flex;
  justify-content: center;
  align-items: center;
`;
