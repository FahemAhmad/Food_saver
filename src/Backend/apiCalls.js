import httpService from "./httpService";
const user = "/v1/user/";
const foodItem = "/v1/fooditem/";
const category = "/v1/category/";

//User
//Sign up
const registerUser = (body) => httpService.post(`${user}register`, body);
//login
const loginUser = (body) => httpService.post(`${user}login`, body);

//Food Item of a user
const getfoodItem = (id) =>
  httpService.get(`${foodItem}notificationDates/${id}`);

//create food item
const createfoodItem = (body) => httpService.post(`${foodItem}`, body);

//get All Catgories
const getCategoryItem = () => httpService.get(`${category}`);

//update food item
const updateFoodItem = (id, body) => httpService.put(`${foodItem}${id}`, body);

//delete api
const deleteFood = (id) => httpService.patch(`${foodItem}${id}`);
export {
  registerUser,
  loginUser,
  getfoodItem,
  getCategoryItem,
  createfoodItem,
  updateFoodItem,
  deleteFood,
};
