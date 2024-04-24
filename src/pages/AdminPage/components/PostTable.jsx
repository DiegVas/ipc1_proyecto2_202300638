/* eslint-disable react/prop-types */

import { useRef } from "react";

export default function PostTable({ handle, posts }) {
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <h2>Publicaciones</h2>
      <div>
        <button onClick={handleButtonClick}>Subir archivo</button>
        <input type="file" accept=".json" onChange={handle} ref={fileInputRef} style={{ display: "none" }} />
      </div>
      <nav>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Anónimo</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index}>
                <td>{post.codigo}</td>
                <td>{post.descripcion}</td>
                <td>{post.categoria}</td>
                <td>{post.anonimo ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </nav>
    </>
  );
}
