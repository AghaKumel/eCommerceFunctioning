import React,{useState,useEffect} from 'react'
import { useParams,useNavigate  } from 'react-router-dom';
import './updprod.css';

const Updprod = () => {

  const path="http://localhost:5000";
  const navigate = useNavigate();

  const[credentials,setCredentials]=useState({name:"",price:"",category:"",company:""});

  const params=useParams();
  
  useEffect(()=>{
    handleUpdate();
  },[params]);

  const handleUpdate=async()=>{

    const url=`${path}/updprefill/${params.id}`;
    const response=await fetch(url);
    const result=await response.json();
    console.log(result);
    setCredentials({
      name: result.name,
      price: result.price,
      category: result.category,
      company: result.company
    });
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const url = `${path}/updProduct/${params.id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      navigate('/'); // Redirect to the product list page after updating
    }
  };

  return (
    <div className='updprod'>
      <form onSubmit={onSubmit}>
        <h1>Update Product</h1>
        <div className='feilds'>
          <div className='feild'>
            <input type="text" id='name' name='name' value={credentials.name} onChange={onChange} placeholder='Enter Updated Name' />
          </div>
          <div className='feild'>
            <input type="text" id='price' name='price' value={credentials.price} onChange={onChange} placeholder='Enter Updated Price' />
          </div>
          <div className='feild'>
            <input type="text" id='category' name='category' value={credentials.category} onChange={onChange} placeholder='Enter Updated Category' />
          </div>
          <div className='feild'>
            <input type="text" id='company' name='company' value={credentials.company} onChange={onChange} placeholder='Enter Updated Company' />
          </div>
        </div>
        <button className="btn btn-primary mx-4">Update Product</button>
      </form>
    </div>
  );
};

export default Updprod
