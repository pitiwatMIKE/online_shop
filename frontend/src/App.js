import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutContainer from "./components/LayoutContainer";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <>
      <LayoutContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </LayoutContainer>
    </>
  );
}
