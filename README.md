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

- **Model**: Handles data and business logic, interacting with MongoDB. It includes models like `User`, `Review`, and `Property`.
- **View**: The user interface is managed by `App.js`, which fetches data through API calls and displays it dynamically.
- **Controller**: Manages business logic by interacting with the models. It handles user registration, login, reviews, property management, and sessions.

### **One-to-Many Relationship (Users and Reviews)**

- **User Model**: Stores user data and references the reviews they have written.
- **Review Model**: Contains review data, including the reference to the user and the property being reviewed. Each user can leave multiple reviews.

### **Sessions and Cookies for Authentication**

- **Session**: On login, a session is created and stored on the server, ensuring users remain logged in across requests.
- **Cookies**: The session ID is stored in a cookie, enabling persistent authentication for users across page reloads.

### **Mapbox Integration for Location Display**

- **Mapbox** is integrated to display interactive maps with location markers for properties. Users can visualize property locations on the map for a better experience.

---

This project demonstrates core concepts like **MVC architecture**, **one-to-many relationships**, **user authentication** using sessions and cookies, and **Mapbox integration** for map-based property location display.
