import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/notes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(response.data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/notes', { content: newNote }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes([...notes, response.data]);
      setNewNote('');
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Notes</h1>
          <div>
            <button className="px-4 py-2 text-blue-600">Login</button>
            <button className="px-4 py-2 text-blue-600">Signup</button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div key={note._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Note</h2>
              <p className="mt-2">{note.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold">Create New Note</h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            <textarea
              className="w-full p-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              rows="5"
              placeholder="Write your note here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            ></textarea>
            <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Submit</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;