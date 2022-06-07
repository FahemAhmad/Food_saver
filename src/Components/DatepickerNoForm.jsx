import React from "react";
import DatePicker from "react-datepicker";
import "./DatePicker.css";
import styled from "styled-components";

const DatepickerNoForm = ({ selected, onChange, withPortal = true }) => {
  return (
    <>
      <Div />
      <Div />
      <Text>Search by Expiry :</Text>

      <DatePicker
        selected={selected}
        onChange={(val) => onChange(val)}
        placeholderText={"Expiry search"}
        withPortal={withPortal}
      />
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
