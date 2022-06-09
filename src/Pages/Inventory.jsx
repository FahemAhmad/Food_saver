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

import ExpiringNext from "../Components/ExpiringNext";
import UserProfile from "../Components/UserProfile";
import { Navigate, useNavigate } from "react-router-dom";

const calculateExpiry = (expiry) => {
  let a = moment(new Date());
  let b = moment(expiry);

  return b.diff(a, "days");
};

const CompareExpiry = (expiry, exp) => {
  let a = moment(exp);
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
  const navigate = useNavigate();
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
  //store display food
  const [food, setFood] = useState();
  //store selected category
  const [category, setCategory] = useState("");
  //store all the categories
  const [allCategories, setAllCategories] = useState([]);
  //store all the food
  const [allFood, setAllFood] = useState();

  //touch for date picker
  const [touch, setTouch] = useState();

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

  const handlePickerOnclose = () => {
    setStartDate(new Date());
    setFood(allFood);
    setTouch(false);
  };

  const searchByExpiry = (query) => {
    if (query === "") {
      setFood(allFood);
    } else {
      setTouch(true);
      setStartDate(query);

      setFood(() =>
        allFood?.filter((item) => CompareExpiry(item.ExpiryDate, query) === 0)
      );
    }
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const reRender = () => {
    getUserFoods();
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
            <Usertext onClick={() => navigate("/details")}>
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
                onClose={handlePickerOnclose}
                touched={touch}
              />
            </Row>
            <Row style={{ padding: 0 }}>
              <Tabs>
                <TabList>
                  <Row2 style={{ overflow: "hidden", width: "100vw" }}>
                    <Tab
                      onClick={() => {
                        setFood(allFood);
                        setCategory("");
                      }}
                    >
                      Inventory
                    </Tab>
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
                        style={{
                          cursor: "pointer",
                          color: "white",
                          height: 40,
                          width: 40,
                          backgroundColor: "green",
                          borderRadius: "50%",
                        }}
                        onClick={handleOpen}
                      />

                      <EventAvailableIcon
                        onClick={handleExpiring}
                        style={{
                          cursor: "pointer",
                          color: "white",
                          height: 40,
                          width: 40,
                          backgroundColor: "red",
                          borderRadius: "50%",
                          padding: 5,
                        }}
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
                        breakpoints: {
                          623: {
                            perPage: 2,
                          },
                          935: {
                            perPage: 3,
                          },
                          1250: {
                            perPage: 4,
                          },
                          1500: {
                            perPage: 5,
                          },
                        },

                        hasTrack: false,
                      }}
                      aria-label="My Favorite Images"
                    >
                      {food?.map(
                        (p, index) =>
                          returnCatgeory(p.CategoryID) === "Fridge" && (
                            <SplideSlide key={index}>
                              <ProductDisplay
                                food={p}
                                image={p.ImageSrc}
                                title={p.Name}
                                category={returnCatgeory(p.CategoryID)}
                                expiry={p.ExpiryDate}
                                isExp={p.IsExpired}
                              />
                            </SplideSlide>
                          )
                      )}
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
                        breakpoints: {
                          623: {
                            perPage: 2,
                          },
                          935: {
                            perPage: 3,
                          },
                          1250: {
                            perPage: 4,
                          },
                          1500: {
                            perPage: 5,
                          },
                        },
                      }}
                      aria-label="My Favorite Images"
                    >
                      {food?.map(
                        (p, index) =>
                          returnCatgeory(p.CategoryID) === "Pantry" && (
                            <SplideSlide key={index}>
                              <ProductDisplay
                                image={p.ImageSrc}
                                title={p.Name}
                                category={returnCatgeory(p.CategoryID)}
                                expiry={p.ExpiryDate}
                                isExp={p.IsExpired}
                              />
                            </SplideSlide>
                          )
                      )}
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
                        breakpoints: {
                          623: {
                            perPage: 2,
                          },
                          935: {
                            perPage: 3,
                          },
                          1250: {
                            perPage: 4,
                          },
                          1500: {
                            perPage: 5,
                          },
                        },
                      }}
                      aria-label="My Favorite Images"
                    >
                      {food?.map(
                        (p, index) =>
                          returnCatgeory(p.CategoryID) === "Freezer" && (
                            <SplideSlide key={index}>
                              <ProductDisplay
                                image={p.ImageSrc}
                                title={p.Name}
                                category={returnCatgeory(p.CategoryID)}
                                expiry={p.ExpiryDate}
                                isExp={p.IsExpired}
                              />
                            </SplideSlide>
                          )
                      )}
                    </Splide>
                  </ProjectsContainer>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <SelectField
                      name="Category"
                      options={allCategories}
                      handleChange={(e) => handleCategory(e)}
                      value={category}
                      error={false}
                      touched={true}
                      check={true}
                      full={false}
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
        open={expiringModal}
        onClose={handleExpiring}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={[style, { height: "auto" }]}>
          <ExpiringNext food={food} onClose={handleExpiring} />
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
