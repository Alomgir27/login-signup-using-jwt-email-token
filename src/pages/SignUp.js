import React, { useState } from "react";
import { signup } from "../api";

const SignUp = ({ setShowSignup}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = formData;
    if(password !== confirmPassword) return alert("Passwords do not match");
    const response = await signup(email, password, confirmPassword);
    if (response.error) {
      alert(response.message);
    } else {
      alert(response.message);
      setShowSignup(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} style={{ width: "400px" }}>
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>
        <div style={{ margin: "10px 0" }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              style={{ padding: "5px", width: "100%" }}
            />
          </label>
        </div>
        <div style={{ margin: "10px 0" }}>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ padding: "5px", width: "100%" }}
            />
          </label>
        </div>
        <div style={{ margin: "10px 0" }}>
             <button type="submit">Sign Up</button>
        </div>
        
      </form>
    </div>
  );
};

export default SignUp;
