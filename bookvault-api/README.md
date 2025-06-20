# BookVault API

A simple RESTful API server for managing books.

## 🔧 Tech Stack
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- API Testing: Postman / curl

## 📌 API Endpoints

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| POST   | /api/books         | Add a new book           |
| GET    | /api/books         | Get all books            |
| PUT    | /api/books/:id     | Update a book            |
| DELETE | /api/books/:id     | Delete a book            |

## 📥 How to Run

```bash
git clone https://github.com/yourusername/bookvault-api.git
cd bookvault-api
npm install
npm run dev
```

Add `.env` file with:

```
MONGO_URI=your_mongo_uri
```

## 🧪 Sample Request

```bash
curl -X POST http://localhost:5000/api/books -H "Content-Type: application/json" -d '{"title":"1984", "author":"George Orwell"}'
```
