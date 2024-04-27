/* eslint-disable react/prop-types */

import { CSVLink } from "react-csv";
import Modal from "react-modal";
import { useState } from "react";
import "../Styles/SeeUser.css";

export default function UserVisualidity({ users, setUsers }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log(users);

  async function deleteUser(codigo) {
    await fetch(`http://localhost:3000/deleteuser/${codigo}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setUsers(users.filter((user) => user.codigo !== codigo));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const viewPost = (user) => {
    setSelectedUser(user);
    openModal();
  };

  return (
    <>
      <h2>Usuarios</h2>
      <div>
        <CSVLink data={users} filename={"usuarios.csv"}>
          Exportar Usuarios
        </CSVLink>
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
              <th>Acciones</th>
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
                <td className="flex flex-row">
                  <button onClick={() => viewPost(user)}>Ver</button>
                  <button onClick={() => deleteUser(user.codigo)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </nav>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="FormModal">
        {selectedUser && (
          <div className="userSee">
            <h2 className="userSee-title">
              {selectedUser.nombres} {selectedUser.apellidos}
            </h2>
            <p className="userSee-codigo">Carné: {selectedUser.codigo}</p>
            <p className="userSee-carrera">Carrera: {selectedUser.carrera}</p>
            <p className="userSee-facultad">Facultad: {selectedUser.facultad}</p>
            <p className="userSee-correo">Correo: {selectedUser.correo}</p>
            <p className="userSee-genero">Género: {selectedUser.genero === "F" ? "Femenino" : "Masculino"}</p>
            <p className="userSee-posts">Posts: {selectedUser.posts}</p>
            <p className="userSee-comentarios">Comentarios: {selectedUser.comentarios}</p>
            <p>Contraseña: {selectedUser.contrasenia}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
