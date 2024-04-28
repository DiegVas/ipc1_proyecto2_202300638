/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./styles/input.css";
import HeaderPage from "./components/HeaderPage";
import "./styles/AuthPage.css";
import "./styles/AuthPageForm.css";
import StateLogin from "./components/StateLogin";
import FormLogin from "./components/FormLogin";
import FormSignUp from "./components/FormSignUp";
import { Outlet } from "react-router-dom";

export default function AuthPage() {
  return (
    <div className="AuthPage">
      <HeaderPage />
      <div className="AuthPage-content">
        <Outlet />
      </div>
    </div>
  );
}
