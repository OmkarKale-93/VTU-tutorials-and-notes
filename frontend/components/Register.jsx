import React, { useState } from 'react';  
import axios from 'axios';  
import Cookies from "js-cookie";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Register.css'

function Register() {  
  const [formData, setFormData] = useState({  
    username: '',  
    email: '',  
    password: '',  
    avatar: null, // Store file object here  
  });  
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});  

  const handleChange = (e) => {  
    const { name, value, files } = e.target;  

    if (name === 'avatar') {  
      // Handle file input  
      setFormData({ ...formData, [name]: files[0] });  
    } else {  
      setFormData({ ...formData, [name]: value });  
    }  
  };  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    setErrors({}); // Clear previous errors  

    // Basic validation (you might want more robust validation)  
    const validationErrors = {};  
    if (!formData.username) validationErrors.username = 'Username is required';  
    if (!formData.email) validationErrors.email = 'Email is required';  
    // ... add more validation rules  
    setErrors(validationErrors);  

    if (Object.keys(validationErrors).length > 0) {  
      return; // Don't submit if validation fails  
    }  

    try {  
      const formDataToSend = new FormData();  
      formDataToSend.append('username', formData.username);  
      formDataToSend.append('email', formData.email);  
      formDataToSend.append('password', formData.password);  
      formDataToSend.append('avatar', formData.avatar);  

      const response = await axios.post('/api/user/register', formDataToSend);  
      console.log('Form data submitted successfully:', response.data); 
       navigate('/', {replace: true})
      // Handle success (e.g., redirect)  
      // const token  = Cookies.get('token'); 
      
    } catch (error) {  
      console.error('Error submitting form data:', error);  
      // Display a user-friendly error message  
      // e.g., setErrors({ ...errors, serverError: 'Something went wrong' })  
    }  
  };  

  return (  
    <div className='container2'>  
      <form onSubmit={handleSubmit}>  
        <h2>Sign Up</h2>  
        {/* ... Input fields with error handling ... */}  

        {errors.username && <div className="error">{errors.username}</div>}  
        <label htmlFor="username">  
          Username:  
          <input  
            type="text"  
            name="username"  
            value={formData.username}  
            onChange={handleChange}  
          />  
        </label>  

        {/* ... Add similar error display for other fields ... */}  
        
        <label htmlFor="email">  
          Email:
          <input  
            type="text"  
            name="email"  
            value={formData.email}  
            onChange={handleChange}  
          />  
           </label>  
          <label htmlFor="username">  
          Password :  
          <input  
            type="password"  
            name="password"  
            value={formData.password}  
            onChange={handleChange}  
          />  
       
        </label>  
        <label htmlFor="avatar">
            Profile Photo: 
            <input type="file" name="avatar" onChange={handleChange} />
        </label>
        <button type="submit" className='reg'>Sign Up</button>  
        <p className='cont'>already have an account? <Link to="/">login here</Link></p>
      </form>  
    </div>  
  );  
}  

export default Register;