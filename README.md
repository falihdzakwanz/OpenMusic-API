# Welcome to The OpenMusic-API Repository!
This project is a backend service for managing playlists and songs. It allows users to create playlists, add songs to playlists, and manage collaborations. Additionally, the service logs activities for adding and removing songs from playlists, providing an audit trail for user actions.

## Key Features
* **Playlist Management**: Create, update, and delete playlists.
* **Albums Management**: Add and remove songs from playlists.
* **Song Management**: Add and remove songs from playlists.
* **Collaborations**: Allow multiple users to collaborate on a single playlist.
* **Activity Logging**: Track and log activities such as adding and removing songs from playlists.
* **Authentication and Authorization**: Secure access to playlists and songs.

## Technologies Used
* [Node.js](https://nodejs.org/) : JavaScript runtime for building the backend service.
* [Hapi.js](https://hapi.dev/) : Framework for building web applications and backend services.
* [PostgreSQL](https://www.postgresql.org/) : Relational database for storing playlists, songs, users, and activity logs.
* [Node-postgres](https://node-postgres.com/) : PostgreSQL client for Node.js.
* [Nanoid](https://www.npmjs.com/package/nanoid) : Library for generating unique IDs.

## Getting Started
### Prerequisites
* **Node.js**: Ensure you have Node.js installed (version 18.0.0 or higher is recommended).
* **PostgreSQL**: Make sure PostgreSQL is installed and running.
* **Environment Variables**: Create a .env file based on the .env.example file and set the necessary environment variables.

### 1. Clone the repository:
    git clone https://github.com/falihdzakwanz/OpenMusic-API.git    
    cd OpenMusic-API    

### 2. Install dependencies:
    npm install    

### 3. Set up the database:
    Create a PostgreSQL database.
    npm run migrate up
    
### 4. Configure environment variables:
    Create a .env file based on the .env.example file.

### 5. Run the server:
    npm run start:dev

## Note
This project is part of a submission for the Dicoding Academy course “Belajar Fundamental Aplikasi Back-End.” 
Please do not reuse this project for your own submissions. It is intended for educational and open-source purposes only.
