/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Routes/Routes";
import FormInput from "./FormInput";
import { inputsLogin } from "../utils/propsInputs";
import { validateForm } from "../utils/ValidateForm";

function FormLogin({ login, getter, setter }) {
  const { loginState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await validateForm(getter, inputsLogin, setter, "http://localhost:3000/auth/login");
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
      navigate("");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const condition = inputsLogin.find((input) => input.name == name).conditions(value);

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

export default FormLogin;
