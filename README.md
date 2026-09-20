# Attendrix – Student Attendance Management System

Attendrix is a full-stack student attendance management system developed using **Java, Spring Boot, Hibernate, React.js, and MySQL**. The system provides separate role-based functionality for **Admin, Faculty, and Students** to manage student registration, subjects, attendance, and records efficiently.

## Project Overview

Attendrix is designed to digitize and simplify attendance management in educational institutions.

The application implements **role-based access control**, allowing administrators to manage users and subjects, faculty members to manage students and attendance, and students to securely view their own attendance records.

## Features

### Admin

* Admin login and authentication
* View registered students
* Approve or reject student registrations
* Manage subjects
* Manage student and faculty records
* Role-based access to administrative features

### Faculty

* Faculty login
* View assigned students
* Manage student attendance
* Record and update attendance
* View attendance records
* Manage attendance based on subjects

### Student

* Student registration
* Account approval by Admin
* Student login
* View personal attendance records
* View subjects
* Students can access only their own attendance data

## Technology Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* REST API Integration

### Backend

* Java
* Spring Boot
* Spring MVC
* Hibernate
* Spring Data JPA
* REST APIs
* Maven

### Database

* MySQL

### Development Tools

* Git
* GitHub
* VS Code
* Eclipse / IntelliJ IDEA
* Postman

## Project Architecture

```text
                    Attendrix
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
   React.js Frontend        Spring Boot Backend
          │                         │
          │       REST APIs         │
          └────────────┬────────────┘
                       │
                       ▼
                Hibernate / JPA
                       │
                       ▼
                    MySQL
```

## Role-Based Access

```text
                    ┌─────────┐
                    │  Admin  │
                    └────┬────┘
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
          Students    Faculty    Subjects
              │
              ▼
        Approve / Reject


                    ┌──────────┐
                    │ Faculty  │
                    └────┬─────┘
                         │
                ┌────────┴────────┐
                ▼                 ▼
             Students         Attendance
                                   │
                                   ▼
                              Record / Update


                    ┌──────────┐
                    │ Student  │
                    └────┬─────┘
                         │
                  ┌──────┴──────┐
                  ▼             ▼
               Subjects     Attendance
                                │
                                ▼
                         View Own Records
```

## Main Modules

### 1. Authentication & Authorization

The system provides separate access based on user roles:

* Admin
* Faculty
* Student

Users can access only the functionality permitted for their role.

### 2. Student Registration

Students can register their accounts. Newly registered accounts remain pending until an administrator approves them.

### 3. Admin Approval

Administrators can:

* View pending registrations
* Approve students
* Reject students
* Manage users

### 4. Subject Management

Admin can create and manage subjects used for attendance tracking.

### 5. Attendance Management

Faculty can record and manage student attendance for different subjects.

### 6. Student Attendance View

Students can view their own attendance records without being able to modify attendance data.

## CRUD Operations

Attendrix implements CRUD functionality through REST APIs for major application entities.

```text
Create
  ↓
Read
  ↓
Update
  ↓
Delete
```

Examples include:

* Student management
* Faculty management
* Subject management
* Attendance management

## REST API

The React.js frontend communicates with the Spring Boot backend through REST APIs.

Example API structure:

```text
/api/login
/api/students
/api/subjects
/api/attendance
/api/admin
```

The exact endpoints may vary based on the implementation.

## Database

The application uses **MySQL** for persistent data storage.

Major entities include:

```text
User
Student
Faculty
Subject
Attendance
```

Relationships between these entities are managed using **Hibernate/JPA**.

## Project Structure

```text
Attendrix/
│
├── Attendrix_Backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   ├── pom.xml
│   └── ...
│
├── Attendrix_Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## How to Run the Project

### Backend – Spring Boot

Navigate to the backend directory:

```bash
cd Attendrix_Backend
```

Install dependencies and run the application:

```bash
mvn spring-boot:run
```

The backend will start on the configured Spring Boot port.

### Frontend – React.js

Open another terminal and navigate to:

```bash
cd Attendrix_Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The React application will start on the Vite development server.

## Database Configuration

Create a MySQL database and configure the database connection in the Spring Boot configuration file.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/attendrix
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

**Do not commit actual database passwords or sensitive credentials to GitHub.**

## Future Enhancements

* Attendance percentage calculation
* Monthly and semester attendance reports
* PDF/Excel attendance reports
* Email notifications
* Dashboard analytics
* Cloud deployment
* Improved authentication and security
* Mobile-responsive enhancements

## Project Details

**Project:** Attendrix – Student Attendance Management System
**Year:** 2026
**Type:** Full Stack Web Application

### Technologies

`Java` `Spring Boot` `Hibernate` `JPA` `React.js` `MySQL` `REST API` `Maven` `Git` `GitHub`

---

## Author

**Kavita Chimman**

* GitHub: https://github.com/Kavita2005
* LinkedIn: https://www.linkedin.com/in/kavitachimman
