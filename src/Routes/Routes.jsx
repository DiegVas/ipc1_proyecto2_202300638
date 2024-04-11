/* eslint-disable react/prop-types */
import { Route, Routes, Navigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import AuthPage from "../pages/AuthPage/AuthPage";
import HomePage from "../pages/HomePage/Homepage";

const AuthConetext = createContext();

export const useAuth = () => useContext(AuthConetext);

const ProtectedRoute = ({ children }) => {
  const { SessionState } = useAuth();
  if (!SessionState.State) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

const AuthRoute = ({ children }) => {
  const { SessionState } = useAuth();
  if (SessionState.State) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default function RoutesNavigator() {
  const [SessionState, setSessionState] = useState({ User: {}, State: false });

  const loginState = (User) => setSessionState({ User: User, State: true });

  const logoutState = () => setSessionState({ User: {}, State: false });

  return (
    <div className="w-full h-full">
      <AuthConetext.Provider value={{ SessionState, loginState, logoutState }}>
        <Routes>
          <Route
            path="/"
            element={
              //    <ProtectedRoute>
              <HomePage />
              //  </ProtectedRoute>
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
