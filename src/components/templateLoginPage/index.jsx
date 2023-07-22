import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/authContext";


async function loginUser(credentials) {
    console.log(credentials)
    return fetch('http://localhost:5173/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function LoginPageTemplate() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const { onLogin } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    onLogin(token);
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