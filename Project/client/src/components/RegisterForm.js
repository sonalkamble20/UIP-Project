import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.css';

const RegisterForm = () => {
  return (
    <div className="form-container">
      <h2>Register</h2>
      <form>
        <div className="mb-3">
          <label>Username:</label>
          <input type="text" className="form-control" placeholder="Enter username" />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" className="form-control" placeholder="Enter password" />
        </div>
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
