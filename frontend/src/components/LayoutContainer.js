import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectorAuth } from "../reducers/users/authSlice";

export default function LayoutContainer({ children }) {
  const dispatch = useDispatch();
  const { values: userAuth } = useSelector(selectorAuth);

  // get userAuth from localStrage when refresh page
  useEffect(() => {
    if (!userAuth?.token) {
      dispatch(logout());
    }
  }, [dispatch, userAuth?.token]);

  return (
    <div className="layout-container">
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
}
