import "./App.css";

import Signup from "./Pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Inventory from "./Pages/Inventory";
import "@splidejs/react-splide/css";

import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <>
      <ToastContainer
        theme={"colored"}
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign_in" element={<Login />} />
          <Route path="/sign_up" element={<Signup />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
