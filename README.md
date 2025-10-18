# 🛍️ Catalogue Products

**Catalogue Products** is a full-stack web application that provides a product management system with **role-based access control**.  
It includes two main folders: one for the **frontend** and one for the **backend**.

---

## 📁 Project Structure

AYUDATE/
├── catalogue_folders_frontend/
└── catalogue_folders_backend/

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd AYUDATE

cd catalogue_folders_frontend
npm install

cd catalogue_folders_backend
npm install
```

### 2. 🧩 Running the Project

#### Frontend

```bash
cd catalogue_folders_frontend
npm run dev
```

#### Backend

```bash
cd catalogue_folders_backend
npm start
```

---

## 🛠️ Technologies Used

Frontend

⚛️ React

⚡ Vite

🧠 TypeScript

🎨 CSS Modules

Backend

🟢 Node.js

🚀 Express

🔐 JWT (Authentication)

✉️ EmailJS (Email delivery)

🔑 bcrypt (Password hashing)

🧰 In-memory data (Mock user array for demo purposes)

---

👤 Default User

The backend includes a predefined user for testing:

``` 
const users = [
  {
    id: 1,
    email: "test@test.com",
    password: bcrypt.hashSync("test1234", 10),
    role: "ADMIN",
  },
];
```

🧠 Note: This is the default ADMIN user used for initial access.

---

🔐 Authentication Flow

The app starts with a login UI, where users can:

Log in with email and password

Request a password reset (sends a verification code via email)

Once authenticated, users are redirected to their dashboard, where permissions depend on their role.

🧭 Dashboard Overview

After login, users will see:

A catalogue of products

Filter options (by name and price range)

A sidebar accessible via the top-right burger menu, showing:

    User’s email

    User’s role

    Role-based permissions

👑 Admin Capabilities

Admins can:

Create, Read, Update, and Delete products

Create new roles (USER or ADMIN)

Change their own password

👤 User Capabilities

Users can:

View products (read-only access)

Change their own password

---

💻 Example Usage

Start both frontend and backend servers.

Log in with the default credentials:

Email: test@test.com
Password: test1234

Once logged in as ADMIN, you can:

Create or edit products

Manage roles

Change your password

Create a USER role account to test limited access (read-only products).

🧑‍💻 Author

Enrique Ortiz Lora
Software Developer | React & AWS Enthusiast

LinkedIn : https://www.linkedin.com/in/enriqueortizlo/
Github : https://github.com/EnriqueOrtiz95