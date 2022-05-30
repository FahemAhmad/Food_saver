import React from "react";
import styled from "styled-components";

const lists = [
  {
    name: "Eggs",
    expiry: "3 days",
  },
  {
    name: "Milk",
    expiry: "5 days",
  },
  {
    name: "Banana",
    expiry: "2 days",
  },
  {
    name: "Apple",
    expiry: "10 days",
  },
];

function ExpiringNext() {
  return (
    <>
      <Container>Expiring Next</Container>
      <Lists className="list">
        {lists.map((item, index) => (
          <ListItem key={index}>
            {index + 1}. {item.name} <Days>{item.expiry}</Days>
          </ListItem>
        ))}
      </Lists>
    </>
  );
}

export default ExpiringNext;

const Container = styled.div`
  text-align: center;
  font-size: 2rem;
  padding: 5%;
  border-bottom: 1px solid black;
`;

const Lists = styled.div`
  overflow: scroll;
  padding: 5% 0%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ListItem = styled.div`
  font-size: 1.4rem;
  border-bottom: 1px solid black;
  line-height: 2.1rem;
  padding: 2px;
  width: fit-content;
`;

const Days = styled.span`
  color: ${(props) => (props.color ? "green" : "red")};
`;
