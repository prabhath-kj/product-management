MERN Machine Test – Product Management

This project is built as a part of a technical machine test assignment based on the MERN stack. While the original requirement specified the use of **MongoDB, Express, React, and Node.js (MERN)**, this solution uses a more modern full-stack framework, **Next.js (App Router)**, which effectively covers both frontend and backend concerns while maintaining the core architecture of the MERN stack.

---

##  Tech Stack

###  Core Stack
- **Next.js 15+ (App Router)** – Replaces traditional React + Express, provides frontend & backend in one
- **TypeScript** – For type safety across the entire stack
- **MongoDB** – NoSQL database for data storage
- **Zod** – Schema validation for forms and APIs
- **React Hook Form** – Simple and performant form state management
- **Tailwind CSS** – Utility-first CSS framework
- **Shadcn UI** – Prebuilt accessible components
- **Lucide Icons** – Icon set used in UI
- **Cloudinary** – Image upload and storage service

---

##  Features

- ✅ User Authentication (Sign In & Sign Up) using server actions
- ✅ Category and Subcategory Management
- ✅ Product CRUD with variant support (RAM, price, stock)
- ✅ Image Upload using Cloudinary 
- ✅ Dynamic Slug Generation from Product/Category Name
- ✅ Pagination and Filtering using `searchParams`
- ✅ Modular form components with reusable structure
- ✅ Validation using `zod` and react-hook-form
- ✅ Global state with Zustand (for storing categories, subcategories, etc.)
- ✅ Server Actions for form handling (Next.js feature)
- ✅ API Routes for token-based protected CRUD operations

---

## 📡 Architecture Decisions

- **Server Components** are used to fetch data from MongoDB directly.
- **Client Components** handle UI interactivity like category filtering and pagination.
- **Next.js Server Actions** are used for secure form submissions.
- **API Routes** are used for protected actions requiring token authentication (e.g., admin CRUD).

---



