import React from "react";
import styled from "styled-components";

function ErrorMessage({ error }) {
  return <Container>{error}</Container>;
}

const Container = styled.div`
  padding: 10px;
  background-color: #ff9494;
  color: white;
  margin: 5px 0;
  border-radius: 5px;
  width: 100%;
`;

export default ErrorMessage;
