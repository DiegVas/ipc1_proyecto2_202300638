export const validateForm = (getter, inputs, setter, url, setSessionState) => {
  let validity = {};
  for (let key in getter) {
    const input = inputs.find((input) => input.name == key);
    validity[key] = {
      value: getter[key].value,
      errorMessage: input.conditions(getter[key].value, getter[key].errorMessage),
    };
  }
  setter(validity);
  let hasErrors = Object.values(validity).some((input) => input.errorMessage !== "");

  if (!hasErrors) {
    const dataToSend = {};
    for (let key in getter) {
      dataToSend[key] = getter[key].value;
    }
    const response = fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    setSessionState((prevState) => ({ ...prevState, User: { ...prevState.User, ...dataToSend } }));
    return response;
  }
};
