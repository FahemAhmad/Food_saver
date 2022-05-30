import React from "react";
import styled from "styled-components";

function ProductDisplay({ title, image, expiry, category }) {
  return (
    <>
      <Container>
        <Background image={image}></Background>
        <Foreground>
          <CoverImg src={image} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              padding: "0 5%",
              position: "relative",
              flex: 1,
            }}
          >
            <div>
              <Title>
                {title}
                <br />
              </Title>
              <Category>Category : {category}</Category>
              <Category>
                Expiry : <DaysLeft>{expiry}</DaysLeft>
              </Category>
            </div>
          </div>
        </Foreground>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  margin: 15px 0px;
  width: 30%;
  border: 1px solid black;
  padding: 0 0 10px 0;
`;

const Title = styled.h1`
  font-size: 4rem;
  background: -webkit-linear-gradient(right, #8e4404, #d69d6c, #d69d6c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Background = styled.div`
  filter: opacity(0.5);
  position: absolute;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

const Foreground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CoverImg = styled.img`
  margin: 5px;
  width: 250px;
  height: 190px;
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

const Category = styled.h2`
  color: black;
  font-size: 1.1rem;
`;

const DaysLeft = styled.span`
  color: ${(props) => (props.color ? "green" : "red")};
`;
export default ProductDisplay;
