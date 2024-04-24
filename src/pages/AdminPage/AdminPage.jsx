import { useState, useEffect } from "react";
import "./Styles/AdminPage.css";
import UserTable from "./components/UserTable";
import PostTable from "./components/PostTable";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [table, setTable] = useState([true, false]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/getusers");
      const data = await response.json();
      setUsers(data);
    };

    const fetchPosts = async () => {
      const response = await fetch("http://localhost:3000/getposts");
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };

    fetchUsers();
    fetchPosts();
  }, []);

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

  return (
    <div className="AdminPage">
      <h1>Carga Masiva</h1>
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
    </div>
  );
}
