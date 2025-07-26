# Login & Registration Page with JWT Authentication

This is a simple **Login and Registration** page built using **React.js** and **Next.js**, with **MongoDB** as the database and **JWT (JSON Web Tokens)** for user authentication. The app includes user login and registration functionality, and only authenticated users can access a **dashboard**.

## Features

- **User Registration**: Allows new users to register with a username and password.
- **User Login**: Allows existing users to log in using their credentials.
- **JWT Authentication**: Authenticated users receive a JWT token for secure access to the dashboard.
- **Dashboard Access**: Only users with a valid JWT token can access the protected dashboard.
- **Hashing (SHA-256)**: Passwords are hashed using SHA-256 before storing in the database (though this is not the most secure option, as mentioned).

## Technologies Used

- **Frontend**:
  - React.js
  - Next.js
- **Backend**:
  - Node.js
  - Express.js
  - JWT (JSON Web Tokens) for authentication
  - MongoDB (NoSQL database)
  - SHA-256 hashing (for password storage)

## Prerequisites

Before running the project, ensure you have the following installed on your system:

- **Node.js** (v14 or higher)
- **MongoDB** (locally or use a MongoDB Atlas cluster)
- **npm** or **yarn**
