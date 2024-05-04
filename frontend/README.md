# Setup Guide

This project leverages modern front-end technologies such as React, Styled Components, and Storybook, facilitated by Vite as the build tool.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (Preferably the latest LTS version)
- [Yarn](https://yarnpkg.com/) (This project uses Yarn as the package manager)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

- Obtain the repository URL and clone it using:
  ```bash
  git clone https://github.com/m0hammadr3za/full-stack-wallpaper-app.git
  ```
- Navigate into the project directory:
  ```bash
  cd wallpapers-app
  ```

2. **Install dependencies**:

- Run the following command to install the required packages:
  ```bash
  yarn install
  ```

## Running the Project

After installing the dependencies, you can utilize several commands to develop and build the project:

- **Start the development server**:

  ```bash
  yarn dev
  ```

  This command will launch the Vite development server, allowing you to view and test the application in a local web browser.

- **Build the project**:

  ```bash
  yarn build
  ```

  Use this to compile TypeScript files and build the static assets for production deployment.

- **Preview the production build**:
  ```bash
  yarn preview
  ```
  This serves the production build locally for preview purposes.

## Storybook

To develop and review UI components in isolation using Storybook:

- **Run Storybook**:

  ```bash
  yarn storybook
  ```

  This will start the Storybook environment, which is accessible via a local web browser.

- **Build static Storybook files**:
  ```bash
  yarn build-storybook
  ```
  This command builds a static version of Storybook, which can be deployed or hosted.

## Additional Commands

- **Lint the project**:
  ```bash
  yarn lint
  ```
  This will run ESLint on your codebase to identify and report patterns found in ECMAScript/JavaScript code.

## Notes

Ensure that your development environment is compatible with the project's setup, especially versions of Node.js and Yarn. If you encounter issues related to version compatibility, consider using tools like [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions.
