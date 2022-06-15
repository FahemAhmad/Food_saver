import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  // const auth = useSelector((state) => state.auth)
  const endpoint = useLocation().pathname;
  const auth = localStorage.getItem("user");

  return (
    <div
      style={{
        display:
          endpoint === "/login" || endpoint === "/register" ? "none" : "block",
      }}
    >
      <nav>
        <div
          className="logo"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              color: "lightgreen",
              fontWeight: 800,
              fontStyle: "italic",
              marginTop: 17,
            }}
          >
            Food Saver
          </h2>
        </div>
        <label htmlFor="btn" className="fa_icon">
          <FaBars />
        </label>
        <input type="checkbox" className="checkBox" id="btn" />
        <ul>
          <li>
            {" "}
            <NavLink
              to="/"
              className="hoverLine"
              style={navLinkStyle}
              onMouseEnter={navLinkHover}
            >
              Home
            </NavLink>
          </li>
          {!auth ? (
            <>
              <li>
                {" "}
                <NavLink
                  to="/sign_in"
                  className="hoverLine"
                  style={navLinkStyle}
                >
                  Login
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink
                  to="/sign_up"
                  className="hoverLine"
                  style={navLinkStyle}
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                {" "}
                <NavLink
                  to="/inventory"
                  className="hoverLine"
                  style={navLinkStyle}
                >
                  Inventory
                </NavLink>
              </li>

              <li>
                {" "}
                <NavLink
                  to="/logout"
                  className="hoverLine"
                  style={navLinkStyle}
                >
                  Logout
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink
                  to="/details"
                  className="hoverLine"
                  style={navLinkStyle}
                >
                  Profile
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  lineHeight: "70px",
  fontSize: "18px",
  padding: "8px 15px",
};
const navLinkHover = {
  color: "cyan",
};

export default Navbar;
