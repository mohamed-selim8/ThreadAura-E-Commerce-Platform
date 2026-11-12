# 👕 MERN E-Commerce Clothing Store

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?logo=tailwindcss)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📖 Overview

A full-stack **MERN E-Commerce** web application for selling **Men's, Women's, and Kids' clothing**.

The application provides a complete online shopping experience, including user authentication, browsing products, shopping cart management, order creation, and an admin dashboard for managing products and customer orders.

The project follows a modern client-server architecture where the frontend communicates with the backend through REST APIs secured with JSON Web Tokens (JWT).

---

# ✨ Features

## 👤 Customer Features

- User Registration
- Secure Login using JWT
- Browse Products
- Search Products
- Filter Products
- Product Details
- Shopping Cart
- Update Cart Quantity
- Place Orders
- Cash on Delivery Support
- Responsive Design
- Toast Notifications

---

## 👨‍💼 Admin Features

- Admin Login
- Add Products
- Delete Products
- View Product List
- View Customer Orders
- Update Order Status
- Dashboard Layout
- Image Upload

---

# 🛠 Tech Stack

## Frontend

- React 19
- React Router
- Vite
- Tailwind CSS v4
- Axios
- React Toastify
- Framer Motion
- Material UI
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Multer
- Cloudinary

---

## Database

- MongoDB Atlas / MongoDB Local

Collections:

- Users
- Products
- Orders

---

# 📂 Project Structure

```text
mern-project
│
├── frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── routes
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

## 1. Clone the repository

```bash
git clone https://github.com/mohamed-selim8/ThreadAura-E-Commerce-Platform
```

---

## 2. Install Frontend

```bash
cd frontend/project
npm install
```

---

## 3. Install Backend

```bash
cd backend
npm install
```

---

## 4. Start Backend

```bash
npm run dev
```

---

## 5. Start Frontend

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=3000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

CLOUDINARY_NAME=your_cloudinary_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_SECRET_KEY=your_secret

```

---

# 🚀 Running the Application

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:3000
```

After running both servers, users can create accounts, browse products, manage their shopping cart, and place orders through the frontend while administrators manage products and orders from the dashboard.



# 🔐 Authentication Flow

The application uses **JSON Web Token (JWT)** for authentication.

### Authentication Process

```text
User Login
     │
     ▼
Backend validates email & password
     │
     ▼
Password compared using bcrypt
     │
     ▼
JWT Token Generated
     │
     ▼
Token returned to Frontend
     │
     ▼
Saved inside Local Storage
     │
     ▼
Included in Authorization Header
```

Example Request Header

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Protected Routes

- Add Product
- Delete Product
- Create Order
- View Orders
- Update Order Status
- User Profile

---

# 🗄 Database Design

The project uses **MongoDB** with **Mongoose**.

There are three main collections.

---

## 👤 Users Collection

| Field | Type |
|------|------|
| name | String |
| email | String |
| password | String (Hashed) |
| cartData | Object |

---

## 👕 Products Collection

| Field | Type |
|------|------|
| name | String |
| description | String |
| price | Number |
| image | Array |
| category | String |
| subCategory | String |
| sizes | Array |
| bestSeller | Boolean |
| date | Number |

---

## 📦 Orders Collection

| Field | Type |
|------|------|
| userId | ObjectId |
| items | Array |
| amount | Number |
| address | Object |
| paymentMethod | String |
| payment | Boolean |
| status | String |
| date | Number |

---

# 📊 Entity Relationship Diagram (ERD)

```text
                +----------------+
                |     USER       |
                +----------------+
                | _id            |
                | name           |
                | email          |
                | password       |
                | cartData       |
                +--------+-------+
                         |
                         | creates
                         |
                         ▼
                +----------------+
                |     ORDER      |
                +----------------+
                | _id            |
                | userId         |
                | items[]        |
                | amount         |
                | payment        |
                | status         |
                +--------+-------+
                         |
                         | contains
                         |
                         ▼
                +----------------+
                |    PRODUCT     |
                +----------------+
                | _id            |
                | name           |
                | category       |
                | price          |
                | images[]       |
                +----------------+
