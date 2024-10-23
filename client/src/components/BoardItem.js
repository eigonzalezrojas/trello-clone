import React from 'react';
import { Link } from 'react-router-dom';

function BoardItem({ board }) {
  return (
    <div className="board-item">
      <h2>{board.name}</h2>
      <Link to={`/boards/${board.id}`}>View Board</Link>
    </div>
  );
}

export default BoardItem;