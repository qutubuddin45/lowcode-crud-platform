# 🧠 Low-Code CRUD Platform (Backend)

This is the **backend** for the Low-Code CRUD Platform built with **Node.js**, **Express**, **Prisma**, and **RBAC (Role-Based Access Control)**.

It allows admin users to define new models dynamically (e.g., Product, Employee, Student) and automatically generates REST APIs for them.

---

## 🚀 Features

- 🔄 Auto-generated CRUD APIs from JSON model definitions  
- ⚙️ Dynamic route registration for all models  
- 🧩 Prisma ORM for database access  
- 🧑‍💼 Role-Based Access Control (Admin, Manager, User)  
- 🔒 JWT-based Authentication  
- 💾 Data stored in PostgreSQL / MySQL (configurable in `.env`)  
- ⚡ Live reloading with Nodemon  

---

## 📁 Folder Structure

backend/
├── prisma/
│ ├── migrations/
│ └── schema.prisma
├── src/
│ ├── controllers/
│ │ └── genricController.ts
│ ├── middleware/
│ │ ├── auth.ts
│ │ └── rbac.ts
│ ├── models/
│ │ └── Product.json (auto-generated)
│ ├── routes/
│ │ ├── adminRoutes.ts
│ │ ├── auth.routes.ts
│ │ └── dynamicRouter.ts
│ ├── utils/
│ ├── app.ts
│ └── server.ts
├── .env
├── package.json
└── README.md


---

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/lowcode-crud.git
cd backend

=>Install dependencies
npm install

=>Setup environment variables
DATABASE_URL="mysql://user:password@localhost:3306/lowcode"
JWT_SECRET="your_secret_key"
PORT=4000

=>Setup Prisma 
npx prisma migrate dev --name init


=>Start the server
npm run dev

🧰 Useful Scripts
| Command                  | Description               |
| ------------------------ | ------------------------- |
| `npm run dev`            | Start server with nodemon |
| `npm run build`          | Build for production      |
| `npx prisma studio`      | Open Prisma UI            |
| `npx prisma migrate dev` | Run migrations            |

=> Example CRUD Flow

POST /api/students
GET /api/students
GET /api/students/:id
PUT /api/students/:id
DELETE /api/students/:id

📦 Tech Stack 
Node.js

Express.js

TypeScript

Prisma ORM

JWT Authentication

RBAC Middleware

💡 Author
Qutub Uddin