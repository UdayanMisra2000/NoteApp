import React, { useState, useEffect, useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './Body.css';
import Send from './Images/Send.png'
import myContext from '../MyContext'

export default function Body() {
  const { bodyid, profileColor } = useParams(); 
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const { setIsHidden } = useContext(myContext);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem(`notes-${bodyid}`)) || [];
    setNotes(savedNotes);
  }, [bodyid]);

  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  function handleAddNote() {
    if (newNote.trim() === '') return;

    const newEntry = {
      id: Date.now(),
      text: newNote,
      createdAt: new Date().toISOString(),
    };
    const updatedNotes = [...notes, newEntry];

    setNotes(updatedNotes);
    localStorage.setItem(`notes-${bodyid}`, JSON.stringify(updatedNotes));
    setNewNote('');
  }

  function getInitials(name) {
    return name
      .split(/\s+/)
      .map(word => word[0].toUpperCase())
      .join('')
      .slice(0, 2);
  }

  return (
    <>
        <div className="body-container">
            {/* only shows on mobile */}
        <div className="mobile-back-arrow">
          <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }} onClick={() => setIsHidden(false)}>
            ←
          </NavLink>
        </div>
        <div className="body-header">
        <div className="initials"
            style={{
                width: "3rem",
                height: "3rem",
                backgroundColor: [profileColor],
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                color: "white",
                margin: '0.75rem 1rem 0 1rem',
                fontSize: '1.5rem'
            }}
        >{getInitials(bodyid)}</div>
        <h1>{bodyid}</h1>
        </div>
        <div className="notes-list">
        {notes.map(note => (
        <div key={note.id} className="note-item">
            <p className="note-text">{note.text}</p>
            <div className="note-date">{formatDate(note.createdAt)}</div>
        </div>
        ))}
        <div className="note-input">
        <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Type a note..."
        />
            <button onClick={handleAddNote}><img src={Send} alt="➡️" /></button>
        </div>
    </div>
    </div>
    </>
  );
}
