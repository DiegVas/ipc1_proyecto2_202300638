/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import FormInput from "./FormInput";
import { inputsSignUp } from "../utils/propsInputs";
import { validateForm } from "../utils/ValidateForm";
import { User } from "../../Homepage";

function FormSignUp({ getter, setter }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await validateForm(getter, inputsSignUp, setter, `http://localhost:3000/auth/${User.Uuid}`);
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
      <button type="submit">Cambiar datos</button>
    </form>
  );
}

export default FormSignUp;
