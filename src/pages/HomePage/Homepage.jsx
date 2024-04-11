import { useAuth } from "../../Routes/Routes";
import logo from "../../assets/logo.png";
import "./styles/HomePage.css";

export default function HomePage() {
  //  const { SessionState } = useAuth();

  return (
    <div className="Container">
      <div className="SideBar">
        <img src={logo} alt="Logo" />
      </div>
      <div className="Main">
        <nav className="UserMenu"></nav>
        <h1>Bienvenido</h1>
        <p>Publicaciones</p>
      </div>
    </div>
  );
}
