import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";

import "./Inventory.css";

import CategoryFilter from "./CategoryFilter";
import ItemList from "./ItemList";
import { ToastFailure } from "../Components/Toast";
import { getfoodItem } from "../Backend/apiCalls";

function Inventory() {
  const id = JSON.parse(localStorage.getItem("user"))?.UserID;
  const [inventory, setInventory] = useState([]);

  const [categories, setCategories] = useState([
    { title: "Fridge", id: 2 },
    { title: "Pantry", id: 3 },
    { title: "Freezer", id: 1 },
  ]);
  const [items, setItems] = useState(inventory);
  const [byProducts, setByProducts] = useState([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[1].id
  );

  const onSelectCategory = (id) => {
    setSelectedCategoryId(id);
  };

  const selectedCategory = categories.filter(
    (category) => category.id === selectedCategoryId
  )[0];

  // const getByProducts = async () => {
  //   //set by Products
  //   const response = await fetch(`/api/byproduct`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await response.json();
  //   if (!data.error === "") return data.error;
  //   else {
  //     setByProducts(data.items);
  //   }
  // };

  const getItems = async () => {
    await getfoodItem(id)
      .then((res) => {
        let data = res?.data?.Data?.data;
        setItems(data);
      })
      .catch((err) => {
        ToastFailure(err?.response?.data?.messsage);
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    setItems(inventory);
  }, [inventory]);

  return (
    <div className="categoryFilter">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      <ItemList
        id={id}
        items={items}
        setItems={setItems}
        byProducts={byProducts}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}

export default Inventory;
