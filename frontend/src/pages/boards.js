import { useState, useEffect } from 'react';

// Componente para mostrar un tablero individual
function Board({ board }) {
  return (
    <div className="border p-4 mb-4">
      <h2 className="text-xl font-semibold">{board.name}</h2>
      <span className="text-sm">ID del propietario: {board.owner_id}</span>
    </div>
  );
}

// Componente principal para la página de tableros
export default function BoardsPage() {
  const [boards, setBoards] = useState([]);

  // Fetch para obtener los tableros
  const fetchBoards = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/boards');
      const data = await response.json();
      setBoards(data);
    } catch (error) {
      console.error('Error al obtener los tableros:', error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Tableros</h1>
      <div>
        {boards.length === 0 ? (
          <p>No hay tableros disponibles</p>
        ) : (
          boards.map((board) => <Board key={board.id} board={board} />)
        )}
      </div>
    </div>
  );
}