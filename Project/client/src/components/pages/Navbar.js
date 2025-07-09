import { Outlet, Link} from "react-router-dom";
import './Profile.css';

import React from "react";

const Navbar = () => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <Link className="navbar-brand" to="/">Social Media</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="navbar-brand" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="navbar-brand" to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
    <Outlet/>
    </div>
  );
};

export default Navbar;
