import React, { useState, useEffect } from 'react';
import './login.css'; 

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add authentication logic here (e.g., validate credentials)
    // For simplicity, always consider it a successful login
    onLogin({ username });
    // Set a flag in local storage to indicate successful login
    localStorage.setItem('isLoggedIn', 'true');
  };

  useEffect(() => {
    // Add the 'login-page' class to the body on component mount
    document.body.classList.add('login-page');

    // Remove the 'login-page' class when the component unmounts
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  return (
    <div className="login-container">
      <h2>Login To Your Account</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin} role="button">
          Login
        </button>
      </form>
      
    </div>
  );
};

export default Login;
