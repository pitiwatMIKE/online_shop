import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutContainer({ children }) {
  return (
    <div className="layout-container">
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
}
