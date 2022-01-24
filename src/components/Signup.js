import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom'

function Signup(props) {
  const host="http://localhost:5000";
  const [credentials, setCredentials] = useState({name:"",email:"", password:"",cpassword:""});

  let navigate=useNavigate ();

  const onChange=(e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }

  const {email, password, name}=credentials;

  const handleSignup= async (e)=>{
    e.preventDefault();
    // API Call To send Request for Signup
    const response = await fetch(`${host}/api/auth/createuser/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email,password}) 
    });
    const json=await response.json();
    if(json.success)
    {
      //Redirect the user to Home page
      localStorage.setItem('token', json.auth_token);
      navigate("/");
      props.showAlert("Signup successfully", "success");
    }
    else
    {
      //wrong details
      props.showAlert("Invalid details", "danger");
    }
  }
  return (
    <form onSubmit={handleSignup}>
      <div className="mb-4">
      <h1>Signup</h1>
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Your Name</label>
        <input type="text" className="form-control" id="name" onChange={onChange} name='name' minLength={3} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name='email'/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" onChange={onChange} name='password' minLength={5} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" onChange={onChange} name='cpassword' minLength={5} required/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Signup;
