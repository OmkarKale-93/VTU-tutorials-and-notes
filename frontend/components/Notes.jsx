import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notes.css'; // Make sure to create and style this CSS file
import { Link } from 'react-router-dom';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/pdf") // Adjust the endpoint if necessary
      .then((response) => {
        console.log(response.data.pdfs)
        setNotes(response.data.pdfs);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
        setError('Failed to fetch notes');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="notes-container">
      <center><h1>Notes</h1> </center>
      <ul className='notes'>  
        {notes.map(note => (  
          <li key={note._id} className='each-note'>  
            <Link to={`note/${note._id}`}>  
              <div className='note-thumbnail'>
                {/* Replace with appropriate PDF preview or placeholder */}
                <img src="../public/icon.png" alt="PDF icon" className='thumbnail'/>  
              </div>
              <h3>{note.title}</h3>
              <p>{note.owner}</p>
            </Link>  
          </li>  
        ))}  
      </ul> 
    </div>
  );
}

export default Notes;