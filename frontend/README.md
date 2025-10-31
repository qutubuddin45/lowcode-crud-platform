# ⚛️ React + TypeScript + Vite — Frontend for Low-Code CRUD Platform

This is the **frontend** of the Low-Code CRUD Platform, built with **React + TypeScript + Vite**.  
It connects to the Express + Prisma backend and provides a dynamic admin dashboard that adapts automatically to new models.

---

## 🚀 Features

✅ Built using **React 18 + Vite + TypeScript**  
✅ **JWT Authentication** (Login, Register, Protected Routes)  
✅ **Dynamic CRUD Tables** generated from backend models  
✅ **Axios client** with built-in auth header support  
✅ **SweetAlert2** for success/error popups  
✅ **Hot Module Reloading (HMR)** for faster development  

---

## 🏗️ Project Structure

frontend/
│
├── node_modules/          # All project dependencies
├── public/                # Static assets (favicon, index.html, etc.)
│
├── src/                   # Main source code folder
│   │
│   ├── api/               # API calls and Axios client setup
│   │   └── axiosClinet.ts
│   │
│   ├── assets/            # Images, fonts, and static resources
│   │
│   ├── components/        # Reusable React components
│   │   ├── auth/          # Authentication related components
│   │   ├── common/        # Shared UI components (navbar etc.)
│   │   ├── context/       # React Context providers
│   │   ├── model/         # TypeScript model interfaces
│   │   └── utils/         # Utility/helper functions
│   │
│   ├── pages/             # Application pages or views
│   │
│   ├── routes/            # App routing configuration
│   │
│   ├── store/             # State management (Redux/Zustand, etc.)
│   │
│   ├── App.css            # Global styles
│   ├── App.tsx            # Root component
│   ├── index.css          # Base CSS styles
│   └── main.tsx           # App entry point (renders <App />)
│
└── package.json           # Project configuration and dependencies

Run Development Server

npm run dev

🔐 Authentication Flow

=>User registers or logs in.

=>JWT token is stored in localStorage.

=>Every API call automatically sends Authorization: Bearer <token> header.

=>Protected routes (like Dashboard) require a valid token.

🧩 Core Components
🔸 LoginForm.tsx

Handles user authentication with email & password, stores JWT token, and redirects to Dashboard.

🔸 RecordTable.tsx

Fetches and displays records from backend /api/<model>

Allows adding, editing, and deleting records dynamically

Uses SweetAlert2 for user feedback

🔸 AdminPanel.tsx

Displays all models registered in the backend

Loads corresponding CRUD tables dynamically  


🧠 Example Workflow
Login with Admin credentials.

Select “Product” model in Admin Panel.

Add ,edit and delete records dynamically.

Changes reflect instantly in the database

Scripts
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build


=>Tech Stack
| Category               | Technology                    |
| ---------------------- | ----------------------------- |
| **Frontend Framework** | React + TypeScript            |
| **Build Tool**         | Vite                          |
| **UI/UX**              | SweetAlert2                   |
| **HTTP Client**        | Axios                         |
| **Auth**               | JWT                           |
| **Role Management**    | RBAC (Admin, Manager, Viewer) |


🧑‍💻 Author
 -> Qutub Uddin




