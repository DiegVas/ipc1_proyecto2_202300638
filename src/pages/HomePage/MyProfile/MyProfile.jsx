import { useState } from "react";
import { useUser } from "../Homepage";
import FormSignUp from "./components/FormSignUp";

export default function MyProfile() {
  const User = useUser();
  const [valueSignUp, setValueSignUp] = useState({
    Name: { value: User.Name, errorMessage: "" },
    LastName: { value: User.LastName, errorMessage: "" },
    Gender: { value: "", errorMessage: "" },
    Career: { value: User.Career, errorMessage: "" },
    Faculty: { value: User.Faculty, errorMessage: "" },
    Email: { value: User.Email, errorMessage: "" },
    Password: {
      value: User.Password,
      errorMessage: "",
    },
  });

  return (
    <div className="form-Home">
      <FormSignUp getter={valueSignUp} setter={setValueSignUp} />
    </div>
  );
}
