import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styled from "styled-components";

const UserProfile = ({ user, food }) => {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab style={{ width: "50%" }}>Profile</Tab>

          <Tab style={{ width: "50%" }}>Items</Tab>
        </TabList>
        <TabPanel>
          <Center>
            <DisplayPicture
              src={
                "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000"
              }
              width={150}
              height={150}
            />
            <Heading>Id: {user?.UserID}</Heading>
            <Line />
            <Heading>Name: {user?.Name}</Heading>
            <Line />
            <Heading>Email:{user?.Email}</Heading>
            <Line />
            <Heading>Gender: {user?.Gender}</Heading>
            <Line />
            <Heading>Age: {user?.Age}</Heading>
            <Line />
            <Heading>Items: {food?.length}</Heading>
            <Line />
          </Center>
        </TabPanel>
        <TabPanel>
          <Center>
            <Heading>Your Items</Heading>
            {food?.map((item, index) => (
              <>
                <Row key={index}>
                  <img
                    src={item.ImageSrc}
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                    alt={item.Name}
                  />
                  <h2>{item?.Name}</h2>
                </Row>
                <Line />
              </>
            ))}
          </Center>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default UserProfile;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0px;
  width: 100%;
`;

const DisplayPicture = styled.img`
  border-radius: 50%;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  color: black;
  margin: 10px 0px;
  text-align: left;

  font-weight: 200;
`;

const Line = styled.hr`
  width: 100%;
  color: black;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  align-items: center;
`;
