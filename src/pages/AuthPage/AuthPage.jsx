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

export default function AuthPage() {
  const [login, setLogin] = useState([true, false]);
  const [valueLogin, setValueLogin] = useState({
    Carne: { value: "", errorMessage: "" },
    Password: { value: "", errorMessage: "" },
  });
  const [valueSignUp, setValueSignUp] = useState({
    Name: { value: "", errorMessage: "" },
    LastName: { value: "", errorMessage: "" },
    Carne: { value: "", errorMessage: "" },
    Gender: { value: "", errorMessage: "" },
    Career: { value: "", errorMessage: "" },
    Faculty: { value: "", errorMessage: "" },
    Email: { value: "", errorMessage: "" },
    Password: {
      value: "",
      errorMessage: "",
    },
  });

  return (
    <div className="AuthPage">
      <HeaderPage />
      <div className="AuthPage-content">
        <section className="LoginForm">
          <nav className="HeaderForm">
            <StateLogin text="Iniciar sesión" active={login[0]} login={login} setLogin={setLogin} />
            <StateLogin text="Registrar" active={login[1]} login={login} setLogin={setLogin} />
          </nav>

          <div className="form">
            <FormLogin login={login[0]} getter={valueLogin} setter={setValueLogin} />
            <FormSignUp login={login[1]} getter={valueSignUp} setter={setValueSignUp} />
          </div>
        </section>
      </div>
    </div>
  );
}
