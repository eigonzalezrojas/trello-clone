import React, { useState, useEffect } from 'react';
import BoardList from '../components/BoardListItem';
import '../index.css';

function Home() {
  const [boards, setBoards] = useState([]);
  const [boardName, setBoardName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (boardName.trim()) {
      try {
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
        } else {
          throw new Error('Error creating board');
        }
      } catch (error) {
        setError('Error al crear el tablero.');
      }
    }
  };

  const handleDeleteBoard = async (boardId) => {
    if (window.confirm('¿Seguro que deseas eliminar este tablero?')) {
      try {
        await fetch(`http://localhost:5002/api/boards/${boardId}`, {
          method: 'DELETE',
        });
        setBoards(boards.filter((board) => board.id !== boardId));
      } catch (error) {
        console.error('Error deleting board:', error);
      }
    }
  };

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
        setBoards(
            boards.map((board) =>
                board.id === boardId ? { ...board, name: newName } : board
            )
        );
      } catch (error) {
        console.error('Error editing board:', error);
      }
    }
  };

  const handleCreateTask = (boardId, taskData) => {
    // Lógica para agregar una tarea
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
            <BoardList
                boards={boards}
                onEdit={handleEditBoard}
                onDelete={handleDeleteBoard}
                onCreateTask={handleCreateTask}
            />
        )}
      </div>
  );
}

export default Home;