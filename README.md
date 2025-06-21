# Invoice Tracking System

A simple web application designed to create, manage, and track invoices efficiently.

## ✨ Features

- **Create:** Add new invoices to the system.  
- **Retrieve:** View all invoices or fetch details of a specific one.  
- **Update:** Modify existing invoice data.  
- **Delete:** Remove invoices from the system.

## 🚀 Technologies Used

| Category     | Technology                                         |
| ------------ | -------------------------------------------------- |
| **Language** | TypeScript                                         |
| **Backend**  | Hono.js, Drizzle ORM, PostgreSQL |
| **Frontend** | Vite, React, Tailwind CSS                          |

## 📋 Invoice Fields

Each invoice in the system includes the following fields:

- **`id`**: Unique identifier (UUID)  
- **`createdAt`**: Timestamp of invoice creation  
- **`customerNo`**: Customer number (integer)  
- **`description`**: Invoice description (string)

## 💻 Getting Started

Follow these steps to set up and run the Invoice Tracking System locally.

---

### 1. Database Setup (PostgreSQL)

Ensure PostgreSQL is installed and running on your machine.

#### Create Database and User

Open your terminal and connect to PostgreSQL:

```bash
psql -U postgres
```

Then, run the following SQL commands to set up your database and user:

```sql
CREATE DATABASE invoice_tracker_db;
CREATE USER invoice_tracker_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE invoice_tracker_db TO invoice_tracker_user;
\q
```

💡 **Important**: Replace `'your_secure_password'` with a strong, unique password of your choice.

🪟 **Windows Note**: If the `psql` command is not recognized, add this path to your system’s environment variables:

```
C:\Program Files\PostgreSQL\<version>\bin
```

Restart your terminal after modifying environment variables.

#### Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```ini
DATABASE_URL="postgresql://invoice_tracker_user:your_secure_password@localhost:5432/invoice_tracker_db"
```

🔒 Make sure `.env` is listed in `backend/.gitignore`.

---

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Push the schema to the database (creates tables based on Drizzle schema):

```bash
npm run db:push
```

> If the table already exists and there are no schema changes, you'll see: `[i] No changes detected.`

Start the backend server:

```bash
npm run dev
```

📍 The backend API will be available at: [http://localhost:3000](http://localhost:3000)

---

### 3. Frontend Setup

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

📍 The frontend application will be available at: [http://localhost:5173](http://localhost:5173)

---

## 📌 Usage Notes

- Keep both the **frontend** (`http://localhost:5173`) and **backend** (`http://localhost:3000`) servers running during development.
- If you modify the database schema (e.g., in `backend/src/db/schema.ts`), re-run:

```bash
npm run db:push
```
