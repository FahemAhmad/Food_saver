import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../Backend/Aurh";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    removeCookie("token");
    localStorage.removeItem("user");
    navigate("/");
  }, []);

  return <div style={{ height: "100vh", width: "100%" }}>Logging Out....</div>;
};

export default Logout;
