import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/index';
import Boards from './pages/boards';
import Tasks from './pages/tasks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/boards/:boardId/tasks" element={<Tasks />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;