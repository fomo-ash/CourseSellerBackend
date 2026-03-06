# Course Selling API

A production-style backend API for a course marketplace where instructors can create courses, add lessons, and students can purchase them.

This project demonstrates backend system design including authentication, authorization, relational database modeling, request validation, and CI automation.

---

## Overview

The Course Selling API provides a backend service that supports:

• User authentication and role management
• Course creation by instructors
• Lesson management within courses
• Course purchases by students
• Role-based access control

The system is built with a modern backend stack and follows a modular architecture to separate routing, middleware, controllers, and database access.

---

## Tech Stack

Backend

• TypeScript
• Express.js
• Bun runtime

Database

• PostgreSQL
• Prisma ORM

Authentication & Security

• JWT authentication
• bcrypt password hashing
• API rate limiting

Validation

• Zod schema validation

Automation

• GitHub Actions CI pipeline

---

## System Architecture

Client
↓
Express API Server
↓
Rate Limiter Middleware
↓
Authentication Middleware
↓
Route Controllers
↓
Prisma ORM
↓
PostgreSQL Database

---

## Database Schema

The system uses relational modeling with the following entities:

User
• id
• email
• password
• name
• role (STUDENT | INSTRUCTOR)

Course
• id
• title
• description
• price
• instructorId

Lesson
• id
• title
• content
• courseId

Purchase
• id
• userId
• courseId

Relationships

User → Courses (1:N)
Course → Lessons (1:N)
User → Purchases (1:N)
Course → Purchases (1:N)

---

## Features

Authentication
• User signup and login
• JWT-based authentication

Authorization
• Role-based access control
• Instructors can create courses and lessons
• Students can purchase courses

API Protection
• Rate limiting middleware to prevent request abuse

Validation
• Request body validation using Zod schemas

Error Handling
• Global error middleware for consistent error responses

CI Automation
• GitHub Actions pipeline verifies project build and Prisma schema on every push

---

## API Endpoints

Authentication

POST /api/auth/signup
Register a new user

POST /api/auth/login
Authenticate and receive JWT

---

Courses

POST /api/courses
Create a new course (Instructor only)

GET /api/courses
Retrieve all courses

GET /api/courses/:id
Get course details with lessons

PATCH /api/courses/:id
Update a course (Instructor only)

DELETE /api/courses/:id
Delete a course (Instructor only)

---

Lessons

POST /api/lessons
Add lesson to a course (Instructor only)

GET /api/courses/:courseId/lessons
Retrieve lessons for a course

---

Purchases

POST /api/purchases
Purchase a course (Student only)

GET /api/users/:id/purchases
Retrieve user's purchased courses

---

## Project Structure

src
├ controllers
├ routes
├ middleware
├ schemas
├ db.ts
└ server.ts

prisma
└ schema.prisma

.github/workflows
└ ci.yml

---

## Getting Started

### 1. Clone Repository

git clone https://github.com/fomo-ash/CourseSellerBackend.git

cd course-selling-api

---

### 2. Install Dependencies

bun install

---

### 3. Configure Environment Variables

Create a `.env` file:

DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key

---

### 4. Generate Prisma Client

bunx prisma generate

---

### 5. Run Database Migrations

bunx prisma migrate dev

---

### 6. Start Development Server

bun run dev

Server will run on:

http://localhost:3000

---

## Continuous Integration

A CI workflow using GitHub Actions automatically:

• installs dependencies
• generates Prisma client
• validates Prisma schema
• compiles TypeScript

This ensures the backend builds successfully on every push.

---

## Future Improvements

• Docker containerization
• Integration tests for API endpoints
• Redis caching layer
• Deployment automation

---

## Author

Ashutosh

Backend Developer focused on building scalable APIs and learning distributed and blockchain systems.
