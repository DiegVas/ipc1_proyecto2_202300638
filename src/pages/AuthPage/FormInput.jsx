/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./styles/input.css";

export default function FormInput(props) {
  const { label, errorMessage, onChange, id, isComboBox, ...inputProps } =
    props;
  const [focus, setFocus] = useState(false);

  const handleFocus = (e) => setFocus(true);

  return (
    <div className="formInput">
      <label>{label}</label>
      {isComboBox ? (
        <select
          className={errorMessage != "" ? "invalid" : ""}
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          focused={focus.toString()}
        >
          <option value="">Seleccione un género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      ) : (
        <input
          className={errorMessage != "" ? "invalid" : ""}
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          focused={focus.toString()}
        />
      )}

      <span>{errorMessage}</span>
    </div>
  );
}
