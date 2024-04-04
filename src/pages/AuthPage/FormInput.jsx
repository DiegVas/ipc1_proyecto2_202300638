/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./styles/input.css";

export default function FormInput(props) {
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const [focus, setFocus] = useState(false);

  const handleFocus = (e) => {
    setFocus(true);
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focus.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
}
