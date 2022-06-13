import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { logout, setAuthWhenRefresh } from "../reducers/users/authSlice";

export default function LayoutContainer({ children }) {
  const dispatch = useDispatch();

  // get userAuth from localStrage when refresh page
  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    if (userAuth?.token) {
      dispatch(setAuthWhenRefresh(userAuth));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <div className="layout-container">
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
}
