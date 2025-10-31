import React from "react";
import Navbar from "../components/common/Navbar";
import AdminPanel from "./AdminPanel";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");

        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been logged out successfully!",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => navigate("/login", { replace: true }), 1500);
      }
    });
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "right", padding: "10px 20px" }}>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#e63946",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
      <AdminPanel />
    </>
  );
}
