# Full-Stack Wallpapers Web Application

Live demo: [full-stack-wallpapers-app.herokuapp.com](https://full-stack-wallpapers-app.herokuapp.com)<br>
Tech stack for front-end: typescript, react react router, context, sass<br>
Tech stack for back-end: javascript, node.js, express, mongodb-nodejs-driver, passport, express-session, joi, bcrypt, dotenv

Front-end is a responsive mobile first react application. I used context for global state and sass and css variables for styling.

Inspired by clean architecture, different essential parts of the back-end are completely independent from each other. This helps with testability and maintainability. Also I used passport for user authentication. Users can sign-in via local form or google oauth2.

For optimizing queries, I took advantage of mongodb's aggregation pipeline.
