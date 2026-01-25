import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage]   = useState("");
 const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
           localStorage.setItem("token", data.token); 
           console.log(data.token)
        setMessage("Registered successfully!");
        navigate("/userDetails")
      } else {
        setMessage(`${data.error}`);
      }
    } catch (err) {
      setMessage("Something went wrong!");
    }
  };

  return (
    <div>
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
            <Sidebar />
          </div>
          <br />
          <br />
    <div style={{ width: "300px", margin: "auto" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
    </div>
  );
}
