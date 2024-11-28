import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Videos.css'
import { Link } from 'react-router-dom'

function Videos() {
   const [videos, setVideos] = useState([])
  
  useEffect(()=>{
     axios.get("/api/video")
    .then((response) => {
      setVideos(response.data)
      
    }).catch((error)=>{
      console.log(error)
    })
    // <Navbar />
  },[])
  
  return (
    <>
    
    <div className="videos-container">
    <ul className='videos'>  
    {videos.map(video => (  
      <li key={video._id} className='each-vid'>  
        <Link to={`/${video._id}`}>  
        <img src={video.thumbnail} alt={video.title} className='thumbnail'  />  
          <h3>{video.title}</h3>
          <p>{video.owner}</p>
        </Link>  
      </li>  
    ))}  
  </ul> 
  </div>
  </> 
  )
}

export default Videos