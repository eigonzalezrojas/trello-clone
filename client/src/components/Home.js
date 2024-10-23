import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home = ({ createBoard }) => {
  const [boardName, setBoardName] = useState('');
  const history = useHistory();

  // Function to handle the form submission for creating a new board
  const handleCreateBoard = (e) => {
    e.preventDefault();
    if (boardName.trim()) {
      createBoard(boardName);
      setBoardName('');
    }
  };

  // Function to navigate to the boards page
  const navigateToBoards = () => {
    history.push('/boards');
  };

  return (
    <div className="home-container">
      <h1>Welcome to Your Trello Clone</h1>
      <div className="board-creation-section">
        <form onSubmit={handleCreateBoard}>
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Enter board name"
          />
          <button type="submit">Create Board</button>
        </form>
      </div>

      <div className="action-buttons">
        <button onClick={navigateToBoards}>View All Boards</button>
      </div>
    </div>
  );
};

export default Home;