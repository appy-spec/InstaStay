# InstaStay-MERN Stack

This project is an Airbnb clone built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Below are some screenshots of the application.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or later)
- **npm** (Node Package Manager)
- **MongoDB** (Local or MongoDB Atlas)

## Screenshots

### Homepage

![Homepage Screenshot](screenshots/homepage.png)

### Add new Listing Page
![Add Listing Screenshot](screenshots/addnewlisting.png)

### Login Page
![Login Screenshot](screenshots/login.png)

### Show listing Page
![show Screenshot](screenshots/showlisting.png)

### Show location
![show Screenshot](screenshots/showlocation.png)

## Some of the Key Features:

### **MVC (Model-View-Controller) Architecture**

The application follows the **MVC** design pattern to separate the logic into three core components:

- **Model**: Handles data and business logic, interacting with the database (MongoDB). Includes models like `User`, `Review`, and `Property`.
- **View**: The user interface (UI) is managed by **app.js**, which interacts with the backend through API calls to display data dynamically.
- **Controller**: Manages the business logic by interacting with models and sending appropriate responses to the view. The controllers manage user registration, login, reviews, property management, and sessions.

### **One-to-Many Relationship (Users and Reviews)**

In this app, there is a **one-to-many relationship** between **users** and **reviews**. A user can leave multiple reviews for properties, but each review is linked to exactly one user. This relationship is implemented using **MongoDB**'s ObjectId reference.

- **User Model**: Stores user-related data and references reviews they have written.
- **Review Model**: Stores review data with a reference to the user and the property being reviewed.

### **Sessions and Cookies for Authentication**

Sessions and cookies are used for **user authentication**. Upon login, a session is created and stored on the server. The session ID is sent as a cookie, ensuring that users remain logged in across different requests. The authentication system ensures secure access to protected routes like submitting reviews or managing user profiles.

### **Mapbox Integration for Location Display**

**Mapbox** is integrated to show interactive maps with location markers for properties. This feature allows users to visualize property locations on the map, improving the user experience by providing geographical context to property listings.

