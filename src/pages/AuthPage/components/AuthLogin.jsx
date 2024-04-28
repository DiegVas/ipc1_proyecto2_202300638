import { useState } from "react";
import StateLogin from "./StateLogin";
import FormLogin from "./FormLogin";
import FormSignUp from "./FormSignUp";

export default function AuthLogin() {
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
  );
}
