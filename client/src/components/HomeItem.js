import React, { useState, useEffect } from 'react';
import BoardItem from '../components/BoardItem';

const Home = () => {
  const [boardName, setBoardName] = useState('');
  const [boards, setBoards] = useState([]); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);


  // Obtener tableros existentes
  useEffect(() => {
    fetch('/api/boards')
      .then((response) => response.json())
      .then((data) => {
        setBoards(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching boards:', error);
        setError('Error al cargar los tableros.');
        setLoading(false);
      });
  }, []);

  // Función para crear un nuevo tablero
  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (boardName.trim()) {
      try {
        const response = await fetch('/api/boards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: boardName }),
        });
        const data = await response.json();
        
        if (response.ok) {
          console.log('Board created:', data);
          setBoardName('');
          setBoards([...boards, data]);
        } else {
          console.error('Error creating board:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Mostrar los tableros
  const renderBoards = () => {
    if (loading) {
      return <p>Cargando tableros...</p>;
    }
    if (error) {
      return <p>{error}</p>;
    }
    if (boards.length === 0) {
      return <p>No hay tableros disponibles.</p>;
    }
    return (
      <div className="boards-section">
        {boards.map((board) => (
          <BoardItem key={board.id} board={board} />
        ))}
      </div>
    );
  };

  return (
    <div className="home-container">
      <h1>Bienvenido a tu Trello Clone</h1>
      <div className="board-creation-section">
        <form onSubmit={handleCreateBoard}>
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Ingrese el nombre del tablero"
          />
          <button type="submit">Crear</button>
        </form>
      </div>     
      {renderBoards()}
    </div>
  );
};

export default Home;