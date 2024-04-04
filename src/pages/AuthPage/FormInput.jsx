/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./styles/input.css";

export default function FormInput(props) {
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  return (
    <div className="formInput">
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} required />
      <span>{errorMessage}</span>
    </div>
  );
}
