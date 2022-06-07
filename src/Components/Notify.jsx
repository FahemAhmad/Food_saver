import React, { useState } from "react";
import styled from "styled-components";
import DatepickerNoForm from "./DatepickerNoForm";

const Notify = ({ food }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [product, setProduct] = useState("");

  const handleChange = (e) => {
    setProduct(e.target.value);
  };

  const changeDate = (val) => {
    setStartDate(val);
  };

  const setNotifyDate = () => {
    if (product === "") console.log("error");
    else {
      console.log(product, startDate);
    }
  };

  return (
    <>
      <MainHeading>Set Notification Date</MainHeading>

      <Center>
        <Selection
          name={"Set Notification Date"}
          value={product}
          onChange={handleChange}
          style={{ display: "block" }}
        >
          <Options value="" label={`Select a Food`}>
            Select your Food{" "}
          </Options>
          {food?.map((op, index) => (
            <Options
              key={index}
              value={op?.FoodItemID}
              label={op?.Name}
            ></Options>
          ))}
        </Selection>
        <DatepickerNoForm
          selected={startDate}
          onChange={changeDate}
          withPortal={false}
        />

        <Button onClick={setNotifyDate}>Set Date</Button>
      </Center>
    </>
  );
};

export default Notify;

const Selection = styled.select`
  margin: ${(props) => (props.next ? "0% 20%" : "0 0")};
  padding: 15px 10px;
  background-color: #f9eee2;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  width: 90%;
`;

const Options = styled.option`
  padding: 20px;
  color: black;
`;

const MainHeading = styled.h1`
  font-size: 2.5rem;
  color: #8e4404;
  font-style: italic;
  font-weight: 900;
  width: 100%;
  text-align: center;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 80%;
`;

const Button = styled.button`
  width: 95%;
  padding: 5px 60px;
  font-size: 1.1rem;
  background-color: #f3d3b7;
  margin-top: 20px;
`;