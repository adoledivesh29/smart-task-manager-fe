# Smart Task Manager Frontend

Frontend for a smart task manager built with React and Vite. The app handles authentication, protected routing, task management, profile updates, and password flows, while relying on a backend API for task scoring, categorization, and user management.

## Overview

This project provides:

- Public auth screens for sign in, sign up, and reset password
- Protected dashboard access based on an auth token stored in cookies
- Task creation, listing, completion toggle, and deletion
- Dashboard stats driven by task metadata from the backend
- Profile details and change-password flows from the header menu
- Shared form validation, API helpers, toast notifications, and reusable UI components

The current UI suggests AI-assisted task organization, but the actual categorization and difficulty scoring are backend-driven. The frontend simply renders the values returned by the API.

## Tech Stack

- React 18
- Vite 6
- React Router DOM 7
- React Query 3
- React Hook Form 7
- Axios
- Material UI
- Bootstrap
- Sass
- React Hot Toast

## Requirements

- Node.js `v22.16.0`
- npm

Node version is pinned in [.nvmrc](/d:/REACT/smart-task-manager-fe/.nvmrc:1).

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create or update your `.env` file in the project root:

```env
VITE_TOKEN_KEY='your_cookie_key_name'
VITE_API_ENDPOINT='https://your-api.example.com/api/v1/user'
```

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:5173`

For deployment, the app only requires `VITE_API_ENDPOINT` and `VITE_TOKEN_KEY`.

## Available Scripts

- `npm run dev` starts the Vite dev server on port `5173`
- `npm run build` creates a production build in `dist/`
- `npm run preview` serves the production build locally
- `npm run lint` runs ESLint

The build script uses Vite directly and outputs production assets to `dist/`.

## Application Flow

### Public Routes

- `/login`
- `/signup`
- `/reset-password/:token`

### Private Routes

- `/dashboard`

Private routes are guarded in [src/Routes/PrivateRoute.jsx](/d:/REACT/smart-task-manager-fe/src/Routes/PrivateRoute.jsx:1). If the auth cookie is missing, users are redirected to `/login`.

## API Expectations

The frontend expects these backend endpoints under the configured base URL:

### Auth

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/token`
- `POST /auth/password/reset`

### Tasks

- `GET /tasks`
- `GET /tasks/metadata`
- `POST /tasks`
- `POST /tasks/:id/toggle`
- `DELETE /tasks/:id`

### Profile

- `GET /profile`
- `PUT /profile/update`
- `POST /profile/logout`
- `POST /profile/change/password`

The login flow expects the backend to return the auth token in the `authorization` response header.

## Project Structure

```text
src/
  Assets/                 Static images, icons, and Sass files
  Common/
    Components/           Shared UI like header, modal, inputs, loader
    Constant/             App constants, API keys, validation rules
    Hooks/                Shared custom hooks
  Pages/
    Auth/                 Login, signup, reset password, auth hooks/queries
    Dashboard/            Dashboard UI, task hooks, and task API queries
  Routes/                 Route definitions and public/private guards
  Utils/                  Cookie helpers, toast helpers, formatting utilities
  axios.js                Shared Axios instance and interceptors
  App.jsx                 Query client setup and lazy route loading
  main.jsx                App bootstrap
```

## State, Data, and Auth Notes

- Server state is managed with React Query
- Forms are managed with React Hook Form
- Auth is cookie-based through helper functions in [src/Utils/helper.js](/d:/REACT/smart-task-manager-fe/src/Utils/helper.js:1)
- Axios automatically adds the auth token to outgoing requests
- `401` and `417` responses trigger logout behavior and redirect the user back to `/login`

## Styling

- Global styling is organized with Sass under `src/Assets/scss`
- Bootstrap is loaded globally
- Material UI is used for buttons, dialogs, spinners, and form-adjacent UI pieces

## Current Notes

- There is no automated test suite configured yet
- The repository contains a generated `dist/` folder
- Some shared constants and helpers are broader than the current task-manager scope, which suggests this project was adapted from a larger starter codebase

## Recommended Next Improvements

- Add automated tests for auth flows and task operations
- Add a committed `.env.example`
- Normalize password validation rules across login, signup, reset, and change-password screens
- Add route-level 404 handling instead of redirecting all unknown paths to `/dashboard`
- Review `vite.config.js` carefully before production use and keep only the build settings you intend to ship
