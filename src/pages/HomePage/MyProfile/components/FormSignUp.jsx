/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import FormInput from "./FormInput";
import { inputsSignUp } from "../utils/propsInputs";
import { validateForm } from "../utils/ValidateForm";
import { useUser } from "../../Homepage";
import { useAuth } from "../../../../Routes/Routes";
import { Navigate } from "react-router-dom";

function FormSignUp({ getter, setter }) {
  const { setSessionState, SessionState } = useAuth();
  const User = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await validateForm(
      getter,
      inputsSignUp,
      setter,
      `http://localhost:3000/auth/${User.Uuid}`,
      setSessionState,
      SessionState
    );
    <Navigate to="/" replace />;
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
    <form onSubmit={handleSubmit}>
      {inputsSignUp.map(({ conditions, ...input }) => (
        <FormInput
          key={input.id}
          {...input}
          errorMessage={getter[input.name].errorMessage}
          value={getter[input.name].value}
          onChange={onChange}
          isComboBox={input.name == "Gender"}
        />
      ))}
      <button type="submit" className="ChangeData">
        Cambiar datos
      </button>
    </form>
  );
}

export default FormSignUp;
