# Power Bank ⚡

Power Bank is a comprehensive, full-stack grid management and power distribution platform. It seamlessly connects utility operators managing infrastructure with customers tracking their power usage and outages, while providing administrators with complete oversight of the entire operation.

Whether it's finding outage schedules, managing infrastructure maintenance, or securely processing electricity bills, Power Bank handles infrastructure tracking, secure transactions, user verification, and incident management all in one place.

## 🔗 Important Links

- **Live Website (Client):** *https://power-bank-client.vercel.app/*
- **Server Repository:** *https://github.com/NahidRuhan/PowerBank-server*
- **Client Repository:** *https://github.com/NahidRuhan/PowerBank-client*

### 🔑 Demo Credentials
You can use the following test accounts to explore the different role-based dashboards without needing to register:
- **Admin:** `admin@powerbank.com` / `password123`
- **Operator:** `operator1@powerbank.com` / `password123`
- **Customer:** `customer1@powerbank.com` / `password123`

---

## 🌟 Key Features

### 👤 For Customers
- **Grid Status & Outages:** Easily view live grid status and track upcoming load-shedding schedules for your specific area.
- **Report Incidents:** Send outage reports directly from the dashboard and track their resolution status (Reported, In Progress, Resolved).
- **Secure Payments:** Integrated with Stripe for seamless, secure checkout sessions to pay electricity bills and track overdue payments.
- **Billing History:** Keep track of all paid bills, active usage, and transaction receipts in a dedicated dashboard.

### 🏢 For Operators
- **Infrastructure Management:** Add, edit, and manage substations, feeders, distribution zones, and meters.
- **Smart Incident Management:** Instantly view incoming outage reports from customers. Assign repair teams and update resolution status with a single click.
- **Schedule Management:** Plan and execute load-shedding schedules based on quotas and grid capacity.
- **System Analytics:** Visualize feeder fairness, outage trends, and infrastructure load using beautifully rendered charts.

### 👑 For Administrators
- **Global Overview:** Oversee every substation, feeder, and schedule active on the platform.
- **User Management:** Review all registered users (Customers and Operators), change their roles, and manage platform moderation.
- **Audit & Analytics:** Dynamically track system actions via Audit Logs and monitor overall system fairness and revenue generation.

---

## 🛠️ Tech Stack

### Frontend (powerbank-client)
- **Next.js (App Router):** Modern, fast React framework for server-side rendering, SEO optimization, and API routes.
- **Tailwind CSS & Shadcn/ui:** Responsive, utility-first styling with beautiful, accessible pre-built UI components.
- **TanStack Query (React Query):** Powerful data fetching, caching, and state synchronization without hard page reloads.
- **React Hook Form & Zod:** Robust form validation and error handling.
- **Zustand:** Lightweight global state management.
- **Recharts:** Dynamic data visualization for dashboard analytics.

### Backend (powerbank-server)
- **Node.js & Express.js:** Robust server and RESTful API infrastructure.
- **Prisma ORM:** Next-generation Node.js and TypeScript ORM for robust database querying (PostgreSQL on Neon).
- **Redis:** High-performance caching for dashboard stats and system analytics.
- **Stripe API:** Processing secure online payments and handling checkout webhooks asynchronously.
- **Twilio & Resend:** SMS and Email notifications for outages and billing updates.

---

## 📦 Dependencies

The frontend client relies on a robust ecosystem of modern React libraries and tools.

### Core Dependencies
- **Core Framework:** `next`, `react`, `react-dom`
- **Data Fetching & State:** `@tanstack/react-query`, `axios`, `zustand`
- **UI & Styling:** `tailwindcss`, `shadcn/ui`, `tailwind-merge`, `clsx`, `framer-motion`
- **Icons & Feedback:** `lucide-react`, `sonner`
- **Forms & Validation:** `react-hook-form`, `@hookform/resolvers`, `zod`
- **Data Visualization:** `recharts`
- **Utils:** `date-fns`, `js-cookie`

### Development Dependencies
- **Build Tooling:** `eslint`, `typescript`
- **Typings:** `@types/react`, `@types/node`, `@types/js-cookie`

---

## 📄 API Documentation

For a comprehensive mapping of all frontend React Query hooks to their respective backend Express endpoints, please refer to the **API Integration Document** (if available).

---

## 📁 Project Structure

```text
Power Bank/
├── powerbank-client/     # Frontend Next.js Application
│   ├── src/
│   │   ├── app/          # Next.js App Router structure
│   │   │   ├── (auth)/   # Authentication routes (Login, Register)
│   │   │   ├── (public)/ # Public-facing routes
│   │   │   └── (dashboard)/ # Role-based dashboards (Admin, Operator, Customer)
│   │   ├── components/   # Reusable UI components (Shadcn UI, Shared)
│   │   ├── lib/          # Utility functions (Axios instances, Types)
│   │   └── stores/       # Zustand state management
├── powerbank-server/     # Backend Express Application
│   ├── src/
│   │   ├── api/          # Route controllers and services
│   │   ├── lib/          # Database, Redis, and Third-party clients
│   │   └── middleware/   # Authentication and error handling
│   └── prisma/           # Database schema and migrations
```

---

## 🚀 Local Development Setup

Follow these steps to set up the project on your local machine.

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database
- Redis Server

### 1. Clone the Repository
```bash
git clone https://github.com/NahidRuhan/PowerBank-client.git
git clone https://github.com/NahidRuhan/PowerBank-server.git
```

### 2. Install Dependencies
Navigate to both the client and server directories and install dependencies:
```bash
cd powerbank-server
npm install

cd ../powerbank-client
npm install
```

### 3. Environment Variables
Set up your `.env` files based on the `.env.example` provided in both the client and server directories.
```env
# powerbank-client/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### 4. Start the Development Servers
In the server directory:
```bash
npm run dev
```

In the client directory:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the client application.

---

## 📦 Architecture Highlights

- **Hybrid Rendering:** Leverages Next.js Server Components for initial fast loads and SEO, combined with Client Components for rich interactivity (using React Query).
- **Responsive Dashboard:** The dashboard layouts for all three roles (Admin, Operator, Customer) are built with a mobile-first approach, ensuring a seamless experience across all devices.
- **Optimistic UI Updates:** Using TanStack Query's invalidation, UI components (like incident status changes or schedule updates) update instantly without hard page reloads.
- **Caching Layer:** Utilizes Redis on the backend to cache heavy analytical queries, drastically reducing dashboard load times.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check the issues page if you want to contribute.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
