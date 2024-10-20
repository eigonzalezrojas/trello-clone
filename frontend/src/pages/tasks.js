import { useState, useEffect } from 'react';

// Componente para mostrar una tarea individual
function Task({ task }) {
  return (
    <div className="border p-4 mb-4">
      <h2 className="text-xl font-semibold">{task.title}</h2>
      <p>{task.description}</p>
      <span className="text-sm">{task.status}</span>
    </div>
  );
}

// Componente principal para la página de tareas
export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  // Fetch para obtener las tareas
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lista de Tareas</h1>
      <div>
        {tasks.length === 0 ? (
          <p>No hay tareas disponibles</p>
        ) : (
          tasks.map(task => <Task key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}