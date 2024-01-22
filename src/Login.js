import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Include Bootstrap CSS
import './login.css'; // Your custom styles

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
    <div className="container h-100">
      <div className="row align-items-center h-100">
        <div className="col-md-6 mx-auto">
          <div className="login-container">
            <h2>Login To Your Account</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
