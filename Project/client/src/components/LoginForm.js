import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.css';

const LoginForm = () => {
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" className="form-control" placeholder="Enter password" />
        </div>
        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
