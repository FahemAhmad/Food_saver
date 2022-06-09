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
  next,
  full = true,
}) {
  return (
    <>
      <Selection
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        style={
          full ? { display: "block", width: "100%" } : { display: "block" }
        }
        next={next}
      >
        <Options value="" label={`Select a ${name}`}>
          Select your {name}{" "}
        </Options>
        {options?.map((op, index) => (
          <Options
            key={index}
            value={check ? op.CategoryID : op.value}
            label={op.value}
          >
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
  padding: 10px 10px;
  background-color: #fff;

  border: 1px solid #e3e3e3;
  margin-bottom: 10px;
`;

const Options = styled.option`
  padding: 20px;
  color: black;
`;
