# Welcome to The OpenMusic-API Repository!
This project is a backend service for managing playlists and songs. It allows users to create playlists, add songs to playlists, and manage collaborations. Additionally, the service logs activities for adding and removing songs from playlists, providing an audit trail for user actions.

## Key Features
* **Playlist Management**: Create, update, and delete playlists.
* **Albums Management**: Create, update, and delete albums.
* **Song Management**: Add and remove songs.
* **Collaborations**: Allow multiple users to collaborate on a single playlist.
* **Activity Logging**: Track and log activities such as adding and removing songs from playlists.
* **Authentication and Authorization**: Secure access to playlists and songs.
* **Export Playlist Songs**: Export songs from a playlist and send them via email.
* **Upload Album Cover**: Upload album cover images.
* **Like Albums**: Like, unlike, and view the number of likes for an album.
* **Server-Side Caching**: Cache the number of likes for an album.

## Technologies Used
* [Node.js](https://nodejs.org/) : JavaScript runtime for building the backend service.
* [Hapi.js](https://hapi.dev/) : Framework for building web applications and backend services.
* [PostgreSQL](https://www.postgresql.org/) : Relational database for storing playlists, songs, users, and activity logs.
* [Node-postgres](https://node-postgres.com/) : PostgreSQL client for Node.js.
* [RabbitMQ](https://www.rabbitmq.com/) : Message broker for handling background tasks.
* [Mailtrap](https://mailtrap.io/) : Service for testing email sending.
* [Redis](https://redis.io/) : In-memory data structure store for caching.
* [JWT](https://jwt.io/libraries) : JSON Web Tokens for secure information exchange.
* [Joi](https://www.npmjs.com/package/joi) : Library for data validation.
* [Nanoid](https://www.npmjs.com/package/nanoid) : Library for generating unique IDs.
* [Bcrypt](https://www.npmjs.com/package/bcrypt) : Library for hashing passwords.
* [Nodemailer](https://www.npmjs.com/package/nodemailer) : Library for sending emails.

## Getting Started
### Prerequisites
* **Node.js**: Ensure you have Node.js installed (version 14.7.0 or higher is recommended).
* **PostgreSQL**: Make sure PostgreSQL is installed and running.
* **RabbitMQ**: Ensure RabbitMQ is installed and running.
* **Redis**: Ensure Redis is installed and running.
* **Mailtrap**: Set up a Mailtrap account for testing email sending.
* **Environment Variables**: Create a .env file based on the .env.example file and set the necessary environment variables.

### 1. Clone the repository:
    git clone https://github.com/falihdzakwanz/OpenMusic-API.git    
    cd OpenMusic-API    

### 2. Install dependencies:
    npm install    

### 3. Set up the database:
  - Create a PostgreSQL database.
  - Run the command below.
    ```sh
    npm run migrate up
    ```
    
### 4. Configure environment variables:
  - Create a .env file based on the .env.example file.
  - Set the necessary environment variables for database connection and other configurations.

### 5. Run the server:
    npm run start:dev

### 6. Set up the consumer program:
  * [Consumer Program](https://github.com/falihdzakwanz/OpenMusic-API-Consumer.git)

## Note
This project is part of a submission for the Dicoding Academy course “Belajar Fundamental Aplikasi Back-End.” 
Please do not reuse this project for your own submissions. It is intended for educational and open-source purposes only.
