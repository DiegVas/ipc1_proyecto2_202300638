export const inputsLogin = [
  {
    id: 1,
    name: "Carne",
    type: "text",
    placeholder: "Carne",
    label: "Usuario",
    conditions: function (values, errorMessage) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (!RegExp("^[0-9]+$").test(values)) {
        error = "Solo se permiten numeros";
      } else if (errorMessage == "Carne no encontrado") {
        error = errorMessage;
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
    conditions: function (values, errorMessage) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (errorMessage == "Contraseña incorrecta") {
        error = errorMessage;
      }
      return error;
    },
  },
];
export const inputsSignUp = [
  {
    id: 1,
    name: "Name",
    type: "text",
    placeholder: "Nombres",
    label: "Nombres",
    conditions: function (values) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (!RegExp("^[A-Za-z ]+$").test(values)) {
        error = "Solo se permiten letras";
      }
      return error;
    },
  },
  {
    id: 2,
    name: "LastName",
    type: "text",
    placeholder: "Apellido",
    label: "Apellidos",
    conditions: function (values) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (!RegExp("^[A-Za-z ]+$").test(values)) {
        error = "Solo se permiten letras";
      }
      return error;
    },
  },
  {
    id: 3,
    name: "Carne",
    type: "text",
    placeholder: "Carne",
    label: "Carne",
    conditions: function (values, errorMessage) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (!RegExp("^[0-9]+$").test(values)) {
        error = "Solo se permiten numeros";
      } else if (!RegExp("^[0-9]{7,}$").test(values)) {
        error = "El carne debe tener 7 digitos";
      } else if (errorMessage == "Carne ya registrado") {
        error = errorMessage;
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
    name: "Faculty",
    type: "text",
    placeholder: "Facultad",
    label: "Facultad",
    conditions: function (values) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (!RegExp("^[A-Za-z ]+$").test(values)) {
        error = "Solo se permiten letras";
      }
      return error;
    },
  },
  //^[A-Za-z ]+$
  {
    id: 6,
    name: "Career",
    type: "text",
    placeholder: "Carrera",
    label: "Carrera",
    conditions: function (values) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (!RegExp("^[A-Za-z ]+$").test(values)) {
        error = "Solo se permiten letras";
      }
      return error;
    },
  },
  {
    id: 7,
    name: "Email",
    type: "email",
    placeholder: "Correo Electronico",

    label: "Correo Electronico",
    conditions: function (values, errorMessage) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (!RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$").test(values)) {
        error = "ingrese un correo valido";
      } else if (errorMessage == "Correo ya registrado") {
        error = errorMessage;
      }

      return error;
    },
  },
  {
    id: 8,
    name: "Password",
    type: "Password",
    placeholder: "Contraseña",
    label: "Contraseña",

    conditions: function (values) {
      let error = "";
      if (values == "") {
        error = "Complete este campo";
      } else if (!RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])?[A-Za-z\\d!@#$%^&*]{8,}$").test(values)) {
        error = "La contraseña debe tener al menos 8 caracteres, una letra mayuscula, una letra minuscula y un numero";
      }
      return error;
    },
  },
];
