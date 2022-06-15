import React from "react";
import UserProfile from "../Components/UserProfile";
import styled from "styled-components";

const Details = () => {
  return (
    <>
      <Center>
        <Container>
          <UserProfile
            user={JSON.parse(localStorage.getItem("user"))}
            food={JSON.parse(localStorage.getItem("user")).fooditems}
          />
        </Container>
      </Center>
    </>
  );
};

export default Details;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 50vw;
  margin: 2% 0;
  background-color: #cff2e6;
`;
