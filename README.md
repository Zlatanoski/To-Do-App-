# To-Do App Backend

A robust, dockerized full-stack To-Do application backend built with modern web technologies. This project demonstrates proficiency in backend development, database management, authentication, and containerization.

## 🚀 Features

- **RESTful API** - Complete CRUD operations for tasks
- **JWT Authentication** - Secure user authentication and authorization
- **PostgreSQL Database** - Reliable relational database with ACID compliance
- **Prisma ORM** - Type-safe database access and migrations
- **Docker Support** - Fully containerized for easy deployment
- **Express.js** - Fast, unopinionated web framework for Node.js
- **Input Validation** - Comprehensive request validation and sanitization
- **Error Handling** - Centralized error handling with meaningful responses

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: Docker & Docker Compose
- **Language**: JavaScript/TypeScript

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) & Docker Compose
- [Git](https://git-scm.com/)

## 🔧 Installation & Setup

### Option 1: Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zlatanoski/To-Do-App-Backend.git
   cd To-Do-App-Backend
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
3. **Configure environment variables**
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/todoapp"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=3000
   NODE_ENV=development
   ```

4. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

The application will be available at `http://localhost:3000`

### Option 2: Local Development

1. **Clone and install dependencies**
   ```bash
   git clone https://github.com/Zlatanoski/To-Do-App-Backend.git
   cd To-Do-App-Backend
   npm install
   ```

2. **Set up PostgreSQL database**
   - Create a PostgreSQL database
   - Update the `DATABASE_URL` in your `.env` file

3. **Run database migrations**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📖 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all user tasks | ✅ |
| POST | `/api/tasks` | Create a new task | ✅ |
| GET | `/api/tasks/:id` | Get task by ID | ✅ |
| PUT | `/api/tasks/:id` | Update task | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |

### Example Request/Response

**Create Task:**
```json
POST /api/tasks
Authorization: Bearer <jwt_token>

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "priority": "high",
    "completed": false,
    "dueDate": "2024-12-31T00:00:00.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🗂️ Project Structure

```
├── src/
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Database models (Prisma)
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── utils/             # Helper functions
│   └── app.js             # Express app configuration
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
├── docker-compose.yml     # Docker services configuration
├── Dockerfile            # Container configuration
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt for secure password storage
- **Input Validation** - Request validation using middleware
- **CORS Configuration** - Cross-origin resource sharing setup
- **Environment Variables** - Sensitive data protection


