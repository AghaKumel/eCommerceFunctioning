import React, { useState,useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const path = "http://localhost:5000";

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  useEffect(()=>{
    const auth=localStorage.getItem("user");
    if(auth)
    {
      navigate('/');
    }
  },[navigate]);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const url = `${path}/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const result = await response.json();

    if (result) {
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result));
      navigate('/');
    } else {
      alert("Please sign-up...!");
      navigate('/signup');
    }
  }

  return (
    <div className='cont'>
      <div className='feilds'>
        <form className="row g-3" onSubmit={handleOnSubmit}>
          <div className="col-auto">
            <label htmlFor="staticEmail2" className="visually-hidden">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="staticEmail2" 
              name='email' 
              placeholder="Enter your email" 
              value={credentials.email} 
              onChange={onChange} 
              autoComplete="email" 
              required 
            />
          </div>
          <div className="col-auto">
            <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="inputPassword2" 
              name="password" 
              placeholder="Password" 
              value={credentials.password} 
              onChange={onChange} 
              autoComplete="current-password" 
              required 
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">Confirm identity</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
