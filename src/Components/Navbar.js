import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Navbar() {
  return (
    <TopBarContainer>
      <Logo>Food Saver</Logo>

      <Button as={Link} to="/sign_in">
        Login
      </Button>
    </TopBarContainer>
  );
}

export default Navbar;

const TopBarContainer = styled.div`
  position: absolute;
  z-index: 102;
  top: 0;
  height: 80px;

  width: 100%;
  padding: 0% 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h2`
  font-size: 2.5rem;
  color: #8e4404;
  font-style: italic;
  font-weight: 900;
`;

const Button = styled.button`
  padding: 15px 80px;
  font-size: 1.1rem;
  background-color: black;
  color: white;
  text-decoration: none;
`;
