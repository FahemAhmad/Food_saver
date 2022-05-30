import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import f1 from "../Assets/f1.png";
import f2 from "../Assets/f2.png";
import f3 from "../Assets/f3.png";
import Navbar from "../Components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <ImageContainer src={f1} style={{ margin: "10vw 0vw 0vw 15vw" }} />
      <ImageContainer src={f2} style={{ margin: "10vw 0vw 0vw 45vw" }} />
      <Circle value={"40vw"}>
        <ImageContainer
          src={f3}
          style={{ marginLeft: "5vw", marginTop: "15vw", height: "20vw" }}
        />
      </Circle>
      <Circle value={"20vw"} />
      <Circle value={"15vw"} />
      <Circle value={"25vw"} />
      <Box />
      <Container>
        <MainHeading>Save your Cravings </MainHeading>
        <Button as={Link} to="/sign_up">
          Sign Up Now
        </Button>
      </Container>
    </>
  );
}

export default Home;

const Container = styled.div`
  height: 100vh;
  max-height: 100vh;
  background-color: #f9eee2;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
`;

const Box = styled.div`
  background-color: #f3d3b7;
  width: 30vw;
  position: absolute;
  margin-left: 20vw;
  height: 100vh;
`;

const Circle = styled.div`
  position: absolute;
  margin-left: 15vw;
  margin-top: 7vw;
  height: ${(props) => (props.small ? "10vw" : props.value)};
  width: ${(props) => (props.small ? "10vw" : props.value)};
  border-radius: 50%;
  border: 5px solid #00000015;
  z-index: 100;
  background-color: transparent;
`;

const ImageContainer = styled.img`
  position: absolute;
  height: 10vw;
  z-index: 101;
`;

const MainHeading = styled.h1`
  padding: 0 10%;
  font-size: 3rem;
  background: -webkit-linear-gradient(right, #d69d6c, #8e4404);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Button = styled.button`
  margin: 0 15%;
  padding: 15px 80px;
  font-size: 1.1rem;
  background-color: #f3d3b7;
  box-shadow: 7px 7px 0px 0px rgba(0, 0, 0, 0.9);
  -webkit-box-shadow: 7px 7px 0px 0px rgba(0, 0, 0, 0.9);
  -moz-box-shadow: 7px 7px 0px 0px rgba(0, 0, 0, 0.9);
  margin-top: 20px;
  text-decoration: none;
  color: inherit;
`;
