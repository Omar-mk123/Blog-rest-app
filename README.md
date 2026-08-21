# 📝 Blog REST API

A professional **RESTful Blog API** built with **Node.js, Express.js, MongoDB, and Mongoose**.

This project is part of my Backend Development roadmap and focuses on building scalable REST APIs with authentication, authorization, CRUD operations, validation, middleware, and database management.

---

## 🚀 Features

- 🔐 User Registration & Login
- 🔑 JWT Authentication
- 👤 User Roles & Authorization
- 📝 Create Blog Posts
- 📚 Get All Blog Posts
- 🔎 Get Blog Post by ID
- ✏️ Update Blog Posts
- 🗑️ Delete Blog Posts
- 💬 Comments System
- 🔍 Search Blog Posts
- 📄 Pagination
- 🛡️ Protected Routes
- ✅ Request Validation
- ❌ Centralized Error Handling
- 🌐 CORS Support
- 🔒 Password Hashing with bcrypt
- ⚙️ Environment Variables
- 🗄️ MongoDB Database with Mongoose

---

## 🛠️ Technologies

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | JavaScript Runtime    |
| Express.js | REST API Framework    |
| MongoDB    | NoSQL Database        |
| Mongoose   | MongoDB ODM           |
| JWT        | Authentication        |
| bcryptjs   | Password Hashing      |
| dotenv     | Environment Variables |
| cors       | Cross-Origin Requests |
| Morgan     | HTTP Request Logging  |
| Postman    | API Testing           |

---

## 📁 Project Structure

```text
blog-rest-api/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   └── commentController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Blog.js
│   │   └── Comment.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── blogRoutes.js
│   │   └── commentRoutes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/blog-rest-api.git
```

### 2. Navigate to the project

```bash
cd blog-rest-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key

JWT_EXPIRES_IN=7d
```

### 5. Start the server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

The API will run on:

```text
http://localhost:5000
```

---

# 🔐 Authentication

The API uses **JWT (JSON Web Token)** authentication.

After successful login, the API returns a token.

Use the token in protected requests:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 📡 API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "12345678"
}
```

### Login

```http
POST /api/auth/login
```

Example:

```json
{
  "email": "john@example.com",
  "password": "12345678"
}
```

---

# 📝 Blog Endpoints

### Get All Posts

```http
GET /api/blogs
```

### Get Single Post

```http
GET /api/blogs/:id
```

### Create Post

```http
POST /api/blogs
```

Requires authentication.

Example:

```json
{
  "title": "Introduction to Node.js",
  "content": "Node.js is a JavaScript runtime...",
  "category": "Programming"
}
```

### Update Post

```http
PUT /api/blogs/:id
```

Requires authentication.

### Delete Post

```http
DELETE /api/blogs/:id
```

Requires authentication.

---

# 💬 Comment Endpoints

### Get Comments

```http
GET /api/blogs/:blogId/comments
```

### Add Comment

```http
POST /api/blogs/:blogId/comments
```

Example:

```json
{
  "content": "Great article!"
}
```

### Delete Comment

```http
DELETE /api/comments/:id
```

---

# 👤 Authorization

The API supports different user roles.

Example:

```json
{
  "role": "user"
}
```

or:

```json
{
  "role": "admin"
}
```

### User

Can:

- Read blog posts
- Create posts
- Update their own posts
- Delete their own posts
- Add comments

### Admin

Can:

- Manage users
- Manage all blog posts
- Delete inappropriate content
- Manage comments
- Access administrative endpoints

---

# 🔎 Search

Blog posts can be searched using query parameters.

Example:

```http
GET /api/blogs?search=node
```

You can also combine search with pagination:

```http
GET /api/blogs?search=node&page=1&limit=10
```

---

# 📄 Pagination

Example:

```http
GET /api/blogs?page=1&limit=10
```

Example response:

```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "total": 25,
  "data": []
}
```

---

# ❌ Error Handling

The API uses centralized error handling.

Example:

```json
{
  "success": false,
  "message": "Blog post not found"
}
```

Validation errors return meaningful messages to help the client understand what went wrong.

---

# 🗄️ Database

MongoDB is used as the primary database.

Main collections:

```text
users
blogs
comments
```

Relationships:

```text
User
 │
 ├── Blog Posts
 │
 └── Comments

Blog
 │
 └── Comments
```

---

# 🧪 Testing

The API can be tested using **Postman**.

Recommended testing order:

```text
1. Register User
       ↓
2. Login
       ↓
3. Copy JWT Token
       ↓
4. Add Token to Authorization Header
       ↓
5. Create Blog
       ↓
6. Get Blogs
       ↓
7. Update Blog
       ↓
8. Add Comment
       ↓
9. Delete Blog / Comment
```

---

# 🔒 Security

The project implements several security practices:

- Password hashing with bcrypt
- JWT authentication
- Role-based authorization
- Protected routes
- Environment variables for secrets
- Input validation
- Centralized error handling

> Never commit your `.env` file to GitHub.

---

# 📚 What I Learned

Through this project, I practiced:

- REST API architecture
- Express.js routing
- Controllers
- Middleware
- MongoDB
- Mongoose
- JWT authentication
- Role-based authorization
- Password hashing
- CRUD operations
- API validation
- Error handling
- Pagination
- Search functionality
- Postman API testing
- Environment configuration
- Git & GitHub project organization

---

# 🎯 Future Improvements

Possible future features:

- 🖼️ Image Upload
- ☁️ Cloudinary Integration
- ❤️ Like System
- 🔖 Bookmark System
- 📧 Email Verification
- 🔄 Password Reset
- ⭐ Post Rating
- 📊 Admin Dashboard
- 🧱 API Rate Limiting
- 🐳 Docker Support
- 🧪 Automated Testing
- 📖 Swagger / OpenAPI Documentation

---

# 👨‍💻 Author

**Omar Mohamed Khalil**

Backend Developer | Node.js | Express.js | MongoDB

---

## ⭐ Project Status

```text
Status: Completed ✅
Project: 13 / Backend Roadmap
Phase: REST API Development
```

If you found this project useful, consider giving the repository a ⭐.

---

## 📜 License

This project is created for educational and portfolio purposes.
