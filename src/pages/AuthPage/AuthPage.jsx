import LoginForm from "./LoginForm";
import HeaderPage from "./HeaderPage";
import "./styles/AuthPage.css";
import "./styles/AuthPageForm.css";
("../../components/waves.jsx");

export default function AuthPage() {
  return (
    <div className="AuthPage">
      <HeaderPage />
      <div className="AuthPage-content">
        <LoginForm />
      </div>
    </div>
  );
}
