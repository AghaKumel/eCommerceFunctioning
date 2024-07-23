import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {

  const path = "http://localhost:5000";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    handleProducts();
  }, []);

  const handleProducts = async (e) => {

    const url = `${path}/listProducts`;
    const response = await fetch(url, {
      headers:{
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    })

    const result = await response.json();
    setProducts(result);
  }
  console.log("products", products);

  const handleDelete = async (id) => {

    // console.log(id);
    const url = `${path}/delProduct/${id}`
    const response = await fetch(url, {
      method: "DELETE"
    })
    if (response) {
      handleProducts();
      alert("Product Deleted Succesfully...");
    }
    else {
      alert("Error..!")
    }
  }
  
  const handleSearch=async(e)=>{
    let key=e.target.value;
    if(key==="")
    {
      handleProducts();
    }
    else{
      const url=`${path}/search/${key}`;
      const response=await fetch(url);
        let result=await response.json();
        if(result)
        {
          setProducts(result);
        }
      }
  }

  return (
    <div className='Product-List'>
      <h3>Product List</h3>
      <input onChange={handleSearch} type="text" className="searchbar" placeholder="Search..."/>
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        {/* <li>UserId</li> */}
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {
        products.length>0 ? products.map((item, index) =>
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            {/* <li>{item.userId}</li> */}
            <li>{item.company}</li>
            <li>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
              <Link to={'/updprod/' + item._id}>Update</Link>
            </li>
          </ul>
        )
        :
        <h3>No Products found...</h3>
      }
    </div>
  )
}

export default Home
