import React, { useEffect, useState } from "react";
import "./CategoryItems.css";
import { BsCalendarDateFill } from "react-icons/bs";

import { QuantityPicker } from "react-qty-picker";

import { Link, useNavigate } from "react-router-dom";
import { deleteFood } from "../Backend/apiCalls";
import { ToastFailure, ToastSuccess } from "../Components/Toast";
import DatepickerField from "../Components/DatepickerField";
import DatepickerNoForm from "../Components/DatepickerNoForm";
import moment from "moment";

const CompareExpiry = (expiry, exp) => {
  let a = moment(exp);
  let b = moment(expiry);
  return b.diff(a, "days");
};

function ItemList({
  allItems,
  items,
  setItems,
  selectedCategory,
  byProducts,
  id,
}) {
  const Navigate = useNavigate();
  const oneDayTime = 24 * 60 * 60 * 1000;
  const [value, setValue] = useState(new Date());
  const [currentItems, setCurrentItems] = useState([]);
  const [touched, setTouched] = useState(false);

  // modal states
  const { userId } = id;

  const deleteItem = async (id) => {
    await deleteFood(id)
      .then((res) => {
        //remove deleted object from items
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
        window.location.reload(false);
        ToastSuccess("Deleted Successfully");
      })
      .catch((err) => {
        ToastFailure(err?.response?.data?.message);
      });
  };

  const [itemInput, setItemInput] = useState({
    Name: "",
    ExpiryDate: Date.now(),
    NotifyDate: Date.now(),
    CategoryID: undefined,
    ImageSrc: "",
  });

  // Expand Code
  const ps = document.querySelectorAll("p");
  const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      entry.target.classList[
        entry.target.scrollHeight > entry.contentRect.height ? "add" : "remove"
      ]("truncated");
    }
  });

  ps.forEach((p) => {
    observer.observe(p);
  });

  //Expand code end
  useEffect(() => {
    if (touched) {
      setCurrentItems(
        items.filter(
          (item) =>
            parseInt(item.CategoryID) === selectedCategory.id &&
            CompareExpiry(value, item.ExpiryDate) === 0
        )
      );
    } else {
      CloseAll();
    }
  }, [value, selectedCategory]);

  const CloseAll = () => {
    setTouched(false);
    setCurrentItems(
      items.filter((item) => parseInt(item.CategoryID) === selectedCategory.id)
    );
  };

  const ChangeDate = (v) => {
    setTouched(true);
    setValue(v);
  };

  const handleOnItemInputChange = (e) => {
    setItemInput({ ...itemInput, [e.target.name]: e.target.value });
  };

  const getExpiryClassName = (expiryDate) => {
    let curDate = Date.now();
    let diff = (new Date(expiryDate).getTime() - curDate) / oneDayTime;
    if (diff < 3) {
      return "redDate";
    } else if (diff > 3 && diff < 14) {
      return "orangeDate";
    } else if (diff > 14 && diff < 30) {
      return "yellowDate";
    } else {
      return "greenDate";
    }
  };

  const isExpired = (expiryDate) => {
    let curDate = Date.now();
    let diff = (new Date(expiryDate).getTime() - curDate) / oneDayTime;
    if (diff < 0) {
      return true;
    }
    return false;
  };

  return (
    <div className="item-biffer">
      <div className="btn-cards">
        <div className="itemList">
          <div className="bothNames">
            <p className="itms">Items</p>
            <div className="itms">
              <BsCalendarDateFill
                style={{ position: "absolute", marginTop: 10 }}
              />
              <DatepickerNoForm
                name="cDate"
                selected={value}
                onChange={ChangeDate}
                title={"Pick date"}
                touched={touched}
                onClose={CloseAll}
                style={{ marginLeft: 20 }}
              />
            </div>
          </div>
          {currentItems.length === 0 && (
            <div className="noCatItems">
              <img
                src="images/product-not-found.jpg"
                alt="Product Not Found"
                width="600"
              />
            </div>
          )}
          {currentItems.map((item) => (
            <div key={item.FoodItemID} className="item-n-by">
              <div className="catItems" key={item._id}>
                <div className="itemData">
                  <div className="itemImage">
                    {item.ImageSrc && (
                      <img
                        src={`http://localhost:4000/${item.ImageSrc}`}
                        className="flashImg"
                        alt="abcd"
                        width="120"
                        height="120"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="itemName">
                      <b>
                        {" "}
                        {item.Name}{" "}
                        {isExpired(item.ExpiryDate) && (
                          <small className="expired">(Expired)</small>
                        )}
                      </b>
                    </h3>
                    <p className="itemInfo">
                      <span className={getExpiryClassName(item.ExpiryDate)}>
                        <b>
                          Exp. Date : {new Date(item.ExpiryDate).getUTCDate()}/
                          {new Date(item.ExpiryDate).getUTCMonth() + 1}/
                          {new Date(item.ExpiryDate).getUTCFullYear()}
                        </b>
                      </span>
                    </p>
                    <p className="itemInfo">
                      <span className={getExpiryClassName(item.NotifyDate)}>
                        <b>
                          Notify. Date :{" "}
                          {new Date(item.NotifyDate).getUTCDate()}/
                          {new Date(item.NotifyDate).getUTCMonth() + 1}/
                          {new Date(item.NotifyDate).getUTCFullYear()}
                        </b>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="byProd-butn">
                  <div className="card-buttons">
                    <button
                      className="deleteBtn"
                      onClick={() => {
                        deleteItem(item.FoodItemID);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {item.byProduct &&
                  item.byProduct.map((bp) => (
                    <div className="batItems" key={item._id}>
                      <div className="byProductData">
                        <h3 className="itemName">
                          <b>{bp.itemByproduct} </b>
                        </h3>
                        <p className="byProdInfo">{bp.use}</p>
                        {bp.videoURL && (
                          <p className="byProdVid">
                            <u>
                              <a
                                href={bp.videoURL}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Watch video for more Info &#8599;
                              </a>
                            </u>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="addBtn">
          <button className="bottn" onClick={() => Navigate("/add_item")}>
            Add Item
          </button>

          <div className="colorInfo">
            <p className="colInfo">
              <span className="redDa">Red </span> - Expired/Expiry within 3 days
            </p>
            <p className="colInfo">
              <span className="orangeDa">Orange </span> - Expiry within 2 weeks
            </p>
            <p className="colInfo">
              <span className="yellowDa">Yellow </span> - Expiry within a month
            </p>
            <p className="colInfo">
              <span className="greenDa">Green </span> - Expiry beyond a month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemList;
