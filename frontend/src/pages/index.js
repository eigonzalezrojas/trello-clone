import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a la Aplicación Trello Clone</h1>
      <p className="mb-4">Utiliza los siguientes enlaces para navegar:</p>
      <ul className="list-disc ml-5">
        <li className="mb-2">
          <Link href="/boards" className="text-blue-500 underline">
            Ver Tableros
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/tasks" className="text-blue-500 underline">
            Ver Tareas
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/users" className="text-blue-500 underline">
            Ver Usuarios
          </Link>
        </li>
      </ul>
    </div>
  );
}