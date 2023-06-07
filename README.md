# MERN Stack Notes App

This project is a simple web application built using the MERN stack to create and manage notes.

## Features

- User authentication: Sign up, login, and logout functionality.

- Create notes: Add new notes with a title and content.

- View notes: Display all the notes with their titles and content.

- Edit notes: Update the title or content of existing notes.

- Delete notes: Remove notes from the application.

## Technologies Used

- MongoDB: Document database for storing notes and user information.

- Express.js: Backend framework for building RESTful APIs.

- React.js: Frontend library for building user interfaces.

- Node.js: JavaScript runtime for running the server-side code.

- Mongoose: Object Data Modeling (ODM) library for MongoDB.

- Axios: Promise-based HTTP client for making API requests.

## Getting Started

### Prerequisites

- Node.js: Install Node.js from the official website - https://nodejs.org

- MongoDB: Set up a MongoDB database - either locally or using a cloud-based service like MongoDB Atlas.

### Installation

1. Clone the repository:

   ```shell

   git clone https://github.com/Mukesh-pilane/MernNotesApp.git

2. Navigate to the project directory:

  ```shell

  cd mern-stack-note-app

```

3. Install the dependencies:

```shell

  npm install

```

4. Set up environment variables:

- Create a .env file in the server directory.

- Add the following environment variables to the file:

```shell

  API_PORT=5000

  MONGODB_URI=<your-mongodb-uri>

  TOKEN_SECRET=<your-secret>

```

5. Start the server:

  ```shell 

  node server.js

 ```

6. Open a new terminal tab or window.

7. Navigate to the client directory:

```shell

cd ../client

```

8. Install the client dependencies:

```shell

npm install

```

9. Set up environment variables for client:

- Create a .env file in the server directory.

- Add the following environment variables to the file:

```shell

REACT_APP_BASE_URL=http://localhost:5000

```

10. Start the client:

```shell

npm start

```

11. Open your browser and access the application at http://localhost:3000.

### Live demo:

[Click here](https://mernnotesapp.onrender.com/) to visit the website.

