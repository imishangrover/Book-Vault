const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/books", require("./routes/bookRoutes"));

// 🔽 Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Vault API",
      version: "1.0.0",
      description: "API documentation for Book Vault backend",
    },
    servers: [
      {
        url: "http://localhost:5000", // change if using a different port
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// ✅ Raw Swagger JSON route for Keploy
app.get("/api-docs-json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(specs);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
