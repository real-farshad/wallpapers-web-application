# Wallpapers Web Application

Live demo: [wallpapers-web-application.vercel.app](https://wallpapers-web-application.vercel.app)

A full-stack web application about desktop wallpapers. Users can browse the latest wallpapers or look through popular ones to find their favorites. There are also categories and collections for similar wallpapers. This project was a fun experience and I made it using modern technologies, with user experience on top of the list of priorities while writing clean code and following clean architecture principles.

## Key Features

- User authentication (Local + Google OAuth)
- Social interaction features(Like, save, download and comment)
- Infinite scroll with Intersection Observer API and custom React hooks
- Dynamic URL routing for overlay-to-page transitions
- Unit & integration testing(Test Driven Development) in the backend
- State management with react context API
- Wallpaper Collections
- Clean architecture in backend
- Multi-page navigation with React Router
- Wallpaper search and filtering system
- Session management
- Responsive mobile friendly design
- MongoDB aggregation pipeline
- CRUD operations in the backend

## Technologies

**Frontend:**

- React
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

**DevOps:**

- GitHub Actions (CI/CD)

## Installation

1. Clone repository
2. Install dependencies: `npm run install-all`
3. Use `.env.example` to create a `.env` files in root and client directories
4. Populate database: `npm run populate-database`
5. Start development: `npm run dev`

## Development Commands

- `npm run dev`: Concurrent server/client development
- `npm run test-server`: Run backend tests
- `npm run build`: Create production build
- `npm start`: Launch production server

## Deployment

The CI/CD pipeline is configured through GitHub Actions (`.github/workflows/main.yml`), implementing:

- Automated testing on push
- Build verification

Access via:

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## Screenshots

![Feature 1 Demo](public/screenshots/1.jpg)

![Feature 1 Demo](public/screenshots/2.jpg)

![Feature 1 Demo](public/screenshots/3.jpg)
