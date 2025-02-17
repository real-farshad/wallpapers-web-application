# Wallpapers Web Application

A full-stack wallpaper web application with user authentication and advanced search capabilities. Features multi-page navigation and comprehensive testing.

## Key Features

- User authentication (Local + Google OAuth)
- Multi-page navigation with React Router
- Wallpaper search and filtering system
- User collections/favorites
- Session management
- Backend unit & integration testing
- Responsive image gallery

## Technologies

**Frontend:**

- React 19
- React Router
- TypeScript
- Sass

**Backend:**

- Express.js
- MongoDB Native Driver
- Passport.js (Authentication)
- Bcrypt (Password hashing)
- Joi (Validation)

**Database:**

- MongoDB

**Testing:**

- Jest
- Supertest

## Installation

1. Clone repository
2. Install dependencies: `npm run install-all`
3. Use `.env` to create a `.env` file
4. Populate database: `npm run populate-database`
5. Start development: `npm run dev`

## Development Commands

- `npm run dev`: Concurrent server/client development
- `npm run test-server`: Run backend tests
- `npm run build`: Create production build
- `npm start`: Launch production server

Access via:

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## Screenshots

![Feature 1 Demo](public/screenshots/1.jpg)

![Feature 1 Demo](public/screenshots/2.jpg)

![Feature 1 Demo](public/screenshots/3.jpg)
