# 📊 Sales Analytics Dashboard

A full-stack **Sales Analytics Platform** that provides interactive insights into sales performance across categories, markets, and products.
The system includes **secure authentication, role-based access control, and dynamic analytics dashboards** to help organizations monitor and manage sales data efficiently.

---

## 🚀 Live Demo

Frontend (Deployed on Vercel)
https://sales-analytics-wine.vercel.app/

Backend API (Deployed on Render)
https://sales-analytics-hu8k.onrender.com/

> Note: Signup requires **admin approval** before users can access the dashboard.

---

# 🖼 Dashboard Preview

![Sales Dashboard](./assets/dashboard.png)

The dashboard provides:

* Key Performance Indicators (KPIs)
* Sales distribution by category
* Revenue by global markets
* Revenue vs Volume trends
* Product margin analysis

---

# ⚙️ Tech Stack

## Frontend

* React
* Vite
* Highcharts
* CSS

## Backend

* Node.js
* Express.js
* PostgreSQL

## Authentication

* JWT Authentication
* Refresh Tokens
* HTTPOnly Cookies

---

# 🔐 Authentication & Security

The application uses **secure authentication architecture**:

* JWT Access Tokens
* Refresh Token Rotation
* HTTPOnly Cookies
* Role-based access control

Roles supported:

* **Admin**
* **Sales Manager**
* **Read Only**

---

# 👥 User Roles

### Admin

* Approve or reject user registrations
* Manage user permissions

### Sales Manager

* Add sales data
* Update sales data
* Manage sales records in the grid

### Read Only

* View dashboards and analytics
* No editing permissions

---

# 📊 Features

## Analytics Dashboard

* Revenue KPI
* Volume KPI
* Margin %
* Discount metrics
* Year over Year (YoY) comparison

## Visualizations

* Category sales comparison
* Revenue by market
* Revenue vs volume trends
* Margin vs volume product analysis

## Data Management

* Editable sales data grid
* Sales managers can add/update records
* Real-time dashboard updates

## Security

* JWT authentication
* Refresh token system
* HTTPOnly cookie storage
* Protected routes

---

# 📂 Project Structure

```
sales-analytics
├── ui
└── backend
```

---

# 🛠 Installation

## 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/sales-analytics.git
cd sales-analytics
```

---

## 2️⃣ Install frontend dependencies

```bash
cd ui
npm install
npm run dev
```

---

## 3️⃣ Install backend dependencies

```bash
cd backend
npm install
npm start
```

---

# 🌍 Environment Variables

Backend `.env`

```
DATABASE_URL=your_postgres_connection
JWT_SECRET=your_secret_key
REFRESH_SECRET=your_refresh_secret
API_URL=http://localhost:5173
```

Frontend `.env`

```
VITE_API_BASE_URL=http://localhost:5000
```

---

# 🧠 Key Architecture Concepts

* **Token-based authentication**
* **Refresh token interceptor using Axios**
* **Role-based authorization**
* **RESTful API design**
* **Separation of UI and backend services**

---

# 👨‍💻 Author

Shivam Tiwari

Frontend Developer
React | JavaScript | TypeScript | Node.js

---

# ⭐ If you like this project

Give the repo a **star ⭐** and feel free to contribute!
