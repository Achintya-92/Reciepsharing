# RecipeSharing

RecipeSharing is a React + Vite recipe-sharing application with a Node/Express backend. It enables users to register, log in, publish recipes with images, leave reviews, and manage their own recipe collection.

## Features

- User registration and login flows
- Add recipe posts with image upload, title, ingredients, instructions, cuisine, and preparation time
- Browse published recipes on the home page
- Leave reviews on recipe cards
- View, update, and delete recipes created by the logged-in user
- Responsive Bootstrap UI with React Router navigation

## Tech Stack

- Frontend: React, Vite, React Router, Bootstrap
- Backend: Express, MongoDB, Mongoose, JWT authentication, Multer image upload
- Local API endpoint: `http://localhost:5000`

## Project Structure

- `reciep-sharing-app/` — frontend application
- `reciepBackend/` — backend API server

## Prerequisites

- Node.js and npm
- MongoDB running locally at `mongodb://127.0.0.1:27017/RecioeSharing`

## Setup

### Backend

```bash
cd d:/apco/React_app_proj/Reciepsharing/reciepBackend
npm install
```

Create a `.env` file in `reciepBackend/` with the following value:

```env
JWT_SECRET=your_jwt_secret_here
```

Start the backend server:

```bash
node server.cjs
```

### Frontend

```bash
cd d:/apco/React_app_proj/Reciepsharing/reciep-sharing-app
npm install
npm run dev
```

Open the app in the browser at the URL displayed by Vite (usually `http://localhost:5173`).

## Usage

1. Visit the Signup page to create a new account.
2. Log in with your registered email and password.
3. Add recipes with image upload, ingredients, instructions, and cuisine details.
4. Browse recipes from the home page.
5. Leave reviews on recipes using the review dropdown.
6. Manage your uploaded recipes from your user account page.

## API Endpoints

- `POST /signup` — register a user
- `POST /login` — authenticate user and receive JWT
- `POST /api/recipe/add` — create a new recipe (JWT required)
- `GET /api/recipe/home/retrieve` — fetch all recipes
- `GET /api/recipe/retrieve/:recipeId` — fetch a single recipe
- `GET /api/recipe/author/:userId` — fetch recipes by author
- `PUT /api/recipe/update/:recipeId` — update a recipe
- `DELETE /api/recipe/delete/:recipeId` — delete a recipe
- `POST /api/recipe/review/:recipeId` — submit a review
- `GET /api/recipe/retrieve/review/:recipeId` — list reviews

## Notes

- Frontend expects the backend server to be running at `http://localhost:5000`.
- Image uploads are stored in `reciepBackend/uploads`.
- JWT tokens are saved in `localStorage` after login.
- The frontend includes a `deploy` script for GitHub Pages.

## Deployment

```bash
npm run build
npm run deploy
```

Enjoy using RecipeSharing! 🍲
