const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const apiLimiter = require("./middleware/rateLimitMiddleware");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// ===============================
// Security
// ===============================

app.use(helmet());
app.use(cors());

// ===============================
// Body Parser
// ===============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// Logger
// ===============================

app.use(morgan("dev"));

// ===============================
// Test Route
// ===============================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Blog REST API is running"
    });
});

// ===============================
// Swagger
// ===============================

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// ===============================
// Rate Limiting
// ===============================

app.use("/api", apiLimiter);

// ===============================
// Routes
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/comments", commentRoutes);

// ===============================
// Error Handling
// ===============================

app.use(notFoundMiddleware);

app.use(errorMiddleware);

module.exports = app;
