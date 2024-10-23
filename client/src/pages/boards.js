import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Boards() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch('/api/boards')
      .then((response) => response.json())
      .then((data) => setBoards(data))
      .catch((error) => console.error('Error fetching boards:', error));
  }, []);

  return (
    <div className="boards-container">
      <h1>Your Boards</h1>
      <div className="boards-list">
        {boards.length > 0 ? (
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