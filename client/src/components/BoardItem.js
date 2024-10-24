import React, { useState } from 'react';

function BoardItem({ board, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className="board-item">
      <h2>{board.name}</h2>
      
      {/* Botón de tres puntos */}
      <div className="board-options">
        <button onClick={toggleMenu}>...</button>
        {showMenu && (
          <div className="board-menu">
            <button onClick={() => onEdit(board.id)}>Editar</button>
            <button onClick={() => onDelete(board.id)}>Eliminar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoardItem;