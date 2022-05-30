import React from "react";
import styled from "styled-components";

function ErrorMessage({ error }) {
  return <Container>{error}</Container>;
}

const Container = styled.div`
  padding: 15px;
  background-color: #ff9494;
  margin: 0 20%;
`;

export default ErrorMessage;
