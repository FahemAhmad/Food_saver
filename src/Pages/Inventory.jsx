import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCategoryItem, getfoodItem } from "../Backend/apiCalls";
import AddFood from "../Components/AddFood";
import ExpiringNext from "../Components/ExpiringNext";
import ProductDisplay from "../Components/ProductDisplay";
import SelectField from "../Components/SelectField";
import { ToastFailure } from "../Components/Toast";
import "./Inventory.css";

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

const products = [
  {
    name: "Pizza",
    category: "fridge",
    image:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000",
    expirydate: "5 days ",
    notifyDate: "2 days",
  },
  {
    name: "Meet",
    category: "fridge",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVhdHxlbnwwfHwwfHw%3D&w=1000",
    expirydate: "5 days ",
    notifyDate: "2 days",
  },
  {
    name: "Burger",
    category: "fridge",
    image:
      "https://media.istockphoto.com/photos/hamburger-picture-id174878700?b=1&k=20&m=174878700&s=170667a&w=0&h=eMOcnbhrSODSw97BbLPjLx1TSF6OX2Ve2H2yEDxXUAc=",
    expirydate: "5 days ",
    notifyDate: "2 days",
  },
  {
    name: "Burger",
    category: "fridge",
    image:
      "https://media.istockphoto.com/photos/hamburger-picture-id174878700?b=1&k=20&m=174878700&s=170667a&w=0&h=eMOcnbhrSODSw97BbLPjLx1TSF6OX2Ve2H2yEDxXUAc=",
    expirydate: "5 days ",
    notifyDate: "2 days",
  },
];

function Inventory() {
  const [openModal, setOpen] = useState(false);
  const [id, setId] = useState(
    JSON.parse(localStorage.getItem("user"))?.UserID
  );
  const [food, setFood] = useState();
  const [category, setCategory] = useState();
  const [allCategories, setAllCategories] = useState([]);

  const handleOpen = () => {
    setOpen(!openModal);
  };

  const getUserFoods = async () => {
    console.log(id);
    await getfoodItem(id)
      .then((res) => {
        console.log("Food", res.data);
        setFood(res?.data);
      })
      .catch((err) => {
        ToastFailure(err.response.data?.messsage);
      });
  };

  const getAllCategories = async () => {
    await getCategoryItem()
      .then((res) => {
        setAllCategories(res.data.Data.data);
      })
      .catch((err) => {
        ToastFailure(err?.response.data?.messsage);
      });
  };
  useEffect(() => {
    // getUserFoods();
    getAllCategories();
  }, []);

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
            <Usertext>xyz@gmail.com</Usertext>
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
              <InputSection placeholder="Search by Name" />
              <InputSection placeholder="Search by Expiration Date" />
              <SelectField
                name="Search by Category"
                options={allCategories}
                check
                handleChange={(e) => setCategory(e.target.value)}
                value={category}
                error={false}
                touched={false}
              />
            </SpaceApart>

            <ProjectsContainer className="projectList">
              {products.map((p, index) => (
                <ProductDisplay
                  key={index}
                  image={p.image}
                  title={p.name}
                  category={p.category}
                  expiry={p.expirydate}
                ></ProductDisplay>
              ))}
            </ProjectsContainer>
          </LeftSection>
          <RightSection>
            <ExpiringNext />
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
          <AddFood />
        </Box>
      </Modal>
    </>
  );
}

export default Inventory;

const Container = styled.div`
  height: 100vh;
  max-height: 100vh;
  background-color: #f9eee2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
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
`;

const RightSection = styled.div`
  flex: 2;
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
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
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
  justify-content: space-between;
  flex-wrap: wrap;
`;
