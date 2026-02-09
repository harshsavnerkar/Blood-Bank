import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import LandingPage from "./pages/LandingPage";
import EnhancedAuthPage from "./pages/EnhancedAuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

// Simple authentication state management
const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'admin' or 'user'

  const login = (userData, type) => {
    setUser(userData);
    setUserType(type);
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children, requiredType }) {
  const { user, userType } = React.useContext(AuthContext);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredType && userType !== requiredType) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<EnhancedAuthPage />} />
              <Route
                path="/admin-dashboard"
                element={
                  <PrivateRoute requiredType="admin">
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user-dashboard"
                element={
                  <PrivateRoute requiredType="user">
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
export { AuthContext };
