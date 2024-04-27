/* eslint-disable react/prop-types */
import { useState } from "react";
import { CSVLink } from "react-csv";
import UserVisualidity from "./UserVisualidity";
import PostVisualidity from "./PostVisualidity";

export default function Visualidity({ users, posts, setUsers, setPosts }) {
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
          <UserVisualidity users={users} setUsers={setUsers} />
        ) : (
          <PostVisualidity posts={posts} setPosts={setPosts} />
        )}
      </section>
    </div>
  );
}
