import "./styles/HomePage.css";
import logo from "../../assets/logo.png";

import { useAuth } from "../../Routes/Routes";
import { NavLink, Outlet } from "react-router-dom";
import { CgFeed } from "react-icons/cg";
import { MdDynamicFeed } from "react-icons/md";
import { FaHeart, FaUser } from "react-icons/fa";
import { createContext, useContext, useState } from "react";

const PostContext = createContext();
export const UsePostContext = () => useContext(PostContext);

export default function HomePage() {
  const [postState, setPostState] = useState([]);

  return (
    <div className="Container">
      <div className={"Placeholder"} />
      <div className="SideBar">
        <img src={logo} alt="Logo" />
        <nav>
          <NavLink to="/">
            <CgFeed />
            Publicaciones
          </NavLink>

          <NavLink to="MyPosts">
            <MdDynamicFeed />
            Mis publicaciones
          </NavLink>
          <NavLink to="Liked">
            <FaHeart />
            Me gusta
          </NavLink>
          <NavLink to="MyProfile">
            <FaUser />
            Perfil
          </NavLink>
        </nav>
      </div>
      <div className="Main">
        <PostContext.Provider value={{ postState, setPostState }}>
          <Outlet />
        </PostContext.Provider>
      </div>
    </div>
  );
}
