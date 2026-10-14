# 🚗 Service Center Management System

A full-stack web application designed to simplify and manage the daily operations of a vehicle service center. The system provides customer management, technician management, service request tracking, billing, payment management, and a live dashboard through a user-friendly interface.

## 📌 Project Overview

The Service Center Management System helps service center administrators organize customer details, manage technicians, track vehicle service requests, and maintain billing records efficiently.

The application uses a REST API backend with MongoDB for data storage and a responsive frontend for interacting with the system.

## ✨ Features

- **User Authentication** – User registration and login with password hashing and JWT-based authentication.
- **Customer Management** – Add, view, update, search, and delete customer details.
- **Technician Management** – Maintain technician information, specialization, experience, and availability status.
- **Service Request Management** – Create and track vehicle service requests, assign technicians, set priorities, and update service status.
- **Billing Management** – Generate bills, calculate subtotals and final amounts, manage discounts and taxes, and track payment status.
- **Live Dashboard** – View customer, technician, service request, and billing statistics.
- **Service Status Overview** – Monitor pending, assigned, in-progress, completed, and cancelled services.
- **Recent Service Requests** – View the latest service requests from the dashboard.
- **Protected API Routes** – Secure management endpoints using JWT authentication.

## 🛠️ Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Authentication and Testing**
- JSON Web Token (JWT)
- bcryptjs
- Postman

**Development Tools**
- Visual Studio Code
- Git and GitHub
- MongoDB Compass

## 📂 Project Structure

```text
Service-Center-Management/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Customer.js
│   │   ├── Technician.js
│   │   ├── ServiceRequest.js
│   │   └── Billing.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── technicianRoutes.js
│   │   ├── serviceRequestRoutes.js
│   │   └── billingRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   ├── pages/
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── dashboard.html
│   │   ├── customers.html
│   │   ├── technicians.html
│   │   ├── service-requests.html
│   │   └── billing.html
│   └── index.html
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB Community Server
- Git
- Visual Studio Code

### 1. Clone the Repository

```bash
git clone https://github.com/jayapriya2247/service-center-management.git
```

### 2. Open the Project

```bash
cd service-center-management
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `backend` folder with the following configuration:

```env
MONGO_URI=mongodb://localhost:27017/serviceCenterDB
PORT=5000
JWT_SECRET=replace_with_a_secure_secret
```

Use your own strong JWT secret. Keep `.env` private and never upload it to GitHub.

### 5. Start MongoDB

Make sure the MongoDB server is running on your computer before starting the application.

### 6. Start the Backend Server

From the `backend` folder, run:

```bash
npm run dev
```

The backend server will run at:

`http://localhost:5000`

To check whether the backend is running, open the URL in your browser.

### 7. Start the Frontend

Open a **second terminal** in VS Code and navigate to the frontend folder:

```bash
cd frontend
python -m http.server 5500
```

Open the application in your browser:

`http://localhost:5500/index.html`

Register a user account, log in, and navigate through the dashboard and management pages.

## 🔗 API Endpoints

All management endpoints require a valid JWT token in the `Authorization` header using the format `Bearer YOUR_TOKEN`.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in |
| POST | `/api/customers` | Add a customer |
| GET | `/api/customers` | Get all customers |
| PUT | `/api/customers/:id` | Update a customer |
| DELETE | `/api/customers/:id` | Delete a customer |
| POST | `/api/technicians` | Add a technician |
| GET | `/api/technicians` | Get all technicians |
| PUT | `/api/technicians/:id` | Update a technician |
| DELETE | `/api/technicians/:id` | Delete a technician |
| POST | `/api/service-requests` | Create a service request |
| GET | `/api/service-requests` | Get all service requests |
| PUT | `/api/service-requests/:id` | Update a service request |
| DELETE | `/api/service-requests/:id` | Delete a service request |
| POST | `/api/billing` | Create a bill |
| GET | `/api/billing` | Get all bills |
| PUT | `/api/billing/:id` | Update a bill |
| DELETE | `/api/billing/:id` | Delete a bill |

Individual record retrieval is also available through the corresponding `GET /:id` endpoints.

## 🔄 Application Workflow

1. Register and log in to the application.
2. View the dashboard and current statistics.
3. Add and manage customer details.
4. Add technicians and maintain their availability.
5. Create service requests and assign technicians.
6. Track service progress and update status.
7. Generate bills and maintain payment records.
8. Monitor service center operations through the dashboard.

## 🧪 Testing

The backend REST APIs can be tested using Postman.

Testing includes:
- User registration and login
- Customer CRUD operations
- Technician CRUD operations
- Service request CRUD operations
- Billing CRUD operations
- JWT-protected API access
- MongoDB data persistence

## 🔒 Security

- Passwords are hashed using bcryptjs.
- JWT is used for authentication.
- Protected API routes verify authentication tokens.
- Environment variables are excluded from version control using `.gitignore`.

## 🎯 Future Enhancements

- PDF invoice generation
- Email and SMS notifications
- Service appointment scheduling
- Advanced search and filtering
- Role-based authorization for administrators, customers, and technicians
- Deployment to a cloud hosting platform

## 👩‍💻 Author

**Jayapriya P.**

GitHub: [@jayapriya2247](https://github.com/jayapriya2247)

## 📄 License

This project was developed for educational and academic purposes.
