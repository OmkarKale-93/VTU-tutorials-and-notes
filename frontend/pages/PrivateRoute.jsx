// import { useState, useEffect } from 'react';  
// import { Outlet, useNavigate } from 'react-router-dom'; // Import useNavigate  
// import axios from 'axios';   

// function PrivateRoute() {  
//   const [isAuthenticated, setIsAuthenticated] = useState(false);  
//   const [isLoading, setIsLoading] = useState(true);  
//   const navigate = useNavigate(); // Get the navigate function  

//   useEffect(() => {  
//     const fetchToken = async () => {  
//       try {  
//         const response = await axios.get('/api/user/getCookie');   
//         if (response.data && response.data.token) { 
            
//           setIsAuthenticated(true);  
//         } else {  
//           console.error('No token found in response.');   
//         }  

//       } catch (error) {  
//         console.error('Error fetching token:', error);  
//       } finally {  
//         setIsLoading(false);   
//       }  
//     };  

//     fetchToken();   
//   }, []);  

//   if (isLoading) {  
//     return <div>Loading...</div>;  
//   }  

//   // Redirect if not authenticated  
//   if (!isAuthenticated) {  
//     navigate('/login', { replace: true }); // Use navigate to redirect  
//     return null; // Prevent rendering the Outlet component  
//   }   

//   return <Outlet />;  
// }  

// export default PrivateRoute;