import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [boards, setBoards] = useState([]);
  const [boardName, setBoardName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar los tableros existentes
  useEffect(() => {
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
          throw new Error('Error fetching boards');
        }
        return response.json();
      })
      .then((data) => {
        setBoards(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error al cargar los tableros.');
        setLoading(false);
      });
  }, []);

  // Crear un nuevo tablero
  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (boardName.trim()) {
      try {
        const response = await fetch('http://localhost:5002/api/boards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: boardName }),
        });
        if (response.ok) {
          const newBoard = await response.json();
          setBoards([...boards, newBoard]); // Añadir el nuevo tablero a la lista
          setBoardName('');
        } else {
          throw new Error('Error creating board');
        }
      } catch (error) {
        setError('Error al crear el tablero.');
      }
    }
  };

  return (
    <div className="home-container">
      <h1>Bienvenid@ a Trello Clone</h1>

      <div className="board-creation-section">
        <form onSubmit={handleCreateBoard}>
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Ingrese el nombre del tablero"
          />
          <button type="submit">Crear Tablero</button>
        </form>
      </div>

      <h2>Tableros existentes</h2>
      {loading ? (
        <p>Cargando tableros...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="boards-list">
          {boards.length > 0 ? (
            boards.map((board) => (
              <Link key={board.id} to={`/boards/${board.id}/tasks`} className="board-card">
                <h2>{board.name}</h2>
              </Link>
            ))
          ) : (
            <p>No hay tableros disponibles. Crea uno!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;