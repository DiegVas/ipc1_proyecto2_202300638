import logo from "../../../assets/logo.png";
import "../styles/HeaderPage.css";

export default function HeaderPage() {
  return (
    <header className="Auth-Header">
      <img src={logo} alt="Logo" />
      <nav>
        <li>
          <a href="">Acerca de Nosotros</a>
        </li>
        <li>
          <a href="">Contacto</a>
        </li>
      </nav>
    </header>
  );
}
