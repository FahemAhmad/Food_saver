import React from "react";
import styled from "styled-components";
import moment from "moment";

const CompareExpiry = (expiry) => {
  let a = moment(new Date());
  let b = moment(expiry);
  return b.diff(a, "days");
};
function ExpiringNext({ food }) {
  return (
    <>
      <Container>Expiring Next</Container>
      <Lists className="list">
        {food?.map(
          (item, index) =>
            CompareExpiry(item?.ExpiryDate) < 10 &&
            CompareExpiry(item?.ExpiryDate) >= 0 && (
              <ListItem key={index}>
                {item.Name}
                <Days
                  isExp={CompareExpiry(item?.ExpiryDate) < 10 ? true : false}
                >
                  {CompareExpiry(item?.ExpiryDate) + 1} days
                </Days>
              </ListItem>
            )
        )}
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
  align-items: flex-start;
  flex-direction: column;
`;

const ListItem = styled.div`
  font-size: 1.4rem;
  border-bottom: 1px solid black;
  line-height: 2.1rem;
  padding: 2px;
  width: fit-content;
  text-align: left;
`;

const Days = styled.span`
  color: ${(props) => (props.isExp ? "red" : "green")};
  margin-left: 20px;
`;
