# Trello Clone

This project is a Trello clone built for my portfolio. It utilizes a modern tech stack including Docker, PostgreSQL, Express.js, Node.js, and React.js with Material-UI. The application consists of three containers: `db`, `client`, and `server`.

## Features

- Create, edit, and delete boards and tasks.
- Drag and drop functionality for tasks between boards.
- Real-time updates for task status (pending/finished).
- Responsive design using Material-UI.

## Tech Stack

- **Frontend:** React.js, Material-UI
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose

## Getting Started

### Prerequisites

- Docker
- Docker Compose

# Trello Clone

This project is a Trello clone built for my portfolio. It utilizes a modern tech stack including Docker, PostgreSQL, Express.js, Node.js, and React.js with Material-UI. The application consists of three containers: `db`, `client`, and `server`.

## Features

- Create, edit, and delete boards and tasks.
- Drag and drop functionality for tasks between boards.
- Real-time updates for task status (pending/finished).
- Responsive design using Material-UI.

## Tech Stack

- **Frontend:** React.js, Material-UI
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/eigonzalezrojas/trello-clone.git
   
2. Create a `.env` file in the root directory with the following variables:

    ```env
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    ```
3. Start the application using Docker Compose:

    ```bash
    docker-compose up --build