import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    yearOfPublishing: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'yearOfPublishing' ? parseInt(value || 0) : value;
    setForm({ ...form, [name]: updatedValue });
  };

  const handleAddOrUpdate = async () => {
    if (!form.title || !form.author || !form.genre || !form.yearOfPublishing) {
      alert("Please fill all fields!");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/books/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/books", form);
      }
      setForm({ title: '', author: '', genre: '', yearOfPublishing: '' });
      fetchBooks();
    } catch (error) {
      console.error("❌ Error submitting form:", error.message);
    }
  };

  const handleEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      yearOfPublishing: book.yearOfPublishing,
    });
    setEditingId(book._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>
        <span role="img" aria-label="book">📚</span> BookVault
      </h1>

      <div style={formContainerStyle}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="yearOfPublishing"
          placeholder="Year"
          type="number"
          value={form.yearOfPublishing}
          onChange={handleChange}
          style={inputStyle}
        />
        <button
          onClick={handleAddOrUpdate}
          style={{ ...buttonStyle, backgroundColor: '#1976d2' }}
        >
          {editingId ? "Update Book" : "Add Book"}
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {books.map(book => (
          <li key={book._id} style={listItemStyle}>
            <span style={{ flexGrow: 1 }}>
              <strong>{book.title}</strong> by {book.author} ({book.yearOfPublishing}) [{book.genre}]
            </span>
            <button
              onClick={() => handleEdit(book)}
              style={{ ...buttonStyle, backgroundColor: '#ff9800' }}
            >
              ✏️
            </button>
            <button
              onClick={() => handleDelete(book._id)}
              style={{ ...buttonStyle, backgroundColor: '#f44336' }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 💅 Styles
const containerStyle = {
  maxWidth: '700px',
  margin: '30px auto',
  padding: '20px',
  background: '#fff',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  fontFamily: 'Segoe UI, sans-serif'
};

const headingStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: '#333'
};

const formContainerStyle = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
  marginBottom: '20px'
};

const inputStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  flex: '1 1 150px'
};

const buttonStyle = {
  padding: '10px 15px',
  border: 'none',
  color: 'white',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background 0.2s ease-in-out'
};

const listItemStyle = {
  padding: '12px',
  backgroundColor: '#f0f0f0',
  marginBottom: '10px',
  borderRadius: '6px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

export default App;
