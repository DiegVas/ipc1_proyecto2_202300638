import logo from "../../../assets/logo.png";
import "../styles/HeaderPage.css";
import { NavLink } from "react-router-dom";

export default function HeaderPage() {
  return (
    <header className="Auth-Header">
      <img src={logo} alt="Logo" />
      <nav>
        <li>
          <NavLink to="Aboutus">Acerca de Nosotros</NavLink>
        </li>
        <li>
          <NavLink to="Contact" href="">
            Contacto
          </NavLink>
        </li>
        <li>
          <NavLink to="">Iniciar Sesión</NavLink>
        </li>
      </nav>
    </header>
  );
}
