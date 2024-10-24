import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Boards() {
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Añadir credenciales y cabeceras correctas
    fetch('http://localhost:5002/api/boards', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBoards(data);
      })
      .catch((error) => {
        console.error('Error fetching boards:', error);
        setError('Error al cargar los tableros.');
      });
  }, []);

  return (
    <div className="boards-container">
      <h1>Your Boards</h1>
      <div className="boards-list">
        {error ? (
          <p>{error}</p>
        ) : boards.length > 0 ? (
          boards.map((board) => (
            <Link key={board.id} to={`/boards/${board.id}/tasks`} className="board-card">
              <h2>{board.name}</h2>
            </Link>
          ))
        ) : (
          <p>No boards available. Create one!</p>
        )}
      </div>
    </div>
  );
}

export default Boards;