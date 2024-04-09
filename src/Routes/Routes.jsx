/* eslint-disable react/prop-types */
import { Route, Routes, Navigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import AuthPage from "../pages/AuthPage/AuthPage";
import HomePage from "../pages/HomePage/AuthPage";

const AuthConetext = createContext();

export const useAuth = () => useContext(AuthConetext);

const ProtectedRoute = ({ children }) => {
  const { UserAuthenticated } = useAuth();
  if (!UserAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

const AuthRoute = ({ children }) => {
  const { UserAuthenticated } = useAuth();
  if (UserAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default function RoutesNavigator() {
  const [UserAuthenticated, setUserAuthenticated] = useState(false);

  const loginState = () => setUserAuthenticated(true);

  const logoutState = () => setUserAuthenticated(false);

  return (
    <div className="w-full h-full">
      <AuthConetext.Provider
        value={{ UserAuthenticated, loginState, logoutState }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          ;
          <Route
            path="/auth"
            element={
              <AuthRoute>
                <AuthPage />
              </AuthRoute>
            }
          />
          ;
          <Route path="*" element={<h1>404</h1>} />;
        </Routes>
      </AuthConetext.Provider>
    </div>
  );
}
