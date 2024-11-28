import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './NoteDetails.css';

function NoteDetails() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/pdf/${id}`)
      .then((response) => {
        setNote(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching note details:', error);
        setError('Failed to fetch note details');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!note) {
    return <div className="error">Note not found</div>;
  }

  return (
    <div className="note-details-container">
      <h1>{note.title}</h1>
      <p>{note.description}</p>
      <p>Owner: {note.owner}</p>
      <a href={note.pdfFile} target="_blank" rel="noopener noreferrer">View PDF</a>
    </div>
  );
}

export default NoteDetails;