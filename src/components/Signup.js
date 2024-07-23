import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

const Signup = () => {

  const path="http://localhost:5000";

  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
  const navigate=useNavigate();

  useEffect(()=>{
    const auth=localStorage.getItem("user");
    if(auth)
    {
      navigate('/');
    }
  },[navigate]);

  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name] : e.target.value})
  }

  const handleOnSubmit=async(e)=>{
    e.preventDefault();

    if(credentials.password!==credentials.cpassword)
    {
      alert("Passwords doesn't match....!");
      return;
    }

    const url=`${path}/register`;
    const response=await fetch(url,{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: credentials.name, email: credentials.email  ,  password: credentials.password})
    })
  
    const result =await response.json();
    // console.log(result);
    if(result)
    {
      alert("Account created Succesfully","success");
      localStorage.setItem("user",JSON.stringify(result));
      navigate("/");
    }
    else
    {
      alert("Invalid Credentials","danger");
    }
  }

  return (
    <div className='container'>
      <form onSubmit={handleOnSubmit}>
        <div className='font'>
          <h1>Sign Up...</h1>
        </div>
      <div className="row mb-4">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control mx-5" id="name" name='name' onChange={onChange} placeholder='Enter your Name'/>
          </div>
        </div>
        <div className="row mb-4">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control mx-5" id='email' name='email' onChange={onChange} placeholder='Enter your email'/>
          </div>
        </div>
        <div className="row mb-4">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control mx-5" id='password' name='password' onChange={onChange} placeholder='Enter your Password'/>
          </div>
        </div>
        <div className="row mb-4">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Confirm Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control mx-5" id='cpassword' name='cpassword' onChange={onChange} placeholder='Re-Enter your Password'/>
          </div>
        </div>
        <div className='subtn'>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </div>
      </form>
    </div>
  )
}

export default Signup
