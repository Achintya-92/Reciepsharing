import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Sidebar from './Sidebar';

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage]   = useState("");
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok){
        localStorage.setItem("token", data.token); // token save
        setMessage("✅ Logged in successfully!");
        navigate(`/userDetails/${data.userId}`);
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Something went wrong!" ,`❌ ${data.error}`);
    }
  };

  return (
    <div>
                  <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
            <Sidebar />
          </div>
          <br />
          <br />
  
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
