import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function LoginPageTemplate() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const { onLogin, token } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(token)
  if (token) {
    navigate("/movies");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
