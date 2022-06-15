import React from "react";
import DatePicker from "react-datepicker";
import "./DatePicker.css";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
const DatepickerNoForm = ({ selected, onChange, touched, onClose }) => {
  return (
    <>
      <Div />
      <Div />

      <Div>
        <DatePicker
          selected={selected}
          onChange={(val) => onChange(val)}
          placeholderText={"Expiry search"}
          style={{ width: 200, marginRight: "5%" }}
        />

        {touched && (
          <CloseIcon
            style={{ margin: "auto", color: "red", cursor: "pointer" }}
            size={40}
            onClick={onClose}
          />
        )}
      </Div>
      <Div />
      <Div />
    </>
  );
};

export default DatepickerNoForm;

const Div = styled.div`
  width: 50%;
  display: flex;
`;
