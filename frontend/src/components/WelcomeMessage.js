import { useState, useEffect } from 'react';

const WelcomeMessage = () => {
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowMessage(false), 10000);
        return () => clearTimeout(timer);
    }, []);

    if (!showMessage) return null;

    return (
        <div className="welcome-message">
            <h2>Welcome to the Trello-clone Demo!</h2>
            <p>⚠️ This is a demo version. All boards and tasks are temporary and will be deleted once you end the session. Feel free to explore!</p>
        </div>
    );
};

export default WelcomeMessage;