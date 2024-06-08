# Vue Apollo Netflix Clone

- Vue Apollo Netflix Clone is an enhanced version of my [Vue Netflix Clone 1.0](https://github.com/ericcst197/vue-netflix-clone-1.0) project, introducing backend integration and user authentication to provide a more realistic experience.

## Quick Links

[Demo](#demo)

- [Live Site Demo](#live-site-demo)
- [Screenshots](#screenshots)

[Tech Stack](#tech-stack)

[Implementation Highlights](#implementation-highlights)

- [User Stories](#user-stories)
- [Movie Features](#movie-features)
- [Future Plans for Expansion](#plans-for-expansion)

[Getting Started](#getting-started)

- [Prerequisites](#prerequisites)

  - [Tools and Versions](#tools-and-versions)

- [Configuration File](#configuration-file)

  - [Backend](#backend)
  - [Frontend](#frontend)

- [Serving Application](#serving-application)

  - [Web Server](#web-server)
  - [Web Client](#web-client)

[Deployment](#deployment)

[Author](#author)

[Acknowledgments](#acknowledgments)

---

## Demo

### Live Site Demo

- Demo: [Link](https://vue-netflix-ericcst.vercel.app/)

You can sign up with any account you like or sign in with the demo account below:

- Demo Account (sign-in): demo1@example.com 

- Password: 1234Demo

### 📸 Screenshots <a id="screenshots"></a>

<div align="center">
  <p align="left">Home Page</p>
    <img src="./screenhots/1%20-%20homepage-1.png" alt="Logo" width="100%" height="100%">
    <img src="./screenhots/2%20-%20homepage-2.png" alt="Logo" width="100%" height="100%">
    <img src="./screenhots/3%20-%20homepage-3.png" alt="Logo" width="100%" height="100%">
  <p align="left">Register (Invalid Email)</p>
    <img src="./screenhots/4%20-%20register-invalid-email.png" alt="Logo" width="100%" height="100%">
  <p align="left">Register (Valid Email)</p>
    <img src="./screenhots/5%20-%20register-valid-email.png" alt="Logo" width="100%" height="100%">
  <p align="left">Register (Invalid password)</p>
    <img src="./screenhots/7%20-%20register-invalid-1.png" alt="Logo" width="100%" height="100%">
    <img src="./screenhots/8%20-%20register-invalid-2.png" alt="Logo" width="100%" height="100%">
  <p align="left">Register (Valid password)</p>
    <img src="./screenhots/9%20-%20register-valid.png" alt="Logo" width="100%" height="100%">
  <p align="left">Create multiple profiles in sign-up process</p>
    <img src="./screenhots/10%20-%20profiles-before.png" alt="Logo" width="100%" height="100%">
  <p align="left">Choose profiles</p>
    <img src="./screenhots/11%20-%20profiles-after.png" alt="Logo" width="100%" height="100%">
  <p align="left">Homepage</p>
    <img src="./screenhots/12%20-%20homepage-1.png" alt="Logo" width="100%" height="100%">
    <img src="./screenhots/13%20-%20homepage-2.png" alt="Logo" width="100%" height="100%">
  <p align="left">Movie Dialog</p>
    <img src="./screenhots/14%20-%20homepage%203%20movie%20dialog.png" alt="Logo" width="100%" height="100%">
  <p align="left">Bookmark movie</p>
    <img src="./screenhots/15%20-%20bookmark-1.png" alt="Logo" width="100%" height="100%">
    <img src="./screenhots/16%20-%20bookmark-2.png" alt="Logo" width="100%" height="100%">
  <p align="left">Change profile (no movie bookmarked in a different profile)</p>
    <img src="./screenhots/17%20-%20change%20profile-1.png" alt="Logo" width="100%" height="100%">
    <img src="./screenhots/18%20-%20change%20profile-2.png" alt="Logo" width="100%" height="100%">
  <p align="left">Edit profile name</p>
    <img src="./screenhots/19%20-%20edit profile%20name-1.png" alt="Logo" width="100%" height="100%">
    <img src="./screenhots/20%20-%20edit profile-2.png" alt="Logo" width="100%" height="100%">
</div>

## Tech Stack

- Frontend
  - [Vue](https://vuejs.org/) - A progressive JavaScript framework used for building user interfaces.
  - [Vue Router](https://router.vuejs.org/) - The official router for Vue.js, used to manage navigation and routing within the application.
  - [Pinia](https://pinia.vuejs.org/) - A state management library for Vue.js, serving as a modern alternative to Vuex.
  - [Vite](https://vitejs.dev/) - A fast development build tool that provides a lightning-fast development server with hot module replacement and optimized production builds.

- Backend
  - [Node.js](https://github.com/nodejs) JavaScript runtime for executing server-side code.
  - [Express.js](https://expressjs.com/) Used specifically for integrating Apollo Server with the Express middleware.
  - [Mongoose](https://mongoosejs.com/docs/) - Object Data Modeling (ODM) library for MongoDB and Node.js, providing a schema-based solution for managing application data.

- GraphQL
  - [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - Used to define the GraphQL schema, resolvers, and to serve the GraphQL API.
  - [Vue Apollo](https://apollo.vuejs.org/) - Integration of Apollo Client with Vue.js to manage GraphQL queries and mutations, providing reactive data handling and caching.

- API
  - [The Movie Database (TMDB)](https://developer.themoviedb.org/docs/getting-started) - Used to fetch movie details from The Movie Database.

- Tools and Libraries
  - [Headless UI (Vue)](https://headlessui.com/v1/vue) - A completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS.
  - [Youtube Player API](https://github.com/gajus/youtube-player) - YouTube iframe API abstraction.
  - [vueperslides](https://github.com/antoniandre/vueper-slides) - A touch ready and responsive slideshow / carousel for Vue 2 & 3.
  - [Prismic (Vue)](https://github.com/prismicio/prismic-vue) - Vue plugin, components, and composables to fetch and present Prismic content

---

## Implementation Highlights

- Single page application web client with Vue 3 Composition API setup script & Pinia
- Input validation during sign-in and registration processes
- Implemented user authentication using JWT (JSON Web Tokens) for sign-ups and sign-ins, with password encryption via bcrypt for enhanced security
- Implemented middleware to protect routes, ensuring users must be signed in to access certain features (E.g. '/browse')
- MongoDB for user's database
- The webpage adapts to any screen size. (Mobile, tablet, desktop)

### User Stories

- Users can register and log in to their account
- Users can create multiple profiles in their account
- Users can select and view details of a movie
- Users can add or remove movie to his/her bookmark in different profile
- Users can see the list of saved movies in My List page
- Users can update the profiles name through the manage profiles in the menu
- Users can logout and sign-in to the same account

### Movie Features

- Highlighted movie will play automatically after users sign in
- Users can mute/unmute the video
- Users can re-play the video after it ends
- Movie dialog displays movie details when users click on the movie card
- When a movie dialog is displayed, the highlighted movie will automatically pause. Once the dialog is closed, the highlighted movie will resume playing.

### Plans for Expansion

- **Search Functionality:** A searchbar to search through movies in TMDB database 
- **Movie feature:** Ability to play movies in full screen mode
- **Account feature:** Implementing a "Forgot Password" feature or update password
- **Account deletion:** Ability to delete their account

---

## Getting Started

### Prerequisites

  - If you don't have pnpm installed globally, you can install it using the following command:

    ```terminal
    npm install -g pnpm
    ```

  - For more detailed installation instructions and alternative methods, please visit the official [pnpm installation guide](https://pnpm.io/installation).

  - .env files is required for setting up environment variables for this project  

#### Tools and Versions

| Tools         | Versions |
| ------------- | -------- |
| pnpm          | 8.5.0    |
| nodejs        | 10.7.0   |


### Configuration File

#### Backend:

- Navigate to the `./backend` directory and create the .env file
- Modify MONGO_PASSWORD with the password for your MongoDB user and MONGODB_CONNECTION_STRING with the connection string provided by MongoDB.

  ```ENV
  NODE_ENV=development
  PORT=8080
  AUTH_TENANT_NAME=netflix-clone-auth
  APOLLO_GRAPHQL_SECRET=netflix-clone
  MONGODB_PASSWORD=
  MONGODB_CONNECTION_STRING=
  ```

#### Frontend:

- Navigate to the `./frontend` directory and create the .env file
- Modify VUE_APP_TMDB_API_KEY with the API key provided by your TMDB account.

  ```ENV
  VUE_APP_TMDB_API_KEY=
  VUE_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
  VUE_APP_AUTH_SERVER_BASE_URL=http://localhost:8080/auth
  VUE_APP_APOLLO_SERVER_BASE_URL=http://localhost:8080/graphql
  VUE_APP_APOLLO_SERVER_WS_URL=wss://localhost:8080/graphql
  VUE_APP_APOLLO_GRAPHQL_SECRET=netflix-clone
  ```

### Serving Application

#### Web Server

- install dependencies & start Web-Server

  ```terminal
  cd backend
  pnpm install
  pnpm dev
  ```

Application will be serving on :
  1. Authentication Endpoint: http://localhost:8080/auth
  2. GraphQL Endpoint: http://localhost:8080/graphql

#### Web Client

- install dependencies & start application

  ```terminal
  cd frontend
  pnpm install
  pnpm dev
  ```

Application will be serving on http://localhost:5173

---

## Deployment

- Not setup yet

---

## Author

- [Eric Choo](https://github.com/ericcst197)

---

## Acknowledgments

This project uses data from The Movie Database (TMDB) API. Full credit for the API data goes to TMDB.

Please feel free to create a pull request and submit any issues !

---
