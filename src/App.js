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
import Details from "./Pages/Details";
import Navbar from "./Components/Navbar";
import NotFound from "./Pages/NotFound";
import Add_Item from "./Pages/AddItem";
import AddItem from "./Pages/AddItem";
import Logout from "./Pages/Logout";

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
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign_in" element={<Login />} />
          <Route path="/sign_up" element={<Signup />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/details" element={<Details />} />
          <Route path="/add_item" element={<AddItem />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
