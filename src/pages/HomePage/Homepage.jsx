import { useAuth } from "../../Routes/Routes";
import logo from "../../assets/logo.png";
import "./styles/HomePage.css";
import { CgFeed } from "react-icons/cg";
import { MdDynamicFeed } from "react-icons/md";
import { FaHeart, FaUser } from "react-icons/fa";

export default function HomePage() {
  //  const { SessionState } = useAuth();

  return (
    <div className="Container">
      <div className="SideBar">
        <img src={logo} alt="Logo" />
        <nav>
          <li>
            <CgFeed />
            <a href="">Publicar</a>
          </li>
          <li>
            <MdDynamicFeed />
            <a href="">Mis publicaciones</a>
          </li>
          <li>
            <FaHeart />
            <a href="">Me gusta</a>
          </li>
          <li>
            <FaUser />
            <a href="">Perfil</a>
          </li>
        </nav>
      </div>
      <div className="Main">
        <nav className="UserMenu"></nav>
        <h1>Bienvenido</h1>
        <p>Publicaciones</p>
      </div>
    </div>
  );
}
