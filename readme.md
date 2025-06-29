

## ✅ `README.md` — Todo Task Management Web App

````markdown
# ✅ Todo Task Management Web App

A full-stack task management web application that allows users to manage, organize, and share their personal and collaborative tasks in real time. The app supports social login (OAuth), CRUD operations for tasks, sharing with other users, real-time updates using Socket.IO, and is built with a modern and scalable tech stack.

---

## 📦 Tech Stack

### 🔧 Backend
- **Node.js** + **Express**
- **MongoDB Atlas** (Cloud Database)
- **Mongoose** (ORM)
- **Socket.IO** (Real-time updates)
- **Passport.js** (OAuth 2.0 Setup)
- **JWT** (Authentication)
- **dotenv** (Secure credentials)

### 🎨 Frontend
- **React** + **Vite**
- **React Router**
- **Axios** (API calls)
- **React Toastify** (Notifications)
- **Socket.IO Client**
- **Tailwind CSS** (Modern styling)

---

## 🌐 Live Demo

> 🎯 *Coming Soon — Deployed on Vercel (Frontend) and Render/Railway (Backend)*

---

## ✨ Features

- ✅ Social Login via Google (OAuth 2.0)
- ✅ Create, Read, Update, Delete tasks
- ✅ Real-time task updates (Socket.IO)
- ✅ Task filtering by status, due date, priority
- ✅ Share tasks with other users (email-based)
- ✅ Responsive UI for desktop and mobile
- ✅ Toast notifications and error handling
- ✅ Authentication using JWT stored in localStorage
- ✅ Clean modular code with React components

---

## 🚀 Getting Started (Local Development)

### 🔧 Prerequisites
- Node.js installed
- MongoDB Atlas account
- Vite & React setup

---

### 1. Clone the Repo

```bash
git clone https://github.com/divyabharathi600/todo-app.git
cd todo-app
````

---

### 2. Setup Backend

```bash
cd todo-backend
npm install
```

#### ✅ Create `.env` File

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
node index.js
```

---

### 3. Setup Frontend

```bash
cd ../todo-frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`
Backend runs at: `http://localhost:5000`

---

## 📁 Project Structure

```
todo-app/
├── todo-backend/
│   ├── index.js
│   ├── .env
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── config/
└── todo-frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── pages/
    │   ├── components/
    │   └── auth.js
    ├── index.html
    └── vite.config.js
```

---

## 🛠️ Key Code Highlights

* **Socket.IO Integration** for live updates
* **JWT Decoding** in `auth.js` to identify users
* **Task Sharing Logic** in controller with email-based sharing
* **Token Management** with localStorage and middleware
* **Frontend Feedback** via `react-toastify` and form modals

---


“This project is a part of a hackathon run by
https://www.katomaran.com ”


Loom Video gere
https://www.loom.com/share/687201f265064144a94007e49f3e8dbc?sid=2be0284f-3b30-4560-af7f-8b5d05172f1f
