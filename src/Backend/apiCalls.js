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
const getfoodItem = (id) => httpService.get(`${foodItem}userid/${id}`);

//create food item
const createfoodItem = (body) => httpService.post(`${foodItem}`, body);

//get What expiring Next
const nonExpiredFoodItem = (id) =>
  httpService.get(`${foodItem}nonexpired/${id}`, id);

//get All Catgories
const getCategoryItem = () => httpService.get(`${category}`);

export { registerUser, loginUser, getfoodItem, getCategoryItem };
