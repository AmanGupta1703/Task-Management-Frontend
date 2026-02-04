import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Context & Guards
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes: Accessible only when logged out */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes: Requires a valid session/cookie */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Default Redirection */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 Catch-all */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
