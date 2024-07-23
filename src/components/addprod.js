import React, { useState } from 'react'
import './addprod.css';

const Addprod = () => {

  const path="http://localhost:5000";

  const[credentials,setCredentials]=useState({name:"",price:"",category:"",company:""});

  const onChange=(e)=>{
    setCredentials({   ...credentials,[e.target.name] :  e.target.value });
  }

  const handleOnSubmit=async(e)=>{
    e.preventDefault();

    const uId=JSON.parse(localStorage.getItem('user'));
    console.log(uId._id)

    const url=`${path}/addProduct`;
    const response=await fetch(url,{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: credentials.name, price: credentials.price  ,  category: credentials.category,userId:uId._id, company: credentials.company})
    });
    const result=await response.json();
    if(result)
    {
      alert("Succesfully added a new Product...")
    }
    else
    {
      alert("error");
    }
    console.log(result);
    
  }

  return (
    <div className='addPcont'>
      <form onSubmit={handleOnSubmit}>
        <h1>Add Product</h1>
        <div className='feilds'>
          <div className='feild'>
            <input type="text" onChange={onChange} id='name' name='name' placeholder='Enter Product Name'/>
          </div>
          <div className='feild'>
            <input type="text" onChange={onChange} id='price' name='price' placeholder='Enter Product Price'/>
          </div>
          <div className='feild'>
            <input type="text" onChange={onChange} id='category' name='category' placeholder='Enter Product Category'/>
          </div>
          <div className='feild'>
            <input type="text" onChange={onChange} id='company' name='company' placeholder='Enter Product Company'/>
          </div>
        </div>
        <button className="btn btn-primary mx-4">Add Product</button>
      </form>
    </div>
  )
}

export default Addprod
