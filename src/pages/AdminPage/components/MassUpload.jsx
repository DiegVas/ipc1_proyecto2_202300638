/* eslint-disable react/prop-types */
import { useState } from "react";
import UserTable from "./UserTable";
import PostTable from "./PostTable";

export default function MassUpload({ setPosts, posts, setUsers, users }) {
  const handleMassUploadPosts = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const postsUpload = JSON.parse(event.target.result);
      try {
        const response = await fetch("http://localhost:3000/Postmass-upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postsUpload),
        });

        if (!response.ok) {
          throw new Error("Error al cargar los posts");
        }
      } catch (error) {
        console.error("Error:", error);
      }

      setPosts([...posts, ...postsUpload]);
    };

    reader.readAsText(file);
  };

  const handleMassUploadUsers = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const usersUpload = JSON.parse(event.target.result);
      try {
        const response = await fetch("http://localhost:3000/Usermass-upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usersUpload),
        });

        if (!response.ok) {
          throw new Error("Error al cargar los usuarios");
        }
      } catch (error) {
        console.error("Error:", error);
      }

      setUsers([...users, ...usersUpload]);
    };

    reader.readAsText(file);
  };

  const [table, setTable] = useState([true, false]);

  return (
    <div className="Table">
      <nav>
        <button onClick={() => setTable([true, false])} className={`${table[0] ? "active" : ""}`}>
          Usuarios
        </button>
        <button onClick={() => setTable([false, true])} className={`${table[1] ? "active" : ""}`}>
          Publicaciones
        </button>
      </nav>
      <section>
        {table[0] ? (
          <UserTable handle={handleMassUploadUsers} users={users} />
        ) : (
          <PostTable handle={handleMassUploadPosts} posts={posts} />
        )}
      </section>
    </div>
  );
}
