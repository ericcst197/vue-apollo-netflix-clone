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

Homepage
![1 - homepage-1](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/22921c07-c5a9-4bee-8ea7-30bba41fc588)

![2 - homepage-2](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/bd400ab1-0c89-48c8-b1dd-e1ab734ea2c6)

![3 - homepage-3](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/f2d06068-a10b-4bd4-b0e0-da21157c3636)

Register (Invalid Email)
![4- register-invalid-email](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/1b9dff3a-ff89-4e91-984b-17c76b4eb4f7)

Register (Valid Email)
![5 - register-valid-email](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/70bb3872-7461-4cd3-8b91-6cf3133b97ee)

Register (Invalid password)
![7- register-invalid-1](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/8f18b8f3-bf3d-4da5-8eb6-d2222c267029)

![8 - register-invalid-2](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/61e49231-f592-454d-8a56-54d9fdd3d4e8)

Register (Valid password)
![9 - register-valid](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/6d4cfbe5-9fcc-48c9-afc2-f320511c8a05)

Create multiple profiles in sign-up process
![10 - profiles-before](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/18f985ec-4b18-48fe-a26b-67c86d279ebd)

Choose profiles
![11 - profiles-after](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/59016b24-4dc9-4ff4-bdf1-97bc9ca87675)

Homepage
![12 - homepage-1](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/e67cb80b-c4d4-4583-8ff6-2ccabe23f60e)

![14 - homepage -2](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/2d77cadf-1619-4bd3-8da9-2a392fa4acd6)

Movie Dialog
![15 - homepage 3 movie dialog](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/e093a2ec-4f3f-42f5-860a-de53e56bac30)

Bookmark movie
![16 - bookmark-1](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/418bafff-d05a-4563-adb4-4c7fae3b5cac)

![17 - bookmark-2](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/294718fa-74e8-4789-a4bb-95557c9e190d)

Change profile (no movie bookmarked in a different profile)
![18 - change profile (1)](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/807771ab-f60e-4a78-8df7-08ac3b13c879)

![19 - change profile (2)](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/6caa03b0-b19d-4907-bf36-066ef70b328c)

Edit profile name
![20 - edit profile name - 1](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/563617bf-6387-4d26-b41b-a5e363385840)

![21 - edit profile - 2](https://github.com/ericcst197/vue-apollo-netflix-clone/assets/90197574/188c02e5-9e63-433b-94cc-6702898d23a4)

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
