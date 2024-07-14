# Project README

## Overview

This project is a backend service built using Node.js and Express. It handles authentication and contact management with logging, error handling, and CORS support.

## Requirements

-   Node.js
-   npm (Node Package Manager)

## Dependencies

-   `express`: Fast, unopinionated, minimalist web framework for Node.js.
-   `morgan`: HTTP request logger middleware for Node.js.
-   `cors`: Express middleware to enable CORS.
-   `dotenv`: Module to load environment variables from a `.env` file.
-   `moment`: Parse, validate, manipulate, and display dates and times in JavaScript.
-   `fs/promises`: File system module with promises API.

## Installation

1. Clone the repository:

    ```sh
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```sh
    cd <project-directory>
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

4. Create a `.env` file in the root directory and add your environment variables.

## Scripts

-   `start`: Start the server in production mode.
-   `dev`: Start the server in development mode with nodemon.

## Usage

1. Start the server:

    ```sh
    npm run start
    ```

    Or for development:

    ```sh
    npm run dev
    ```

2. The server will be running on the port specified in the `.env` file or default to port `3000`.

## Routes

### Authentication

-   **POST** `/api/auth/register` - Register a new user.
-   **POST** `/api/auth/login` - Login a user.

### Contacts

-   **GET** `/api/contacts` - Get all contacts.
-   **POST** `/api/contacts` - Create a new contact.
-   **GET** `/api/contacts/:id` - Get a contact by ID.
-   **PUT** `/api/contacts/:id` - Update a contact by ID.
-   **DELETE** `/api/contacts/:id` - Delete a contact by ID.

## Middleware

### Logging

-   Logs all incoming requests with method, URL, and timestamp to `./public/server.log`.

### Error Handling

-   Handles 404 errors for undefined routes.
-   Centralized error handling middleware for other errors.

## Example .env File

```
PORT=3000
NODE_ENV=development
```

## Project Structure

```
├── node_modules
├── public
│   └── server.log
├── routes
│   └── api
│       ├── auth.js
│       └── contacts.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Author

-   #### Nazar Kobernyk

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

This README provides a basic overview of the project, its dependencies, usage, and structure. Adjust the content based on the specific details of your project and its requirements.
