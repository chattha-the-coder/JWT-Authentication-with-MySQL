<<<<<<< HEAD
#Node.js JWT Authentication with MySQL
This project demonstrates a basic implementation of user authentication using Node.js, Express, MySQL, and JWT (JSON Web Tokens). It includes functionalities for user registration, login, token-based authentication, and retrieving user-specific data from the database.

Features:
User Registration:

Hashes user passwords with bcrypt before storing them in the tokends table.

User Login:

Validates user credentials by comparing the input password with the hashed password stored in the database.
Generates a JWT upon successful login.
Token-Based Authorization:

Middleware (verify_t) verifies the validity of JWT tokens.
Protects routes by ensuring only authenticated users can access them.
Custom Query Based on User Role:

Fetches tickets from the tickets table based on the assignee and reporter roles of the logged-in user.
Project Structure
plaintext
Copy code
.
├── public/
├── .env
├── package.json
├── server.js
└── README.md

Technologies Used:
Node.js: Backend server.
Express: Routing and middleware.
MySQL: Database to store user and ticket data.
JWT (jsonwebtoken): For token generation and authentication.
bcrypt: For password hashing.
Endpoints

1. Register User
   URL: /reg
   Method: POST
   Body Parameters:

name (string): Username.
pass (string): Password (hashed before storing).
Description: Registers a new user into the tokends table.

2. User Login
   URL: /login
   Method: POST
   Body Parameters:

name (string): Username.
pass (string): Password.
Response:

Success: Returns a JWT token for authentication.
Failure: Returns an error if the credentials are invalid. 3. Protected Route
URL: /protect
Method: GET
Headers:

Authorization: Bearer <JWT_TOKEN>.
Description: A protected route accessible only to authenticated users. Returns the user’s details.

4. Get Tickets
   URL: /tickets
   Method: GET
   Headers:

Authorization: Bearer <JWT_TOKEN>.
Description: Fetches tickets from the tickets table where the logged-in user is either the assignee or the reporter.

Setup Instructions
Clone the Repository:

bash
Copy code
git clone https://github.com/<your_username>/<your_repository_name>.git
cd <your_repository_name>
Install Dependencies:

bash
Copy code
npm install
Setup Environment Variables: Create a .env file in the project root and add the following:

env
Copy code
database_host=localhost
database_user=root
database_password=root
database=tokend
JWT_SECRET=haq@123
Run the Server:

bash
Copy code
node server.js
Database Schema: Create the following tables in your MySQL database:

tokends:
sql
Copy code
CREATE TABLE tokends (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255),
pass VARCHAR(255)
);
tickets:
sql
Copy code
CREATE TABLE tickets (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
description TEXT,
status VARCHAR(50),
assignee INT,
reporter INT
);
Testing: Use tools like Postman to test the endpoints.

Usage
Register: Use /reg to create a new user.
Login: Use /login to authenticate the user and retrieve a JWT.
Access Protected Routes: Use the token to access /protect and /tickets.
Contributing
Contributions are welcome! Fork the repository and submit a pull request.

License
This project is licensed under the MIT License.
=======
# JWT-Authentication-with-MySQL
This project demonstrates a secure user authentication system using Node.js, Express, MySQL, and JWT (JSON Web Tokens). It includes functionalities for user registration with hashed passwords, secure login, and token-based authorization to access protected routes. The database ensures user data is stored safely.
>>>>>>> e011679ce81b618ac93d45e28b8659e4bf4e2017
