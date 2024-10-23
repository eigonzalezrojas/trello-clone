import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskItem from '../components/TaskItem';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const { boardId } = useParams();

  useEffect(() => {
    fetch(`/api/boards/${boardId}/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, [boardId]);

  return (
    <div>
      <h1>Tasks for Board {boardId}</h1>
      <div>
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
}

export default Tasks;