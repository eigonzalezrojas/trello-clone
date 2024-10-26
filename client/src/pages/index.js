import React, { useState, useEffect } from 'react';
import BoardItem from '../components/BoardItem';
import '../index.css';

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
        console.log('Enviando solicitud para crear el tablero...');
        const response = await fetch('http://localhost:5002/api/boards', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: boardName }),
        });
        if (response.ok) {
          const newBoard = await response.json();
          setBoards([...boards, newBoard]);
          setBoardName('');
          console.log('Tablero creado:', newBoard);
        } else {
          throw new Error('Error creating board');
        }
      } catch (error) {
        console.error('Error al crear el tablero:', error);
        setError('Error al crear el tablero.');
      }
    }
  };

  // Función para eliminar un tablero
  const handleDeleteBoard = async (boardId) => {
    if (window.confirm('¿Seguro que deseas eliminar este tablero?')) {
      try {
        await fetch(`http://localhost:5002/api/boards/${boardId}`, {
          method: 'DELETE',
        });
        setBoards(boards.filter(board => board.id !== boardId));
      } catch (error) {
        console.error('Error deleting board:', error);
      }
    }
  };

  // Función para editar el nombre de un tablero
  const handleEditBoard = async (boardId) => {
    const newName = prompt('Ingresa el nuevo nombre del tablero:');
    if (newName) {
      try {
        await fetch(`http://localhost:5002/api/boards/${boardId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newName }),
        });
        setBoards(boards.map(board => board.id === boardId ? { ...board, name: newName } : board));
      } catch (error) {
        console.error('Error editing board:', error);
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
      {loading ? (
        <p>Cargando tableros...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="boards-list">
          {boards.length > 0 ? (
            boards.map((board) => (
              <BoardItem
                key={board.id}
                board={board}
                onDelete={handleDeleteBoard}
                onEdit={handleEditBoard}
              />
            ))
          ) : (
            <p>No hay tableros disponibles. ¡Crea uno!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;