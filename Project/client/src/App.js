import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
}

export default App;
