import React, { useState, useEffect } from 'react';
import BoardItem from '../components/BoardItem';

function Boards() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch('/api/boards')
      .then((response) => response.json())
      .then((data) => setBoards(data))
      .catch((error) => console.error('Error fetching boards:', error));
  }, []);

  return (
    <div>
      <h1>Boards</h1>
      <div>
        {boards.length > 0 ? (
          boards.map((board) => <BoardItem key={board.id} board={board} />)
        ) : (
          <p>No boards available.</p>
        )}
      </div>
    </div>
  );
}

export default Boards;