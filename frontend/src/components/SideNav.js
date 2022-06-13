import React from "react";
import { Link } from "react-router-dom";
import SignButton from "./SignButton";

export default function SideNav({ sidenav, setSidenav }) {
  const closeSide = () => {
    setSidenav(false);
  };

  return (
    <>
      {sidenav && <div className="sidenav-bg" onClick={closeSide}></div>}
      <div className="sidenav" style={sidenav ? { width: 280 } : { width: 0 }}>
        <div className="sidenav-items">
          <Link to="" className="close-side" onClick={closeSide}>
            &times;
          </Link>
          <Link onClick={closeSide} to="/">
            HOME
          </Link>
          <Link onClick={closeSide} to="/shop">
            SHOP
          </Link>
          <Link to="/about" onClick={closeSide}>
            ABOUT
          </Link>
          <SignButton closeSide={closeSide}  />
        </div>
      </div>
    </>
  );
}
