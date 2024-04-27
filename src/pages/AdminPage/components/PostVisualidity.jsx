/* eslint-disable react/prop-types */
import { useState } from "react";
import { CSVLink } from "react-csv";
import Modal from "react-modal";
import "../Styles/SeePost.css";

export default function PostVisualidity({ posts, setPosts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const deletePost = (codigo) => {
    fetch(`http://localhost:3000/deletepost/${codigo}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setPosts(posts.filter((post) => post.codigo !== codigo));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const viewPost = (post) => {
    setSelectedPost(post);
    openModal();
  };

  return (
    <>
      <h2>Publicaciones</h2>
      <div>
        <CSVLink data={posts} filename={"Posts.csv"}>
          Exportar Publicaciones
        </CSVLink>
      </div>
      <nav>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Anónimo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(
              (post, index) => (
                console.log(post),
                (
                  <tr key={index}>
                    <td>{post.codigo}</td>
                    <td>{post.descripcion}</td>
                    <td>{post.categoria}</td>
                    <td>{post.anonimo ? "Sí" : "No"}</td>
                    <td className="flex flex-row">
                      <button onClick={() => viewPost(post)}>Ver</button>
                      <button onClick={() => deletePost(post.codigo)}>Eliminar</button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </nav>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="FormModal">
        {selectedPost && (
          <div className="postSee">
            <h2 className="postSee-title">{selectedPost.descripcion}</h2>
            {selectedPost.imagen && (
              <img src={selectedPost.imagen} alt={selectedPost.descripcion} className="postSee-image" />
            )}

            <p className="postSee-uuid">UUID: {selectedPost.uuid}</p>
            <p className="postSee-categoria">Categoría: {selectedPost.categoria}</p>
            <p className="postSee-codigo">Código: {selectedPost.codigo}</p>
            <p className="postSee-fecha">Fecha: {new Date(selectedPost.fecha).toLocaleDateString()}</p>
            <p className="postSee-usuario">Usuario: {selectedPost.usuario}</p>
            <p className="postSee-likes">Likes: {selectedPost.likes}</p>
            <p className="postSee-numeroComentarios">Número de comentarios: {selectedPost.numeroComentarios}</p>
            <p className="postSee-anonimo">Anónimo: {selectedPost.anonimo ? "Sí" : "No"}</p>
            <p className="postSee-gustadoPor">Le gustó a: {selectedPost.gustadoPor.join(", ")}</p>
            {selectedPost.comentarios.length > 0 && (
              <div className="postSee-comentarios">
                <h3>Comentarios:</h3>
                {selectedPost.comentarios.map((comentario, index) => (
                  <p key={index}>{comentario}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
