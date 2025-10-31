import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function AppRoutes() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
    setLoading(false); // ✅ Token check complete
  }, []);

  if (loading) {
    // ✅ Prevent flicker
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;
  }

  // ✅ Force open Login page always on first visit
  if (location.pathname === "/") {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      {/* Always accessible */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
