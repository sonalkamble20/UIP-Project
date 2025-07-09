import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/pages/Navbar';
import LoginForm from './components/pages/LoginForm';
import RegisterForm from './components/pages/RegisterForm';
import Profile from './components/pages/Profile';

import './App.css';

function App() {
  return (
    <div className="container mt-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar/>}/>
          <Route path="login" element={<LoginForm/>}/>
          <Route path="register" element={<RegisterForm/>}/>
          <Route path="profile/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
