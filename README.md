# Real-Time Chat Application

This is a real-time chat application built with Django for the backend and React with TypeScript for the frontend.

## Features
- Real-time messaging with WebSockets
- User authentication and management
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites
- Docker
- Docker Compose

### Running the Application

1. Clone the repository:
    ```sh
    git clone https://github.com/mohamedibourki/chat-django.git
    cd chat-django
    ```

2. Start the application using Docker Compose:
    ```sh
    docker-compose up
    ```

3. Access the frontend at `http://localhost:5173` and the backend at `http://localhost:8000`.

4. for running backend please run this command:
    ```sh
    daphne -p 8000 app.asgi:application
    ```

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
