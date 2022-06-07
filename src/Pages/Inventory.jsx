import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCategoryItem, getfoodItem } from "../Backend/apiCalls";
import AddFood from "../Components/AddFood";
import ProductDisplay from "../Components/ProductDisplay";
import SelectField from "../Components/SelectField";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { ToastFailure } from "../Components/Toast";
import breakpoint from "../Breakpoints";

import "react-tabs/style/react-tabs.css";
import moment from "moment";
import "./Inventory.css";
import DatepickerNoForm from "../Components/DatepickerNoForm";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import AddIcon from "@mui/icons-material/Add";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import CategoryDisplay from "../Components/CategoryDisplay";
import Notify from "../Components/Notify";
import ExpiringNext from "../Components/ExpiringNext";
import UserProfile from "../Components/UserProfile";

const calculateExpiry = (expiry) => {
  let a = moment(new Date());
  let b = moment(expiry);

  return b.diff(a, "days");
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "90%",
  backgroundColor: "#f9eee2",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Inventory() {
  const [notify, setNotify] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpen] = useState(false);
  const [id, setId] = useState(
    JSON.parse(localStorage.getItem("user"))?.UserID
  );

  const [userProfileModal, setUserProfileModal] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [expiringModal, setExpiringModal] = useState(false);
  const [name, setName] = useState("");
  const [expDate, setExpiry] = useState("");
  const [food, setFood] = useState();
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [allFood, setAllFood] = useState();

  const handleOpen = () => {
    setOpen(!openModal);
  };

  const returnCatgeory = (id) => {
    const res = allCategories.filter((cat) => cat.CategoryID === parseInt(id));

    return res[0]?.Name;
  };

  const getUserFoods = async () => {
    await getfoodItem(id)
      .then((res) => {
        setAllFood(res?.data?.Data?.data);
        setFood(res?.data?.Data?.data);
      })
      .catch((err) => {
        ToastFailure(err.response.data?.messsage);
      });
  };

  const getAllCategories = async () => {
    await getCategoryItem()
      .then((res) => {
        setAllCategories(res.data.Data.data);
        setLoading(false);
      })
      .catch((err) => {
        ToastFailure(err?.response.data?.messsage);
      });
  };

  const completeSearch = () => {
    if (category === "") {
      if (name.length > 2 && expDate > 0) {
        setFood(
          allFood.filter(
            (item) =>
              item.Name.toLowerCase().includes(name) &&
              calculateExpiry(item.ExpiryDate) <= expDate
          )
        );
      } else if (name.length > 2 && expDate === 0) {
        setFood(
          allFood.filter((item) => item.Name.toLowerCase().includes(name))
        );
      } else if (name.length <= 2 && expDate > 0) {
        setFood(
          allFood.filter((item) => calculateExpiry(item.ExpiryDate) <= expDate)
        );
      } else setFood(allFood);
    } else {
      setName("");
      setExpiry("");
      setFood(allFood.filter((item) => item.CategoryID === category));
    }
  };

  // const searchByName = (query) => {
  //   setCategory("");
  //   setName(query.toLowerCase());
  // };

  // const searchByCategory = (query) => {
  //   setCategory("");
  //   setCategory(query.toLowerCase());
  // };

  const searchByExpiry = (query) => {
    setStartDate(query);

    const res = calculateExpiry(query);

    if (res > 0) setExpiry(res);
    else setExpiry("");
  };

  const reRender = () => {
    getUserFoods();
  };

  const handleNotify = () => {
    setNotify(!notify);
  };

  const handleExpiring = () => {
    setExpiringModal(!expiringModal);
  };

  const handleUserProfile = () => {
    setUserProfileModal(!userProfileModal);
  };

  useEffect(() => {
    setLoading(true);
    getUserFoods();
    getAllCategories();
  }, []);

  useEffect(() => {
    completeSearch();
  }, [name, category, expDate]);

  if (loading)
    return (
      <div
        style={{
          backgroundColor: "#f9eee2",
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Loading...</h2>
      </div>
    );

  return (
    <>
      <Container>
        <Row>
          <Section>
            <Logo>Welcome</Logo>
            <UserIcon
              src={
                "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000"
              }
              style={{ marginLeft: "100px" }}
              onClick={handleUserProfile}
            />
            <Usertext onClick={handleUserProfile}>
              {JSON.parse(localStorage.getItem("user"))?.Email}{" "}
            </Usertext>
          </Section>
        </Row>

        <Row2>
          <LeftSection style={{ padding: 0 }}>
            <Row>
              <DatepickerNoForm
                selected={startDate}
                onChange={searchByExpiry}
              />
            </Row>
            <Row style={{ padding: 0 }}>
              <Tabs>
                <TabList>
                  <Row2 style={{ overflow: "hidden", width: "100vw" }}>
                    <Tab>Inventory</Tab>
                    <Tab>Category</Tab>
                    <DivAlign
                      style={{
                        flex: 1,
                        marginTop: 1,
                        border: "1px solid black",
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <AddIcon
                        style={{ cursor: "pointer", color: "green" }}
                        onClick={handleOpen}
                      />
                      <NotificationAddIcon
                        onClick={handleNotify}
                        style={{ cursor: "pointer", color: "orange" }}
                      />
                      <EventAvailableIcon
                        onClick={handleExpiring}
                        style={{ cursor: "pointer", color: "red" }}
                      />
                    </DivAlign>
                  </Row2>
                </TabList>

                <TabPanel>
                  <ProjectsContainer className="projectList">
                    <h2 style={{ color: "#834404", textAlign: "center" }}>
                      Fridge
                    </h2>
                    <Splide
                      className="slide"
                      options={{
                        rewind: true,
                        gap: ".5rem",
                        perPage: 6,

                        hasTrack: false,
                      }}
                      aria-label="My Favorite Images"
                    >
                      {food?.map((p, index) => (
                        <SplideSlide key={index}>
                          <ProductDisplay
                            image={p.ImageSrc}
                            title={p.Name}
                            category={returnCatgeory(p.CategoryID)}
                            expiry={p.ExpiryDate}
                            isExp={p.IsExpired}
                          />
                        </SplideSlide>
                      ))}
                    </Splide>
                  </ProjectsContainer>
                  <ProjectsContainer className="projectList">
                    <h2 style={{ color: "#834404", textAlign: "center" }}>
                      Pantry
                    </h2>
                    <Splide
                      className="slide"
                      options={{
                        rewind: true,
                        gap: ".5rem",
                        perPage: 6,
                        hasTrack: false,
                      }}
                      aria-label="My Favorite Images"
                    >
                      {food?.map((p, index) => (
                        <SplideSlide key={index}>
                          <ProductDisplay
                            image={p.ImageSrc}
                            title={p.Name}
                            category={returnCatgeory(p.CategoryID)}
                            expiry={p.ExpiryDate}
                            isExp={p.IsExpired}
                          />
                        </SplideSlide>
                      ))}
                    </Splide>
                  </ProjectsContainer>
                  <ProjectsContainer className="projectList">
                    <h2 style={{ color: "#834404", textAlign: "center" }}>
                      Freezer
                    </h2>
                    <Splide
                      className="slide"
                      options={{
                        rewind: true,
                        gap: ".5rem",
                        perPage: 6,
                        hasTrack: false,
                      }}
                      aria-label="My Favorite Images"
                    >
                      {food?.map((p, index) => (
                        <SplideSlide key={index}>
                          <ProductDisplay
                            image={p.ImageSrc}
                            title={p.Name}
                            category={returnCatgeory(p.CategoryID)}
                            expiry={p.ExpiryDate}
                            isExp={p.IsExpired}
                          />
                        </SplideSlide>
                      ))}
                    </Splide>
                  </ProjectsContainer>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <SelectField
                      name="Category"
                      options={allCategories}
                      handleChange={(e) => setCategory(e.target.value)}
                      value={category}
                      error={false}
                      touched={true}
                      check={true}
                    />
                  </Center>

                  <ProjectsContainer2 className="projectList">
                    {food?.map((p, index) => (
                      <CategoryDisplay
                        key={index}
                        image={p.ImageSrc}
                        title={p.Name}
                        category={returnCatgeory(p.CategoryID)}
                        expiry={p.ExpiryDate}
                        isExp={p.IsExpired}
                      />
                    ))}
                  </ProjectsContainer2>
                </TabPanel>
              </Tabs>
            </Row>
          </LeftSection>
        </Row2>
      </Container>

      {/* A lot of modals ? yes so many*/}
      <Modal
        open={openModal}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddFood
            allCategories={allCategories}
            reRender={reRender}
            onClose={handleOpen}
          />
        </Box>
      </Modal>
      <Modal
        open={notify}
        onClose={handleNotify}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={[style, { height: "40%" }]}>
          <Notify food={food} onClose={handleNotify} />
        </Box>
      </Modal>
      <Modal
        open={expiringModal}
        onClose={handleExpiring}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={[style, { height: "auto" }]}>
          <ExpiringNext food={food} onClose={handleNotify} />
        </Box>
      </Modal>

      {/* User Modal */}
      <Modal
        open={userProfileModal}
        onClose={handleUserProfile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={[style, { height: "auto" }]}>
          <UserProfile
            user={JSON.parse(localStorage.getItem("user"))}
            onClose={handleNotify}
          />
        </Box>
      </Modal>
    </>
  );
}

export default Inventory;

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #f9eee2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  @media only screen and ${breakpoint.device.xs} {
    max-height: 100%;
  }
`;

const Logo = styled.h2`
  font-size: 2.5rem;
  color: #8e4404;
  font-style: italic;
  font-weight: 900;
`;

const Row = styled.div`
  border-bottom: 1px solid black;

  display: flex;
  justify-content: center;
  width: 100vw;
`;

const Row2 = styled.div`
  border-bottom: 1px solid black;
  max-width: 100vw;
  display: flex;
  height: 100%;
  background-color: #f9eee2;

  @media only screen and ${breakpoint.device.xs} {
    flex-direction: column;
  }
  @media only screen and ${breakpoint.device.lg} {
    flex-direction: row;
  }
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;

  &:nth-of-type(2) {
    border-left: ${(props) => (props.border ? "1px solid black" : "none")};
  }
`;

const UserIcon = styled.img`
  display: flex;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const Usertext = styled.span`
  font-size: 1.2rem;
  color: gray;
  font-weight: 800;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9eee2;
`;

const InputSection = styled.input`
  border: none;
  border-bottom: 1px solid black;
  padding: 5px;
  background-color: transparent;
  &:focus {
    outline: none !important;
    border: none;
    border-top: 1px solid black;
  }
`;

const SpaceApart = styled.div`
  width: 95%;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;

  @media only screen and ${breakpoint.device.xs} {
    flex-direction: column;
  }
  @media only screen and ${breakpoint.device.sm} {
    flex-direction: row;
  }
`;

const ProjectsContainer = styled.div`
  max-width: 100vw;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
`;

const ProjectsContainer2 = styled.div`
  max-width: 100vw;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const DivAlign = styled.div``;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
