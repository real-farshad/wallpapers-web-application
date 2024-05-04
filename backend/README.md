# Setup Guide

This is a Node.js application using Express, MongoDB, and Passport for authentication.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (Preferably the latest LTS version)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (This guide uses npm in the commands)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

   - Obtain the repository URL and clone it using:

     ```bash
     git clone https://github.com/m0hammadr3za/full-stack-wallpaper-app.git
     ```

   - Navigate into the project directory:

     ```bash
     cd backend
     ```

2. **Install dependencies**:

   - Run the following command to install the required packages:

     ```bash
     npm install
     ```

## Running the Project

After installing the dependencies, you can utilize several commands to develop and build the project:

- **Start the development server**:

  ```bash
  npm run dev
  ```

  This command will start the TypeScript watcher and launch the application using ts-node, recompiling and restarting on file changes.

- **Build the project**:

  ```bash
  npm run build
  ```

  Compiles the TypeScript files to JavaScript in the dist directory and resolves any TypeScript path aliases.

- **Start the production server**:
  ```bash
  npm start
  ```
  Runs the built JavaScript code in the dist directory.

## Technologies Used

- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Passport**: Authentication middleware for Node.js.
- **Joi**: Library for schema description and data validation.
- **Bcryptjs**: Library for hashing and salting user passwords.
- **dotenv**: Module to load environment variables from a .env file into `process.env`.

## Additional Commands

- **Linting and Formatting**: Currently not configured. Consider setting up ESLint and Prettier for TypeScript.

## Notes

Ensure that you create a `.env` file in the root of your project directory to store sensitive and environment-specific configurations, such as database connection strings and external API keys.

## License

This project is licensed under the MIT license.
