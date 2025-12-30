# 📌 PrimeTrade Task Manager — Internship Assignment  
*A Modern Task Management Web App with Secure Authentication*

🔗 **Live Demo:**  
**Frontend:** https://primetrade-task-teal.vercel.app/  
**Backend API:** https://primetrade-task-0ofh.onrender.com  
**API Docs (Swagger):** https://primetrade-task-0ofh.onrender.com/docs  

---

## 📌 Overview

PrimeTrade Task Manager is a secure and scalable full-stack application built with **Next.js** and **FastAPI**, enabling users to:

✔ Sign up & Log in  
✔ Manage tasks (CRUD operations)  
✔ View their profile  
✔ Enjoy a beautiful and responsive UI 🎨  

This project was developed as part of the **Frontend Developer Intern Selection Task** at **PrimeTrade.ai**.

---

## ✨ Core Features

### 🔐 Authentication
- JWT-based secure login system  
- Token stored in cookies  
- Protected routes using middleware  
- Logout flow with auto-redirect  

### 📊 Dashboard Functionalities
- Add / Update / Delete Tasks  
- Search + Filter tasks  
- Display authenticated user profile  
- Smooth, modern UI with TailwindCSS  

### 🛡 Security
- Password hashing using bcrypt  
- JWT validation middleware  
- Server + Client-side validation  
- Only owner can access their tasks  

---

## 🧩 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | Next.js 14, TypeScript, TailwindCSS |
| Backend | FastAPI (Python) |
| Database | MongoDB Atlas |
| Auth | JWT (HS256), bcrypt |
| Deployment | Vercel (Frontend) + Render (Backend) |

---

## ⚙️ Local Setup Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourname/primetrade-task.git
cd primetrade-task
```
### 2️⃣ Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
Create .env file:
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_secret_here

```

### 3️⃣ Frontend Setup
```
cd frontend
npm install
npm run dev
```

## 🧪 Postman Collection
Available in repo:
📎 backend/postman_collection.json
(Import into Postman to test all APIs)

## 🔄 Authentication Flow (Simple)
- 1️⃣ User logs in
- 2️⃣ Backend creates JWT signed using JWT_SECRET
- 3️⃣ Token stored in client cookies
- 4️⃣ User accesses protected pages
- 5️⃣ Backend verifies token → grant access
Stateless authentication = scalable & secure 

## 🏗 Scalability Notes
- Modular backend for microservices
- Stateless JWT enables load balancing
- MongoDB Atlas supports sharding
- Can easily extend:
- Role-based access control
- Refresh token strategy
- Pagination + analytics

## Developer

**Akshay Jadhav**  
Frontend Developer Intern Candidate — PrimeTrade.ai  
📍 India  
📧 Email: akshayj2305@gmail.com
🔗 GitHub: https://github.com/Akshay-cybersec/primetrade_task

---

Thanks to PrimeTrade.ai for this amazing opportunity! 🚀  
Explore the live deployment links above!