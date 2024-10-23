import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Boards from './pages/boards';
import Tasks from './pages/tasks';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/boards" element={<Boards />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;