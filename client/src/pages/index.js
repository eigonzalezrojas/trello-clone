import React, { useState, useEffect } from 'react';
import BoardList from '../components/BoardListItem';
import '../index.css';

function Home() {
  const [boards, setBoards] = useState([]);
  const [boardName, setBoardName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTasksForBoard = async (boardId) => {
    try {
      const response = await fetch(`/api/boards/${boardId}/tasks`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error fetching tasks');
      }

      const tasks = await response.json();
      return tasks;
    } catch (error) {
      console.error(`Error loading tasks for board ${boardId}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const loadBoardsAndTasks = async () => {
      try {
        const boardsResponse = await fetch('/api/boards', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!boardsResponse.ok) {
          throw new Error('Error fetching boards');
        }

        const boardsData = await boardsResponse.json();

        // Cargar las tareas para cada tablero
        const boardsWithTasks = await Promise.all(
            boardsData.map(async (board) => {
              const tasks = await loadTasksForBoard(board.id);
              return {
                ...board,
                tasks: tasks,
              };
            })
        );

        setBoards(boardsWithTasks);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los tableros.');
        setLoading(false);
      }
    };

    loadBoardsAndTasks();
  }, []);

  const handleCreateBoard = async (e) =>  {
    e.preventDefault();
    if (boardName.trim()) {
      try {
        const response = await fetch('/api/boards', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: boardName }),
        });
        if (response.ok) {
          const newBoard = await response.json();
          setBoards([...boards, { ...newBoard, tasks: [] }]);
          setBoardName('');
        } else {
          throw new Error('Error creating board');
        }
      } catch (error) {
        setError('Error al crear el tablero.');
      }
    }
  };

  const handleDeleteBoard = async (boardId) => {
    if (window.confirm('¿Seguro que deseas eliminar este tablero?')) {
      try {
        await fetch(`/api/boards/${boardId}`, {
          method: 'DELETE',
        });
        setBoards(boards.filter((board) => board.id !== boardId));
      } catch (error) {
        console.error('Error deleting board:', error);
      }
    }
  };

  const handleEditBoard = async (boardId) => {
    const newName = prompt('Ingresa el nuevo nombre del tablero:');
    if (newName) {
      try {
        await fetch(`/api/boards/${boardId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newName }),
        });
        setBoards(
            boards.map((board) =>
                board.id === boardId ? { ...board, name: newName } : board
            )
        );
      } catch (error) {
        console.error('Error editing board:', error);
      }
    }
  };

  const onAddTask = (boardId, newTask) => {
    setBoards(prevBoards =>
        prevBoards.map(board =>
            board.id === boardId
                ? { ...board, tasks: [...board.tasks, newTask] }
                : board
        )
    );
  };

  const onMoveTask = async (taskId, destinationBoardId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/move`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetBoardId: destinationBoardId }),
      });

      if (!response.ok) {
        throw new Error('Error al mover la tarea');
      }

      const updatedTask = await response.json();

      // Actualizar el estado de los tableros
      setBoards((prevBoards) => {
        return prevBoards.map((board) => {
          // Si es el tablero de destino, agregar la tarea
          if (board.id === destinationBoardId) {
            return { ...board, tasks: [...board.tasks, updatedTask] };
          }
          // Si es el tablero de origen, eliminar la tarea
          if (board.tasks.some((task) => task.id === taskId)) {
            return { ...board, tasks: board.tasks.filter((task) => task.id !== taskId) };
          }
          return board;
        });
      });
    } catch (error) {
      console.error('Error en onMoveTask:', error);
    }
  };

  const handleTaskDeleted = async (taskId, boardId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
      }

      setBoards(prevBoards =>
          prevBoards.map(board => {
            if (board.id === boardId) {
              return {
                ...board,
                tasks: board.tasks.filter(task => task.id !== taskId)
              };
            }
            return board;
          })
      );
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      throw error;
    }
  };


  return (
      <div className="home-container">
        <h1>Bienvenid@ a Trello Clone</h1>
        <div className="board-creation-section">
          <form onSubmit={handleCreateBoard}>
            <input
                type="text"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                placeholder="Ingrese el nombre del tablero"
            />
            <button type="submit">Crear Tablero</button>
          </form>
        </div>
        {loading ? (
            <p>Cargando tableros...</p>
        ) : error ? (
            <p>{error}</p>
        ) : (
            <BoardList
                boards={boards}
                onEdit={handleEditBoard}
                onDelete={handleDeleteBoard}
                onMoveTask={onMoveTask}
                onAddTask={onAddTask}
                onTaskDeleted={handleTaskDeleted}
            />
        )}
      </div>
  );
}

export default Home;