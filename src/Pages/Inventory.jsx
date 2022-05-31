import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCategoryItem, getfoodItem } from "../Backend/apiCalls";
import AddFood from "../Components/AddFood";
import ExpiringNext from "../Components/ExpiringNext";
import ProductDisplay from "../Components/ProductDisplay";
import SelectField from "../Components/SelectField";
import { ToastFailure } from "../Components/Toast";
import breakpoint from "../Breakpoints";

import moment from "moment";
import "./Inventory.css";

import DatepickerNoForm from "../Components/DatepickerNoForm";

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
  const [loading, setLoading] = useState(true);
  const [openModal, setOpen] = useState(false);
  const [id, setId] = useState(
    JSON.parse(localStorage.getItem("user"))?.UserID
  );

  const [startDate, setStartDate] = useState(new Date());
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

    return res[0].Name;
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

  const searchByName = (query) => {
    setCategory("");
    setName(query.toLowerCase());
  };

  const searchByCategory = (query) => {
    setCategory("");
    setCategory(query.toLowerCase());
  };

  const searchByExpiry = (query) => {
    setStartDate(query);

    const res = calculateExpiry(query);

    if (res > 0) setExpiry(res);
    else setExpiry("");
  };

  const reRender = () => {
    getUserFoods();
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
          <Section />
          <Section>
            <Logo>Food Saver</Logo>
          </Section>
          <Section>
            <UserIcon
              src={
                "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000"
              }
            />
            <Usertext>
              {JSON.parse(localStorage.getItem("user"))?.Email}
            </Usertext>
          </Section>
        </Row>
        <Row>
          <Section border>Inventory</Section>
          <Section border>Products</Section>
        </Row>
        <Row2>
          <LeftSection>
            <Button onClick={handleOpen}>Add Food</Button>
            <SpaceApart>
              <InputSection
                placeholder="Search by Name"
                value={name}
                onChange={(e) => searchByName(e.target.value)}
              />
              <DatepickerNoForm
                selected={startDate}
                onChange={searchByExpiry}
              />

              <SelectField
                name="Search by Category"
                options={allCategories}
                check={true}
                next={false}
                handleChange={(e) => searchByCategory(e.target.value)}
                value={category}
                error={false}
                touched={false}
              />
            </SpaceApart>

            <ProjectsContainer className="projectList">
              {food?.map((p, index) => (
                <ProductDisplay
                  key={index}
                  image={p.ImageSrc}
                  title={p.Name}
                  category={returnCatgeory(p.CategoryID)}
                  expiry={p.ExpiryDate}
                  isExp={p.IsExpired}
                ></ProductDisplay>
              ))}
            </ProjectsContainer>
          </LeftSection>
          <RightSection>
            <ExpiringNext food={allFood} />
          </RightSection>
        </Row2>
      </Container>

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
    </>
  );
}

export default Inventory;

const Container = styled.div`
  height: 100vh;

  background-color: #f9eee2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  @media only screen and ${breakpoint.device.xs} {
    max-height: 100%;
  }
  @media only screen and ${breakpoint.device.lg} {
    max-height: 100vh;
  }
`;

const Logo = styled.h2`
  font-size: 2.5rem;
  color: #8e4404;
  font-style: italic;
  font-weight: 900;
`;

const Row = styled.div`
  padding: 5px;
  border-bottom: 1px solid black;
  width: 100%;
  display: flex;
`;

const Row2 = styled.div`
  padding: 5px;
  border-bottom: 1px solid black;
  width: 100%;
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
  flex: 5;
  border-right: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9eee2;
`;

const RightSection = styled.div`
  flex: 2;
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

const Button = styled.button`
  width: 95%;
  padding: 5px 60px;
  font-size: 1.1rem;
  background-color: #f3d3b7;
  margin-top: 20px;
`;

const ProjectsContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  width: 97%;
  overflow: scroll;
  max-height: 65vh;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
