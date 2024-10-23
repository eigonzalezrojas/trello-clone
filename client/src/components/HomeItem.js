import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardItem from '../components/BoardItem';

const Home = () => {
  const [boardName, setBoardName] = useState('');
  const [boards, setBoards] = useState([]);  // Estado para almacenar los tableros existentes
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);  // Estado de carga
  const navigate = useNavigate();

  // Obtener tableros existentes cuando se carga el componente
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
        const textResponse = await response.text();  // Obtén la respuesta como texto
        console.log('Raw response:', textResponse);   // Imprime la respuesta cruda
        
        const data = JSON.parse(textResponse);        // Intenta convertirlo en JSON
        
        if (response.ok) {
          console.log('Board created:', data);
          setBoardName('');  // Limpiar campo de entrada
          navigate('/boards');  // Redirigir usando useNavigate
        } else {
          console.error('Error creating board:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Mostrar los tableros o un mensaje de carga/error
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
          <button type="submit">Crear Tablero</button>
        </form>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate('/boards')}>Ver todos los tableros</button>
      </div>

      <h2>Tableros existentes</h2>
      {renderBoards()}
    </div>
  );
};

export default Home;