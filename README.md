# 📚 BookVault – Custom Fullstack API Project

**BookVault** is a full-stack application that allows users to manage their personal book collection. It includes a custom-built API server using Express and MongoDB and a React-based frontend to perform CRUD operations on the books.

---

## 🚀 Features

- 📖 Add a new book with title, author, genre, and year
- ✏️ Edit existing book entries
- ❌ Delete books
- 📂 List all books in a neat interface
- 🔗 API fully connected to MongoDB with RESTful endpoints

---

## 🧠 Task Overview

This project is built for the following requirements:

- ✅ **Custom API** with at least 4 CRUD endpoints
- ✅ **Database Integration** using MongoDB
- ✅ **Frontend Integration** using React (Optional Task ✅ Completed)
- ✅ **API Documentation** (See below)
- ✅ **Tested via Frontend and Postman**
- ✅ **Code Shared on GitHub**

---

## 🛠️ Tech Stack

| Layer     | Tech Used                     |
|-----------|-------------------------------|
| Frontend  | React, Axios                  |
| Backend   | Node.js, Express              |
| Database  | MongoDB                       |
| Tools     | Nodemon, dotenv               |

---

## 🗂️ Project Structure
```
bookvault-fullstack/
├── bookvault-api/ # Backend Folder
│ ├── config/db.js # MongoDB connection
│ ├── controllers/bookController.js
│ ├── models/Book.js
│ ├── routes/bookRoutes.js
│ ├── server.js # Entry point
│ └── .env # Environment Variables
├── bookvault-frontend/ # Frontend Folder
│ ├── public/index.html
│ ├── src/App.js # React App
│ └── package.json
```
---

## 🌐 API Documentation

| Endpoint              | Method | Description             |
|-----------------------|--------|-------------------------|
| `/api/books`          | GET    | Get all books           |
| `/api/books`          | POST   | Add a new book          |
| `/api/books/:id`      | PUT    | Update a book by ID     |
| `/api/books/:id`      | DELETE | Delete a book by ID     |

### 🔸 Sample POST request

```json
POST /api/books
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Fiction",
  "publishedYear": 1988
}
```

## 🧪 How to Run the Project
🖥️ Backend (bookvault-api)

Go to the backend directory:
```bash
cd bookvault-api
```

Create a .env file and add:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Install dependencies and start the server:
```bash
npm install
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

🌐 Frontend (bookvault-frontend)

Open a new terminal and go to the frontend directory:
```
cd bookvault-frontend
```

Install dependencies:
```
npm install
```

Start the React frontend:
```
npm start
```

Open in browser:
```
http://localhost:3000
```

## 📦 How to Use the App
Fill in the book fields → click Add Book

Click ✏️ to edit → update values → click Update Book

Click ❌ to delete a book

## 🧪 Testing

This project uses **Jest**, **Supertest**, and **mongodb-memory-server**.

### 🧪 Test Types:
- Unit tests (with mocks)
- Integration tests (with real in-memory MongoDB)
- API endpoint tests

### 🔧 Run Tests

```bash
npm install
npm test
```
### 🧪 Test Coverage Report
<p align="center">
  <img src="./assets/coverage.png" alt="Test Coverage Report" />
</p>