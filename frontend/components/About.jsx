import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'


function About() {

    function about() {
        const [aboutme, setAboutMe] = useState([])
       
       useEffect(()=>{
          axios.get("/api/user/getabout")
         .then((response) => {
            console.log(response)
           setAboutMe(response.data)
           
         }).catch((error)=>{
           console.log(error)
         })
         // <Navbar />
       },[])
    

    about();
  return (
    <div>
        about :
    </div>
  )
}

}
export default About