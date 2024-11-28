import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './SingleVideo.css'

function SingleVideo() {

    const [videos, setVideos] = useState([])
    const {id} = useParams();
    useEffect(()=>{
       axios.get(`/api/video/${id}`)
      .then((response) => {
        setVideos(response.data)
        
      }).catch((error)=>{
        console.log(error)
      })
      // <Navbar />
    },[])

  return (
    <div>
        <center><h1>{videos.title}</h1></center>
        <video src={videos.videoFile} className='video-file' controls>
        {/* <source  type="video/mp4" /> */}
      </video>
      <div className="createdby">
        <p>{videos.owner}</p>
      </div>
        <div className='description'>
            <p>
                {videos.description}
            </p>
        </div>

    </div>
  )
}

export default SingleVideo