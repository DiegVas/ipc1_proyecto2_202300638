import { useState, useEffect } from "react";
import "./Styles/AdminPage.css";
import MassUpload from "./components/MassUpload";
import Visualidity from "./components/Visualidity";
import Graphs from "./components/Graphs";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("users"); // Modifica esto para ser un string

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/getusers");
      const data = await response.json();
      setUsers(data);
    };

    const fetchPosts = async () => {
      const response = await fetch("http://localhost:3000/getposts");
      const data = await response.json();
      setPosts(data);
    };

    fetchUsers();
    fetchPosts();
  }, []);

  return (
    <div className="AdminPage">
      <nav className="TabsNavigate">
        <button onClick={() => setActiveTab("users")} className={`${activeTab === "users" ? "active" : ""}`}>
          Visualizacion
        </button>
        <button onClick={() => setActiveTab("graph")} className={`${activeTab === "graph" ? "active" : ""}`}>
          Tops
        </button>
        <button onClick={() => setActiveTab("massUpload")} className={`${activeTab === "massUpload" ? "active" : ""}`}>
          Carga Masiva
        </button>
      </nav>
      {activeTab == "users" ? (
        <Visualidity users={users} posts={posts} />
      ) : activeTab == "graph" ? (
        <Graphs users={users} posts={posts} />
      ) : (
        <MassUpload users={users} posts={posts} setPosts={setPosts} setUsers={setUsers} />
      )}
    </div>
  );
}
