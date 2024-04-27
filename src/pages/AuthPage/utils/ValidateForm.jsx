export const validateForm = (getter, inputs, setter, url) => {
  let validity = {};
  for (let key in getter) {
    validity[key] = {
      value: getter[key].value,
      errorMessage: inputs.find((input) => input.name == key).conditions(getter[key].value, getter[key].errorMessage),
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    return response;
  }
};
