import cookie from "js-cookie";
const process = require("process");

//set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

//remove cookie
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key);
  }
};

//get from cookie is such as stored token
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};
