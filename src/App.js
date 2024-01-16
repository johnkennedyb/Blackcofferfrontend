import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Login from './Login';
import './App.css';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Define refs for sections in the Home component
  const intensityRef = useRef(null);
  const likelyhoodRef = useRef(null);
  const relevanceRef = useRef(null);
  const yearRef = useRef(null);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleLogin = (userData) => {
    setLoggedIn(true);
    setUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const storedLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const storedUser = JSON.parse(localStorage.getItem('user'));

      setLoggedIn(storedLoggedIn);
      setUser(storedUser);
    };

    checkLoginStatus();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard/*" element={isLoggedIn ? (
            <div className="grid-container">
              <Header OpenSidebar={OpenSidebar} onLogout={handleLogout} />
              <Sidebar
                openSidebarToggle={openSidebarToggle}
                OpenSidebar={OpenSidebar}
                intensityRef={intensityRef}
                likelyhoodRef={likelyhoodRef}
                relevanceRef={relevanceRef}
                yearRef={yearRef}
              />
              <Home
                user={user}
                onLogout={handleLogout}
                intensityRef={intensityRef}
                likelyhoodRef={likelyhoodRef}
                relevanceRef={relevanceRef}
                yearRef={yearRef}
              />
            </div>
          ) : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


