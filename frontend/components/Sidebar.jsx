import React from 'react';  
import './Sidebar.css';  

function Sidebar() {  
  return (  
    <div className="sidebar">  

      <ul className="sidebar-list">  
        <li>  
          <a href="/">  
            <i className="fas fa-home"></i> <span>Home</span>  
          </a>  
        </li>  
        <li>  
          <a href="/notes">  
            <i className="fas fa-book"></i> <span>Notes</span>  
          </a>  
        </li>  
        {/* <li>  
          <a href="#">  
            <i className="fas fa-tools"></i> <span>Engineering</span>  
          </a>  
        </li>  
        <li>  
          <a href="#">  
            <i className="fas fa-graduation-cap"></i> <span>MBA</span>  
          </a>  
        </li>  
        <li>  
          <a href="#">  
            <i className="fas fa-user"></i> <span>Your Videos</span>  
          </a>  
        </li>   */}
        <li>  
          <a href="/uploadVideo">  
            <i className="fas fa-user"></i> <span>Upload Videos</span>  
          </a>  
        </li>  
        <li>  
          <a href="/uploadNotes">  
            <i className="fas fa-user"></i> <span>Upload Notes</span>  
          </a>  
        </li>  
        {/* <li>  
          <a href="#">  
            <i className="fas fa-user"></i> <span>Your Notes</span>  
          </a>  
        </li>   */}
        {/* <li>  
          <a href="/about/about">  
            <i className="fas fa-user"></i> <span>Your Profile</span>  
          </a>  
        </li>   */}
        {/* Add more sidebar items as needed */}  
      </ul>  

      {/* User Profile - Remove image, use icon and text */}  
    
    </div>  
  );  
}  

export default Sidebar;