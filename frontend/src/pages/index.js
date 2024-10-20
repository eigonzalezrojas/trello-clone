import { useEffect, useState } from 'react';
import WelcomeMessage from '../components/WelcomeMessage';

export default function HomePage() {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        // Solicitud al backend para obtener los tableros del usuario temporal
        fetch('/api/boards')
            .then(response => response.json())
            .then(data => setBoards(data));
    }, []);

    return (
        <div>
            <WelcomeMessage />
            {/* Aquí iría el resto de la lógica para mostrar los tableros */}
            {boards.map(board => (
                <div key={board.id}>{board.name}</div>
            ))}
        </div>
    );
}