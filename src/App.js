import React from "react";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/Registerpage";
import { Routes, Route } from "react-router-dom";

import GlobalStyle from "./globalStyle";
import "./App.css";

import AuthContextProvider from "./context/AuthContext";
import CategoryContextProvider from "./context/CategoryContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import DetailProductPage from "./pages/DetailProductPage/DetailProductPage";
import LookBookPage from "./pages/LookBookPage/LookBookPage";
import CartPage from "./pages/CartPage/CartPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";

import Category from "./pages/CategoryPage/Category";

function App() {
  //인증 상태에 따른
  return (
    <AuthContextProvider>
      <CategoryContextProvider>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:productId" element={<DetailProductPage />} />

          <Route path="/lookbook" element={<LookBookPage />} />

          <Route path="/top" element={<Category />} />
          <Route path="/onepiece" element={<Category />} />
          <Route path="/bottom" element={<Category />} />

          <Route path="/user/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
        <Footer />
      </CategoryContextProvider>
    </AuthContextProvider>
  );
}

export default App;
