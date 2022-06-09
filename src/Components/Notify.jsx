import format from "date-format";
import React, { useState } from "react";
import styled from "styled-components";
import { updateFoodItem } from "../Backend/apiCalls";
import DatepickerNoForm from "./DatepickerNoForm";

const Notify = ({ food, onClose }) => {
  const [startDate, setStartDate] = useState(new Date());

  const changeDate = (val) => {
    setStartDate(val);
  };

  const setNotifyDate = async () => {
    let formData = new FormData();

    const NotifyDate = format(startDate, "yyyy-mm-dd").split("T");

    const Data = {
      NotifyDate: NotifyDate[0],
    };
    formData.append("Data", JSON.stringify(Data));

    console.log(food?.FoodItemID);
    await updateFoodItem(food?.FoodItemID, formData)
      .then((res) => {
        console.log(res, "Updated");
        onClose();
      })
      .catch((err) => {
        console.log("Error", err.response.data);
      });
  };

  return (
    <>
      <MainHeading>Set Notification Date</MainHeading>

      <Center>
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
