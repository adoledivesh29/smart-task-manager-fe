# Smart Task Manager Frontend 🚀

AI-assisted task management frontend built with **React + Vite** featuring authentication, protected routes, AI-enriched task metadata, dynamic category-based UI styling, and responsive dashboard management.

This application consumes a Node.js + MongoDB backend and renders intelligent task insights such as difficulty score, category color, and icon metadata generated through AI processing.

---

# ✨ Features

## Authentication System

- User registration and login
- Protected route handling
- Cookie-based authentication
- Password reset support
- Persistent auth sessions

## Task Management

- Create tasks
- Complete/uncomplete tasks
- Delete tasks
- AI-generated task categorization
- Difficulty scoring visualization
- Dynamic category-based styling

## AI-Enriched Dashboard

Each task can include:

- AI category classification
- Difficulty score
- Dynamic color theme
- Context-aware category icon

Example:

```json
{
  "sCategory": "Health",
  "nDifficultyScore": 8,
  "sCategoryColor": "#EF4444",
  "sCategoryIcon": "heart-pulse"
}
```

## Responsive UI

- Mobile-friendly layout
- Card-based dashboard design
- Dynamic visual states
- Graceful loading and empty states
- Error handling support

---

# 🛠 Tech Stack

## Frontend

- React 18
- Vite 6
- React Router DOM 7
- React Query
- React Hook Form
- Axios
- Material UI
- Bootstrap
- Sass
- React Hot Toast

## Backend Compatibility

Designed to work with:

- Node.js
- Express.js
- MongoDB
- Mongoose
- Gemini AI integration

---

# 📂 Project Structure

```text
src/
│
├── Assets/
│   ├── images/
│   └── scss/
│
├── Common/
│   ├── Components/
│   ├── Hooks/
│   └── Constant/
│
├── Pages/
│   ├── Auth/
│   └── Dashboard/
│
├── Routes/
│
├── Utils/
│
├── axios.js
├── App.jsx
└── main.jsx

public/
└── _redirects
```

---

# 🔐 Authentication Flow

Authentication is handled using a cookie-based token system.

## Auth Features

- Automatic token injection via Axios interceptor
- Protected route redirection
- Automatic logout on invalid session
- Persistent login state

## Protected Route

```text
/dashboard
```

If the auth token is missing or invalid, users are redirected to:

```text
/login
```

---

# 🎨 Dynamic Task Styling

The dashboard UI dynamically changes based on backend AI metadata.

## Supported Dynamic UI States

- Category badge color
- Task card border color
- Progress accents
- Difficulty indicators
- Dynamic icons

## Fallback Handling

If metadata is missing:

- Default neutral theme is applied
- Generic task icon is rendered
- Safe fallback labels are used

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

## Required Variables

```env
VITE_STORAGE_KEY='your_cookie_key'
VITE_API_ENDPOINT='https://your-api-url.com/api/v1/user'
```

## Optional Variables

```env
VITE_API_ENDPOINT_DEV=http://localhost:3013/api/v1/user
VITE_API_ENDPOINT_STAGING=https://staging-api-url.com/api/v1/user
```

---

# 🚀 Local Development

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

Application runs on:

```text
http://localhost:5173
```

---

# 📦 Available Scripts

## Development

```bash
npm run dev
```

Starts Vite development server.

## Production Build

```bash
npm run build
```

Builds optimized production assets.

## Preview Production Build

```bash
npm run preview
```

## ESLint

```bash
npm run lint
```

---

# 🌐 Netlify Deployment

This project supports SPA routing using Netlify redirects.

## Required Redirect File

```text
public/_redirects
```

Content:

```text
/*    /index.html   200
```

Without this configuration, refreshing routes like `/dashboard` or `/login` may result in a 404 error.

---

# 🔌 Backend API Requirements

The frontend expects the following API endpoints.

## Authentication

```text
POST /auth/login
POST /auth/register
POST /auth/token
POST /auth/password/reset
```

## Tasks

```text
GET /tasks
GET /tasks/metadata
POST /tasks
POST /tasks/:id/toggle
DELETE /tasks/:id
```

## Profile

```text
GET /profile
PUT /profile/update
POST /profile/logout
POST /profile/change/password
```

---

# 🧠 AI-Assisted Development Workflow

This project was built using an AI-accelerated engineering workflow and completed in approximately **3 hours**.

AI tools were used to improve productivity, accelerate debugging, reduce boilerplate effort, and optimize development speed while maintaining manual control over architecture and implementation decisions.

---

# 🤖 AI Tools Used

## Cursor

- Used to scaffold React + Vite application structure
- Assisted with rapid component generation
- Accelerated route handling and API integration
- Helped optimize React hooks and reusable patterns

## ChatGPT

- Used for architecture planning and implementation strategy
- Assisted with backend integration patterns
- Helped debug deployment and authentication issues
- Assisted in refining project documentation
- Helped optimize dynamic task metadata rendering

## Codex

- Used for rapid UI experimentation
- Assisted in reusable component logic generation
- Accelerated dashboard implementation workflows

## Antigravity

- Used to accelerate development iteration speed
- Assisted in reducing repetitive boilerplate implementation
- Improved engineering workflow productivity

---

# 🧩 AI Usage Examples

- Used Cursor to scaffold the React application structure
- Used ChatGPT to design AI-enriched task metadata flow
- Used Cursor to accelerate protected route implementation
- Used ChatGPT to debug Netlify deployment issues
- Used AI-assisted iteration to implement category-based UI rendering
- Used Codex to speed up reusable dashboard component creation
- Used ChatGPT to refine developer documentation and architecture decisions


# 📄 License

This project is currently intended for educational, portfolio, and demonstration purposes.
