import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeItem from './components/HomeItem';
import Boards from './pages/boards';
import Tasks from './pages/tasks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/boards/:boardId/tasks" element={<Tasks />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/" element={<HomeItem />} />
      </Routes>
    </Router>
  );
}

export default App;