import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Register.css"; // 👈 custom CSS file

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", form);

      Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: "You can now login to your account!",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed ❌",
        text: err.response?.data?.message || "Something went wrong.",
      });
    }
  };

  const handleLoginRedirect = () => {
    Swal.fire({
      title: "Already have an account?",
      text: "Go to login page?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Login",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) window.location.href = "/login";
    });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>📝 Register</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
            <option value="Viewer">Viewer</option>
          </select>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p>Already have an account?</p>
        <button onClick={handleLoginRedirect} className="login-btn">
          Go to Login
        </button>
      </div>
    </div>
  );
}
