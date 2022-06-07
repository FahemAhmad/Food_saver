import React from "react";
import styled from "styled-components";
import Breakpoints from "../Breakpoints";

function CategoryDisplay({ title, image, expiry, category, isExp }) {
  return (
    <>
      <Container>
        <Foreground>
          <CoverImg src={image} />
        </Foreground>

        <div style={{ marginLeft: 20 }}>
          <Category>Category : {category}</Category>
          <Title>
            {title}
            <br />
          </Title>
          <ExpiryHeading>
            Expiry : <DaysLeft isExp={isExp}>{expiry}</DaysLeft>
          </ExpiryHeading>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  margin: 10px 0px;
  background-color: white;
  border: 1px solid black;
  padding: 10px 0px 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media only screen and ${Breakpoints.device.xs} {
    width: 85%;
  }
  @media only screen and ${Breakpoints.device.sm} {
    width: 30%;
  }
  @media only screen and ${Breakpoints.device.lg} {
    width: 24%;
  }
`;

const Category = styled.h2`
  font-size: 1rem;
  color: darkgray;
`;

const ExpiryHeading = styled.h1`
  font-size: 1rem;
  color: #035416;
`;
const Title = styled.h1`
  font-size: 1.4rem;
  color: #005a7a;
`;

const Foreground = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CoverImg = styled.img`
  margin: 5px;
  width: 180px;
  height: 120px;
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

const DaysLeft = styled.span`
  color: ${(props) => (props.isExp === null ? "green" : "red")};
`;
export default CategoryDisplay;
