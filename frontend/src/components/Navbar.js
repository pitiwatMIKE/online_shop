import React from "react";
import { Link } from "react-router-dom";
import SignButton from "./SignButton";

export default function Navbar({ sidenav, setSidenav }) {
  return (
    <>
      <div className="navbar-fixed">
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/shop">SHOP</Link>
            </li>
            <li>
              <Link to="/about">ABOUT</Link>
            </li>
          </ul>

          <div className="menu-btn">
            <Link
              to=""
              onClick={(e) => {
                e.preventDefault();
                setSidenav(!sidenav);
              }}
            >
              <i className="bi bi-list"></i>
            </Link>
          </div>

          <div className="navbrand">
            <Link to="/">Onlinde Shop</Link>
          </div>

          <ul className="nav-items">
            <li>
              <Link to="">
                <i className="bi bi-search"></i>
              </Link>
            </li>
            <li>
              <Link to="">
                <i className="bi bi-basket3"></i>
              </Link>
            </li>
            <SignButton />
          </ul>
        </nav>
      </div>
      <div className="behind-navbar-fixed"></div>
    </>
  );
}
