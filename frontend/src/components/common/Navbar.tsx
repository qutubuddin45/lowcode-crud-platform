import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h2>Internal Dveloper Platform</h2>
      {user && (
        <button onClick={logout} className="btn-logout">
          Logout
        </button>
      )}
    </nav>
  );
}
