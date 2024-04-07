export const inputsLogin = [
  {
    id: 1,
    name: "User",
    type: "text",
    placeholder: "Carne",
    label: "Usuario",
    conditions: function (values) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      }
      return error;
    },
  },
  {
    id: 2,
    name: "Password",
    type: "password",
    placeholder: "Contraseña",
    label: "Contraseña",
    conditions: function (values) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      }
      return error;
    },
  },
];
export const inputsSignUp = [
  {
    id: 1,
    name: "Carne",
    type: "text",
    placeholder: "Carne",
    label: "Carne",
    conditions: function (values) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (!RegExp("^[0-9]{7,}$").test(values)) {
        error = "El carne debe tener 7 digitos";
      }
      return error;
    },
  },
  {
    id: 2,
    name: "Faculty",
    type: "text",
    placeholder: "Facultad",
    label: "Facultad",
    conditions: function (values) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (!RegExp("^[A-Za-z]+$").test(values)) {
        error = "Solo se permiten letras";
      }
      return error;
    },
  },

  {
    id: 3,
    name: "Name",
    type: "text",
    placeholder: "Nombres",
    label: "Nombres",
    conditions: function (values) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (!RegExp("^[A-Za-z]+$").test(values)) {
        error = "Solo se permiten letras";
      }
      return error;
    },
  },
  {
    id: 4,
    name: "Gender",
    type: "text",
    placeholder: "Genero",
    label: "Genero",
    conditions: function (values) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (!RegExp("^[A-Za-z]+$").test(values)) {
        error = "Solo se permiten letras";
      }
      return error;
    },
  },
  {
    id: 5,
    name: "Career",
    type: "text",
    placeholder: "Carrera",
    label: "Carrera",
    conditions: function (values) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (!RegExp("^[A-Za-z]+$").test(values)) {
        error = "Solo se permiten letras";
      }
      return error;
    },
  },
  {
    id: 6,
    name: "Email",
    type: "email",
    placeholder: "Correo Electronico",

    label: "Correo Electronico",
    conditions: function (values) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (
        !RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$").test(
          values
        )
      ) {
        error = "ingrese un correo valido";
        console.log("correo valido");
      }

      return error;
    },
  },
  {
    id: 7,
    name: "Password",
    type: "Password",
    placeholder: "Contraseña",
    label: "Contraseña",

    conditions: function (values) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (
        !RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$").test(values)
      ) {
        error =
          "La contraseña debe tener al menos 8 caracteres, una letra mayuscula, una letra minuscula y un numero";
      }
      return error;
    },
  },
];
