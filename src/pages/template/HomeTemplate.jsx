import React, { Component } from 'react'
import { NavLink, Outlet } from "react-router-dom";

export default class HomeTemplate extends Component {
  render() {
    return (
        <div>
        <header className="bg-dark text-white p-2 nav">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "nav-link bg-white text-dark" : "nav-link text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/quanly-sinhvien"
            className={({ isActive }) =>
              isActive ? "nav-link bg-white text-dark" : "nav-link text-white"
            }
          >
            Quản Lý Sinh Viên
          </NavLink>
        </header>
        <div className="content" style={{ minHeight: "75vh" }}>
          <Outlet />
        </div>
        <footer className="bg-dark text-white p-3 text-center">Copyright © 2022 QUAN LY SINH VIEN. All rights reserved.</footer>
      </div>
    )
  }
}
