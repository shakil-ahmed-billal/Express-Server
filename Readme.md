# Todo App API

A RESTful API for managing todos using Node.js, Express, and PostgreSQL.  
Includes JWT authentication, user roles, and full CRUD functionality.

---

## 📑 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Todos](#todos)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

---

## 🧾 Introduction
The Todo App API allows users to register, login, and manage todo items with full JWT-based authentication and authorization.

---

## ⭐ Features
- User registration & login  
- JWT authentication  
- Role-based authorization  
- CRUD operations for Todos  
- Logging middleware  
- PostgreSQL database support  

---

## 🛠 Tech Stack
- Node.js  
- Express.js  
- PostgreSQL  
- JWT (JSON Web Token)  
- dotenv  

---

## 📦 Installation

```bash
git clone https://github.com/your-username/todo-api.git
cd todo-api
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file:

```
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-jwt-secret>
PORT=3000
```

---

## 🚀 Running the Server

Start the API:

```bash
npm start
```

API will run at:

```
http://localhost:3000
```

---

## 📡 API Endpoints

# Authentication

### POST /auth/login  
Login and receive a JWT token.

**Request Body**
```
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**
```
{
  "token": "your-jwt-token",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "user"
  }
}
```

---

### POST /auth/register  
Register a new user.

**Request Body**
```
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

---

# Todos

### GET /todos  
Get all todos.

```
[
  {
    "id": 1,
    "title": "Buy groceries",
    "completed": false,
    "user_id": 1
  },
  {
    "id": 2,
    "title": "Walk the dog",
    "completed": true,
    "user_id": 1
  }
]
```

---

### GET /todos/:id  
Get a specific todo.

```
{
  "id": 1,
  "title": "Buy groceries",
  "completed": false,
  "user_id": 1
}
```

---

### POST /todos  
Create a new todo.

```
{
  "title": "Buy groceries",
  "completed": false
}
```

---

### PUT /todos/:id  
Update a todo.

```
{
  "title": "Buy groceries online",
  "completed": false
}
```

---

### DELETE /todos/:id  
Delete a todo.

---

## ❗ Troubleshooting
- Make sure PostgreSQL is running  
- Verify `.env` variables  
- Run `npm install` again if dependencies missing  
- Check terminal logs  

---

## 👨‍💻 Contributors
- Your Name

---

## 📄 License
MIT License  
