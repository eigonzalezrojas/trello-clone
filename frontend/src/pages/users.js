import { useState, useEffect } from 'react';

// Componente para mostrar un usuario individual
function User({ user }) {
  return (
    <div className="border p-4 mb-4">
      <h2 className="text-xl font-semibold">{user.username}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Componente principal para la página de usuarios
export default function UsersPage() {
  const [users, setUsers] = useState([]);

  // Fetch para obtener los usuarios
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      <div>
        {users.length === 0 ? (
          <p>No hay usuarios disponibles</p>
        ) : (
          users.map((user) => <User key={user.id} user={user} />)
        )}
      </div>
    </div>
  );
}