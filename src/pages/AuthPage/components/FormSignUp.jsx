/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import FormInput from "./FormInput";
import { inputsSignUp } from "../utils/propsInputs";
import { validateForm } from "../utils/ValidateForm";
import { useAuth } from "../../../Routes/Routes";
import { useNavigate } from "react-router-dom";

function FormSignUp({ login, getter, setter }) {
  const { loginState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await validateForm(getter, inputsSignUp, setter, "http://localhost:3000/auth/signUp");
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

    const condition = inputsSignUp.find((input) => input.name == name).conditions(value);

    setter({
      ...getter,
      [name]: { value: value, errorMessage: condition },
    });
  };

  return (
    <form onSubmit={handleSubmit} className={login ? "" : "disabled"}>
      {[0, 2, 4].map((startIndex) => (
        <div className="formRow" key={startIndex}>
          {inputsSignUp.slice(startIndex, startIndex + 2).map(({ conditions, ...input }) => (
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

export default FormSignUp;
