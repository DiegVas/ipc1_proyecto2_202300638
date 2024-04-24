/* eslint-disable react/prop-types */

import { useRef } from "react";

export default function UserTable({ handle, users }) {
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <h2>Usuarios</h2>
      <div>
        <button onClick={handleButtonClick}>Subir archivo</button>
        <input type="file" accept=".json" onChange={handle} ref={fileInputRef} style={{ display: "none" }} />
      </div>
      <nav>
        <table>
          <thead>
            <tr>
              <th>Carné</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Facultad</th>
              <th>Carrera</th>
              <th>Email</th>
              <th>Genero</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.codigo}</td>
                <td>{user.nombres}</td>
                <td>{user.apellidos}</td>
                <td>{user.facultad}</td>
                <td>{user.carrera}</td>
                <td>{user.correo}</td>
                <td>{user.genero}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </nav>
    </>
  );
}
