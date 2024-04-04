/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./styles/input.css";
import FormInput from "./FormInput";

const inputsLogin = [
  {
    id: 1,
    name: "User",
    type: "text",
    placeholder: "Carne",
    errorMessage: "Usuario no encontrado",
    label: "Usuario",
  },
  {
    id: 2,
    name: "Password",
    type: "password",
    placeholder: "Contraseña",
    errorMessage: "Contraseña no valida",
    label: "Contraseña",
  },
];
const inputsSignUp = [
  {
    id: 1,
    name: "Carne",
    type: "text",
    placeholder: "Carne",
    errorMessage: "Ingrese minimo 7 digitos",
    label: "Carne",
    pattern: "^[0-9]{7,}$",
  },
  {
    id: 2,
    name: "Faculty",
    type: "text",
    placeholder: "Facultad",
    errorMessage: "Ingrese una facultad valida",
    pattern: "^[A-Za-z]+$",
    label: "Facultad",
  },

  {
    id: 3,
    name: "Name",
    type: "text",
    placeholder: "Nombres",
    errorMessage: "Ingrese un nombre valido",
    label: "Nombres",
  },
  {
    id: 4,
    name: "Gender",
    type: "text",
    placeholder: "Genero",
    errorMessage: "",
    label: "Genero",
  },
  {
    id: 5,
    name: "Career",
    type: "text",
    placeholder: "Carrera",
    errorMessage: "Ingrese una carrera valida",
    pattern: "^[A-Za-z]+$",
    label: "Carrera",
  },
  {
    id: 6,
    name: "Email",
    type: "email",
    placeholder: "Correo Electronico",
    errorMessage: "Ingrese un correo valido",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    label: "Correo Electronico",
  },
  {
    id: 7,
    name: "Password",
    type: "Password",
    placeholder: "Contraseña",
    label: "Contraseña",
    errorMessage:
      "La contraseña debe tener al menos 8 caracteres, una letra mayuscula, minuscula y un numero",
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$",
  },
];

export default function LoginForm() {
  const [login, setLogin] = useState([true, false]);
  const [valueLogin, setValueLogin] = useState({
    User: { value: "", errorMessage: "" },
    Password: { value: "", errorMessage: "" },
  });
  const [valueSignUp, setValueSignUp] = useState({
    Name: { value: "", errorMessage: "" },
    Gender: { value: "", errorMessage: "" },
    Faculty: { value: "", errorMessage: "" },
    Career: { value: "", errorMessage: "" },
    Email: { value: "", errorMessage: "" },
    Password: { value: "", errorMessage: "" },
  });

  return (
    <section className="LoginForm">
      <nav className="HeaderForm">
        <StateLogin
          text="Iniciar sesión"
          active={login[0]}
          login={login}
          setLogin={setLogin}
        />
        <StateLogin
          text="Registrar"
          active={login[1]}
          login={login}
          setLogin={setLogin}
        />
      </nav>

      <div className="form">
        <FormLogin
          login={login[0]}
          getter={valueLogin}
          setter={setValueLogin}
        />
        <FormSignUp
          login={login[1]}
          getter={valueSignUp}
          setter={setValueSignUp}
        />
      </div>
    </section>
  );
}

function StateLogin({ text, active, login, setLogin }) {
  const classActive = active ? "" : "disabled";
  return (
    <li
      className={classActive}
      onClick={() => setLogin([!login[0], !login[1]])}
    >
      <span>{text}</span>
    </li>
  );
}

function FormLogin({ login, getter, setter }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(Object.fromEntries(data.entries()));
  };

  const onChange = (e) => {
    setter({
      ...getter,
      [e.target.name]: { ...getter[e.target.name], value: value },
    });
  };

  return (
    <form onSubmit={handleSubmit} className={login ? "" : "disabled"}>
      {inputsLogin.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={getter[input.name].value}
          onChange={onChange}
        />
      ))}
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

function FormSignUp({ login, getter, setter }) {
  const renderFormRow = () => {
    let forms = [];
    for (let index = 0; index < 4; index += 2) {
      console.log(getter[inputsSignUp[index].name]);
      forms.push(
        <div className="formRow">
          {" "}
          <FormInput
            key={inputsSignUp[index].id}
            {...inputsSignUp[index]}
            value={getter[inputsSignUp[index].name]}
            onChange={onChange}
          />
          <FormInput
            key={inputsSignUp[index + 1].id}
            {...inputsSignUp[index + 1]}
            value={getter[inputsSignUp[index + 1].name]}
            onChange={onChange}
          />
        </div>
      );
    }
    return forms;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(Object.fromEntries(data.entries()));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setter({
      ...getter,
      [e.target.name]: { ...getter[e.target.name], value: value },
    });
    if (name == "Career" && value == "hola") {
      e.target.setCustomValidity("un hola encontrado");
      e.target.reportValidity();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={login ? "" : "disabled"}>
      {renderFormRow()}
      {inputsSignUp.slice(4).map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={getter[input.name].value}
          onChange={onChange}
        />
      ))}
      <button type="submit">Registrarse</button>
    </form>
  );
}
