import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom'


function Login() {
  const host="http://localhost:5000";
  const [credentials, setCredentials] = useState({email:"", password:""});

  let navigate=useNavigate ();

  const onChange=(e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }

  const handleLogin= async (e)=>{
    e.preventDefault();
    // API Call To send Request for Login
    const response = await fetch(`${host}/api/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:credentials.email, password:credentials.password}) 
    });
    const json=await response.json();
    if(json.success)
    {
      //Redirect the user to Home page
      localStorage.setItem('token', json.auth_token);
      navigate("/");
    }
    else
    {
      //wrong details
      alert("Please enter Right credential")
    }
  }

  return (
    <form onSubmit={handleLogin}>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email</label>
      <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
    </div>
    <button type="submit" className="btn btn-primary">Login</button>
  </form>
  )
}

export default Login;
