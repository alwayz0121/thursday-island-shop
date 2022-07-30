import "./App.css";
import React from "react";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/Registerpage";
import { Routes, Route } from "react-router-dom";

import AuthContextProvider from "./context/AuthContext";
import Header from "./components/Header";
import DetailProductPage from "./pages/DetailProductPage/DetailProductPage";
import LookBookPage from "./pages/LookBookPage/LookBookPage";
import CartPage from "./pages/CartPage/CartPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";

function App() {
  //인증 상태에 따른

  return (
    <>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:productId" element={<DetailProductPage />} />
          <Route path="/lookbook" element={<LookBookPage />} />
          <Route path="/user/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
