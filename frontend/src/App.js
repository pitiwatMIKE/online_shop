import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutContainer from "./components/LayoutContainer";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProductPage from "./pages/ProductPage";
import ScrollToTop from "./components/ScrollToTop";
import PersonalPage from "./pages/PersonalPage";

export default function App() {
  return (
    <>
      <LayoutContainer>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/page/:page" element={<ShopPage />} />
          <Route
            path="/shop/search/:search/page/:page"
            element={<ShopPage />}
          />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/personal" element={<PersonalPage />} />
        </Routes>
      </LayoutContainer>
    </>
  );
}
