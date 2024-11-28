import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import Sidebar from '../components/Sidebar';  
import Videos from '../components/Videos';  
import axios from 'axios';  
import NavigationBar from '../components/NavigationBar';

function Home() {  
  const [loading, setLoading] = useState(true);  
  const navigate = useNavigate();  

  useEffect(() => {  
    const fetchCookie = async () => {  
      try {  
        const response = await axios.get('/api/user/getCookie');  
        if (response.data.token) {  
          // Cookie is present, you can set the loading to false
          setLoading(false);  
        } else {  
          // Cookie is not present, redirect to login
          navigate('/login', { replace: true });  
        }  
      } catch (error) {  
        console.error('Error fetching cookie:', error);  
        navigate('/login', { replace: true });  
      }  
    };  

    fetchCookie();  
  }, [navigate]);  

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or some loading indicator
  }

  return (  
    <>  
     <NavigationBar />
      <Sidebar />  
      <div className="container">  
        <Videos />  
      </div>  
    </>  
  );  
}  

export default Home;