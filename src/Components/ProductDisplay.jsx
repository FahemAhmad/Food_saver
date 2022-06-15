import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import Notify from "./Notify";
import "./Product.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "auto",
  backgroundColor: "#f9eee2",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ProductDisplay({ food, title, image, expiry, category }) {
  console.log("UImage", image);
  const [notify, setNotify] = useState(false);

  const handleNotify = () => {
    setNotify(!notify);
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <div className="image-container">
                <div className="first">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="discount">-25%</span>{" "}
                    <span className="wishlist">
                      <i className="fa fa-heart-o"></i>
                    </span>
                  </div>
                </div>
                <img
                  src={`http://localhost:4000/${image}`}
                  className="img-fluid rounded thumbnail-image"
                  alt={title}
                />
              </div>
              <div className="product-detail-container p-2">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="dress-name">{title}</h5>
                  <div className="d-flex flex-column mb-2">
                    {" "}
                    <span className="new-price">{category}</span>{" "}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center pt-1">
                  <div>
                    {" "}
                    <i className="fa fa-star-o rating-star"></i>{" "}
                    <span className="rating-number">{expiry}</span>{" "}
                  </div>{" "}
                  <span className="buy" onClick={handleNotify}>
                    Set Notification
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </>
  );
}

export default ProductDisplay;
