# Out of Office Solution

## Overview
This project is an "Out of Office" solution designed to manage employee leave requests, approval requests, and projects. The application provides different functionalities based on user roles: HR Manager, Project Manager, and Employee.

## Features

### HR Manager
- View and manage lists of employees, projects, leave requests, and approval requests.
- Sort, filter, and search within these lists.
- Add, update, and deactivate employees.
- Approve or reject leave requests with comments.

### Project Manager
- View and manage lists of employees, projects, leave requests, and approval requests.
- Sort, filter, and search within these lists.
- Assign employees to projects.
- Add, update, and deactivate projects.
- Approve or reject leave requests with comments.

### Employee
- View and manage own leave requests.
- Sort, filter, and search within these lists.
- Create, update, submit, and cancel leave requests.

## Technical Specifications

### Database Schema
The application uses PostgreSQL for the database. See "Database Schema.png"

## Application Structure

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **Sequelize**: Promise-based ORM for Node.js.
- **PostgreSQL**: Relational database.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Bootstrap**: Frontend framework for responsive web design.
- 
## Setup and Installation

### Prerequisites
- Node.js
- PostgreSQL

### Installation Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/Lihitsky/SMARTbusiness-JuniorCRMDeveloper-TestTask.git
    cd out-of-office
    ```

2. Install backend dependencies:
    ```bash
    cd server
    npm install
    ```

3. Install frontend dependencies:
    ```bash
    cd ../client
    npm install
    ```

4. Setup PostgreSQL database:
    - Create a new database named `out_of_office`.
    - Update the `server/.env` file with your database credentials.

5. Start the backend server:
    ```bash
    npm start
    ```

6. Start the frontend server:
    ```bash
    cd ../client
    npm start
    ```

### Screenshots
Screenshots of the application with comments are included in the `screenshots` directory.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
