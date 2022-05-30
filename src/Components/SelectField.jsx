import React from "react";
import ErrorMessage from "./ErrorMessage";
import styled from "styled-components";

function SelectField({
  name,
  options,
  handleChange,
  handleBlur,
  value,
  error,
  touched,
  check,
}) {
  return (
    <>
      <Selection
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ display: "block" }}
        check
      >
        <Options value="" label={`Select a ${name}`}>
          Select your {name}{" "}
        </Options>
        {options?.map((op, index) => (
          <Options key={index} value={op.value} label={op.value}>
            {check ? op.Name : op.value}
          </Options>
        ))}
      </Selection>
      {error && touched && <ErrorMessage error={error} />}
    </>
  );
}

export default SelectField;

const Selection = styled.select`
  margin: ${(props) => (props.check ? "0 0" : "0% 20%")};
  padding: 15px 10px;
  background-color: #f9eee2;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
`;

const Options = styled.option`
  padding: 20px;
  color: black;
`;
