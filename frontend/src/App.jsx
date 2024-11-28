import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"
// import Register from '../components/Register.jsx'
// import Navbar from '../components/Navbar.jsx'
import Login from '../components/Login.jsx'
import Home from '../pages/Home.jsx'
import NavigationBar from '../components/NavigationBar.jsx'
import { Route, Routes } from 'react-router-dom'
import Register from '../components/Register.jsx'
import SingleVideo from '../components/SingleVideo.jsx'
import UploadVideo from '../components/UploadVideo.jsx'
import UploadPdf from '../components/UploadPdf.jsx'
import Notes from '../components/Notes.jsx'
import NoteDetails from '../components/NoteDetails.jsx'
import SearchResults from '../components/SearchResults.jsx'
import { SearchProvider } from '../components/Search.jsx'
import About from '../components/About.jsx'
// import PrivateRoute from '../pages/PrivateRoute.jsx'


function App() {
 

  return (
    <>
    
     <SearchProvider>
      <Routes>  
        <Route path="/register" element={<Register />} />  
      
        {/* <Route path="/" element={<PrivateRoute />} />    */}
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path='/:id' element={<SingleVideo />} />
        <Route path='/uploadVideo' element={<UploadVideo/>} />
        <Route path='/uploadNotes' element={<UploadPdf />}/>
        <Route path="/search" element={<SearchResults />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='notes/note/:id' element={<NoteDetails />}/>
        <Route path='/about/about' element={< About/>} />
      </Routes>
      </SearchProvider>  
    </>
  )
}

export default App
