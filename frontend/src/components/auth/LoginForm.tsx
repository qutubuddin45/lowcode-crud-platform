import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Login.css";
import { useNavigate } from "react-router-dom";




export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        Swal.fire({
          icon: "success",
          title: "Login Successful 🎉",
          text: "Welcome back! Redirecting to dashboard...",
          timer: 2000,
          showConfirmButton: false,
        });
        

          setTimeout(() => {
    navigate("/dashboard", { replace: true });
  }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "No Token Received",
          text: "Please contact support.",
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Login Failed ❌",
        text: err.response?.data?.message || "Invalid credentials",
      });
    }
  };

  const handleRegisterRedirect = () => {
    Swal.fire({
      title: "Go to Register?",
      text: "Don’t have an account yet?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Register!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/register";
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔐 Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p>Don’t have an account?</p>
        <button onClick={handleRegisterRedirect} className="register-btn">
          Register
        </button>
      </div>
    </div>
  );
}
