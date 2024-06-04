import React, { useState } from 'react'
import "../styles/login.css";
import { useLogin } from '../hooks/useLogin';

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async(e) => {
    e.preventDefault();

    await login(username, password);
  }

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Log in</h3>

        <label>Username:</label>
        <input 
          type="text"
          onChange={(e) => setUsername(e.target.value)} 
          value={username}
        />
        <label>Password:</label>
        <input 
          type="password"
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
        />

        <button disabled={isLoading} className={isLoading ? "disabled-login" : ""}>
          {isLoading ? "Logging in..." : "Log in"}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  )
}
