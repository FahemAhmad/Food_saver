import React from "react";
import styled from "styled-components";

function ExpiringNext({ food }) {
  return (
    <>
      <Container>Expiring Next</Container>
      <Lists className="list">
        {food?.map((item, index) => (
          <ListItem key={index}>
            {index + 1}. {item.Name}{" "}
            <Days isExp={item.DaysRemaining < 5 ? true : false}>
              {item.DaysRemaining} days
            </Days>
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
  color: ${(props) => (props.isExp ? "red" : "green")};
`;
