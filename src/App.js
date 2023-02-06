import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import SignupForm from './pages/SignUp';
import LoginForm from './pages/SingIn';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DummyHomePage from './DummyHomePage';


function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);


  if (isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" exact element={<DummyHomePage />} />
        </Routes>
      </Router>
    );
  }

  return (
    <div>
         {showSignup ? <SignupForm setShowSignup={setShowSignup}/> : <LoginForm setIsAuthenticated={setIsAuthenticated} />}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <button 
          onClick={() => setShowSignup(false)}
          style={{ marginRight: '10px' }}
         >
          Signin
          </button>
        <button 
          onClick={() => setShowSignup(true)}
          style={{ marginLeft: '10px' }}
        >Signup</button>
      </div>
    </div>
  );
}

export default App;
