import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import Cookies from 'js-cookie';  
import { Link, useNavigate } from 'react-router-dom'; 
import './Login.css' 

function Login() {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [cookieValue, setCookieValue] = useState(null);  
  const navigate = useNavigate();  

  useEffect(() => {  
    // Fetch cookie on component mount  
    const fetchCookie = async () => {  
      try {  
        const response = await axios.get('/api/user/getCookie');  
        if (response.data.token) {  
          Cookies.set('authToken', response.data.token); // Set the cookie  
          navigate('/'); // Redirect if a cookie exists  
        }  
      } catch (error) {  
        console.error('Error fetching cookie:', error);  
      }  
    };  

    fetchCookie();  
  }, []);  

  const handleSubmit = async (event) => {  
    event.preventDefault();  

    try {  
      const response = await axios.post('/api/user/login', { email, password });  
      if (response) {  
        setIsLoggedIn(true);  
        // Store authentication token or user data after successful login  
        Cookies.set('authToken', response.data.token);  
        navigate('/', { replace: true });  
      } else {  
        // Handle login errors (e.g., incorrect credentials)  
        console.error('Login failed:', response.data.message);  
      }  
    } catch (error) {  
      console.error('Error during login:', error);  
    }  
  };  

  return (  
    
    <div className='containerof'>  
      <center>
      <form onSubmit={handleSubmit}>  
      <h1>Login</h1>  <br />
        <div>  
          <label htmlFor="email">Email:</label>  

          <input  
            type="email"  
            id="email"  
            value={email}  
            onChange={(e) => setEmail(e.target.value)}  
            required  
            className='lgin'
          />  
        </div>  
        <br />
        <div>  
          <label htmlFor="password">Password:</label>  
          <input  
            type="password"  
            id="password"  
            value={password}  
            onChange={(e) => setPassword(e.target.value)}  
            required  
            className='lgin'
          />  
        </div>  <br />  <br />
        <button type="submit" className='login' >Login</button>  
        <p className='reg1'>Don't have an account? <Link to="/register">Register</Link></p> 
      </form>  
      </center>
    </div>  
   
  );  
}  


export default Login;  
