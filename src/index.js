import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeTemplate from "./pages/template/HomeTemplate";
import Home from "./pages/Home/Home";
import QuanLySinhVien from "./pages/QuanLySinhVien/QuanLySinhVien";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <BrowserRouter>
    <Routes>
      <Route path="" element={<HomeTemplate />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="quanly-sinhvien" element={<QuanLySinhVien />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </>
);
