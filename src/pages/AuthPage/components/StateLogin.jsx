/* eslint-disable react/prop-types */
function StateLogin({ text, active, login, setLogin }) {
  const classActive = active ? "" : "disabled";
  return (
    <li className={classActive} onClick={() => setLogin([!login[0], !login[1]])}>
      <span>{text}</span>
    </li>
  );
}
export default StateLogin;
