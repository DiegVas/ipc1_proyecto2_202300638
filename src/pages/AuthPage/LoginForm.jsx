/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "./styles/input.css";
import FormInput from "./FormInput";
import { inputsLogin, inputsSignUp } from "./propsInputs";
import { useAuth } from "../../Routes/Routes";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
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
  const { loginState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await validateForm(
      getter,
      inputsLogin,
      setter,
      "http://localhost:3000/auth/login"
    );
    if (response && response.status == 404) {
      setter({
        ...getter,
        Carne: {
          value: getter.Carne.value,
          errorMessage: "Carne no encontrado",
        },
      });
    } else if (response && response.status == 409) {
      setter({
        ...getter,
        Password: {
          value: getter.Password.value,
          errorMessage: "Contraseña incorrecta",
        },
      });
    } else if (response && response.status == 200) {
      loginState(await response.json());
      navigate("/");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const condition = inputsLogin
      .find((input) => input.name == name)
      .conditions(value);

    setter({
      ...getter,
      [name]: { value: value, errorMessage: condition },
    });
  };

  return (
    <form onSubmit={handleSubmit} className={login ? "" : "disabled"}>
      {inputsLogin.map(({ conditions, ...input }) => (
        <FormInput
          key={input.id}
          errorMessage={getter[input.name].errorMessage}
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
  const { loginState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await validateForm(
      getter,
      inputsSignUp,
      setter,
      "http://localhost:3000/auth/signUp"
    );
    if (response && response.status == 404) {
      setter({
        ...getter,
        Carne: {
          value: getter.Carne.value,
          errorMessage: "Carne ya registrado",
        },
      });
    } else if (response && response.status == 409) {
      setter({
        ...getter,
        Email: {
          value: getter.Email.value,
          errorMessage: "Email ya registrado",
        },
      });
    } else if (response && response.status == 200) {
      loginState(await response.json());
      navigate("/");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    const condition = inputsSignUp
      .find((input) => input.name == name)
      .conditions(value);

    setter({
      ...getter,
      [name]: { value: value, errorMessage: condition },
    });
  };

  return (
    <form onSubmit={handleSubmit} className={login ? "" : "disabled"}>
      {[0, 2, 4].map((startIndex) => (
        <div className="formRow" key={startIndex}>
          {inputsSignUp
            .slice(startIndex, startIndex + 2)
            .map(({ conditions, ...input }) => (
              <FormInput
                key={input.id}
                {...input}
                errorMessage={getter[input.name].errorMessage}
                value={getter[input.name].value}
                onChange={onChange}
                isComboBox={input.name == "Gender"}
              />
            ))}
        </div>
      ))}
      {inputsSignUp.slice(6).map(({ conditions, ...input }) => (
        <FormInput
          key={input.id}
          {...input}
          errorMessage={getter[input.name].errorMessage}
          value={getter[input.name].value}
          onChange={onChange}
        />
      ))}
      <button type="submit">Registrarse</button>
    </form>
  );
}

const validateForm = (getter, inputs, setter, url) => {
  let validity = {};
  for (let key in getter) {
    validity[key] = {
      value: getter[key].value,
      errorMessage: inputs
        .find((input) => input.name == key)
        .conditions(getter[key].value, getter[key].errorMessage),
    };
  }
  setter(validity);
  let hasErrors = Object.values(validity).some(
    (input) => input.errorMessage !== ""
  );

  console.log(hasErrors);

  if (!hasErrors) {
    const dataToSend = {};
    for (let key in getter) {
      dataToSend[key] = getter[key].value;
    }
    const response = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    return response;
  }
};
