import React, { useState } from "react";
import { login } from "../api";

function SignIn({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response.error) {
      alert(response.message);
    } else {
      alert(response.message);
      setIsAuthenticated(true);
    }
  };


  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} style={{ width: "400px" }}>
       <h1 style={{ textAlign: "center" }}>Sign In</h1>
        <div style={{ margin: "10px 0" }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "5px", width: "100%" }}
            />
          </label>
        </div>
        <div style={{ margin: "10px 0" }}>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: "5px", width: "100%" }}
            />
          </label>
        </div>
        
        <div style={{ margin: "10px 0" }}>
             <button type="submit">Login</button>
        </div>
        
      </form>
    </div>
  );
}

export default SignIn;