```

---

# 🔄 System Workflow

## Customer Journey

```text
Register
    │
    ▼
Login
    │
    ▼
JWT Authentication
    │
    ▼
Browse Products
    │
    ▼
Product Details
    │
    ▼
Add Product To Cart
    │
    ▼
Cart Saved Inside User Document
    │
    ▼
Checkout
    │
    ▼
Create Order
    │
    ▼
Save Order In Database
    │
    ▼
Payment
    │
    ▼
Update Order Status
```

---

# 📦 Order Lifecycle

```text
Pending
   │
   ▼
Processing
   │
   ▼
Shipped
   │
   ▼
Delivered
```

---

# 📡 REST API Overview

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /user/register | Register User |
| POST | /user/login | Login User |

---

## Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /products | Get All Products |
| POST | /products | Add Product |
| DELETE | /products/:id | Delete Product |

---

## Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /cart/add | Add Item To Cart |
| POST | /cart/update | Update Cart |
| GET | /cart | Get User Cart |

---

## Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /orders | Create Order |
| GET | /orders | Get Orders |
| PUT | /orders/:id | Update Order Status |

---

# 🔒 Security

The project includes several security mechanisms:

- Password hashing using **bcrypt**
- JWT-based authentication
- Protected API routes
- Authorization middleware for admin operations
- Environment variables for sensitive credentials
- Secure communication between frontend and backend using Axios

# 👨‍💼 Admin Dashboard

The Admin Dashboard provides a complete management interface for the store.

### Features

- Add New Products
- Upload Product Images
- Delete Products
- View All Products
- View Customer Orders
- Update Order Status
- Responsive Dashboard
- Dark / Light Mode (if enabled)

---

# 🖥 Admin Workflow

```text
Admin Login
      │
      ▼
JWT Authentication
      │
      ▼
Dashboard
      │
      ├──────────────┐
      ▼              ▼
 Add Product     Product List
      │              │
      ▼              ▼
 MongoDB       Delete Product
      │
      ▼
 Customer Orders
      │
      ▼
 Update Status
```

---

# 📱 Responsive Design

The application is fully responsive and optimized for:

- 💻 Desktop
- 💼 Laptop
- 📱 Mobile
- 📟 Tablet

Built using **Tailwind CSS v4**.

---

# 📸 Screenshots

Replace these placeholders with screenshots after uploading them to GitHub.

## 🏠 Home Page

```md
![Home](screenshots/home.png)
```

---

## 👕 Product Page

```md
![Product](screenshots/product-details.png)
```

---

## 🛒 Shopping Cart

```md
![Cart](screenshots/cart.png)
```

---

## 💳 Checkout

```md
![Checkout](screenshots/checkout.png)
```

---

## 👨‍💼 Admin Dashboard

```md
![Dashboard](screenshots/dashboard.png)
```

---

## 📦 Orders

```md
![Orders](screenshots/orders.png)
```

---

# ☁ Deployment

You can deploy the application using:

## Frontend

- Vercel
- Netlify

## Backend

- Render
- Railway
- Cyclic

## Database

- MongoDB Atlas

## Images

- Cloudinary

---


# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push your branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project for educational and commercial purposes.

---

# 👨‍💻 Author

**Mohamed Nabil**

Frontend Developer | MERN Stack Developer

GitHub:

```text
https://github.com/YOUR_USERNAME
```

LinkedIn:

```text
https://linkedin.com/in/YOUR_USERNAME
```

Portfolio:

```text
https://your-portfolio.com
```

---

# 🙏 Acknowledgments

Special thanks to:

- React Team
- Express.js
- MongoDB
- Tailwind CSS
- Cloudinary
- Open Source Community

---

# ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and motivates future improvements.

---

# 📌 Project Summary

This project demonstrates a complete **MERN Stack E-Commerce Application** with:

- User Authentication using JWT
- Secure Password Hashing
- Product Management
- Shopping Cart
- Order Management
- Admin Dashboard
- RESTful API
- MongoDB Database
- Responsive UI
- Modern React Architecture

The project was built to practice full-stack development and follows a scalable architecture suitable for learning and future expansion.
