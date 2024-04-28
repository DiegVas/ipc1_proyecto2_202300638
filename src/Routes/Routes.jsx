/* eslint-disable react/prop-types */
import { Route, Routes, Navigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import AuthPage from "../pages/AuthPage/AuthPage";
import HomePage from "../pages/HomePage/Homepage";
import Feed from "../pages/HomePage/Feed/Feed";
import MyPosts from "../pages/HomePage/MyPosts/MyPosts";
import Liked from "../pages/HomePage/Liked/Liked";
import MyProfile from "../pages/HomePage/MyProfile/MyProfile";
import AdminPage from "../pages/AdminPage/AdminPage";
import Contact from "../pages/AuthPage/components/contact";
import Aboutus from "../pages/AuthPage/components/Aboutus";
import AuthLogin from "../pages/AuthPage/components/AuthLogin";

const AuthConetext = createContext();

export const useAuth = () => useContext(AuthConetext);

const ProtectedRoute = ({ children }) => {
  const { SessionState } = useAuth();
  if (!SessionState.State) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { SessionState } = useAuth();
  if (SessionState.User.Role != "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AuthRoute = ({ children }) => {
  const { SessionState } = useAuth();
  console.log(SessionState.User);
  if (SessionState.User.Role == "admin") {
    return <Navigate to="/admin" replace />;
  } else if (SessionState.State) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default function RoutesNavigator() {
  const [SessionState, setSessionState] = useState({
    User: {},
    State: false,
  });

  const loginState = (User) => setSessionState({ User: User, State: true });

  const logoutState = () => setSessionState({ User: {}, State: false });

  return (
    <div className="w-full h-full">
      <AuthConetext.Provider value={{ SessionState, loginState, logoutState, setSessionState }}>
        <Routes>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          ></Route>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Feed />} />
            <Route path="MyPosts" element={<MyPosts />} />
            <Route path="Liked" element={<Liked />} />
            <Route path="MyProfile" element={<MyProfile />} />
            <Route path="*" element={<h1>404</h1>} />
          </Route>
          <Route
            path="/auth"
            element={
              <AuthRoute>
                <AuthPage />
              </AuthRoute>
            }
          >
            <Route path="Contact" element={<Contact />} />
            <Route path="Aboutus" element={<Aboutus />} />
            <Route path="" element={<AuthLogin />} />
          </Route>
          <Route path="*" element={<h1>404</h1>} />;
        </Routes>
      </AuthConetext.Provider>
    </div>
  );
}
