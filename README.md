--- CS3043 Database Systems Semester Project --
Supply-Chain-Management-System

# Supply Chain Management System

A modern web application for managing and optimizing supply chain logistics, product distribution, and reporting. The system supports multiple user roles—**Customers**, **Drivers**, **Assistants**, and **Managers**—each with tailored interfaces and functionalities. It streamlines order placement, scheduling, delivery, staff assignments, and analytics for efficient and reliable operations.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Role-Based Pages](#role-based-pages)
    - [Customer](#customer)
    - [Driver](#driver)
    - [Assistant](#assistant)
    - [Manager](#manager)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Screenshots](#screenshots)
- [License](#license)

---

## Features

- **Order Management:** Customers can place orders, select delivery routes, and track shipments.
- **Product Distribution:** Manages distribution using trains and trucks with scheduling and capacity constraints.
- **Staff Rostering:** Assigns drivers and assistants to deliveries, enforcing work-hour and shift rules.
- **Route Planning:** Supports predefined delivery routes for major cities and stores.
- **Reporting:** Managers can generate sales, working hours, truck usage, and customer-order reports.
- **Role-Based Dashboards:** Dedicated dashboards for Customers, Drivers, Assistants, and Managers.

---

## Tech Stack

- **Frontend:** JavaScript (React.js), HTML, CSS, Bootstrap
- **Backend:** MySQL (for data management; see configuration/integration notes)
- **Routing:** React Router
- **Other Libraries:** [Add libraries as needed, e.g., Chart.js for analytics, Axios for API calls]

---

## Project Structure

```
supply-chain-management-system/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── customer/
│   │   ├── driver/
│   │   ├── assistant/
│   │   ├── manager/
│   │   └── inc/         # Navbar, Footer, etc.
│   ├── pages/           # Home, Login, Signup, etc.
│   ├── App.js
│   └── index.js
├── README.md
└── package.json
```

---

## Role-Based Pages

### Customer
- Place orders, choose delivery routes, track orders, view order history.
- Dashboard: Product catalog, cart, order tracker.

**_Screenshot Placeholder:_**
![Customer Page](images/customer_dashboard.png)

---

### Driver
- View assigned deliveries, truck schedules, track work hours.
- Dashboard: Delivery schedule, route info, order tracker.

**_Screenshot Placeholder:_**
![Driver Page](images/driver_dashboard.png)

---

### Assistant
- View and manage assistant work roster, delivery assignments, track hours.

**_Screenshot Placeholder:_**
![Assistant Page](images/assistant_dashboard.png)

---

### Manager
- Register staff, schedule trucks/trains, assign orders, generate and view reports.
- Dashboard: Staff management, schedule planner, reporting.

**_Screenshot Placeholder:_**
![Manager Page](images/manager_dashboard.png)

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yash200237/Supply-Chain-Management-System.git
   cd Supply-Chain-Management-System/supply-chain-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

> **Note:** Connect to MySQL and configure backend endpoints as needed for full functionality.

---

## Scripts

- `npm start` — Runs the app in development mode.
- `npm run build` — Builds the app for production.
- `npm test` — Runs the test suite.
- `npm run eject` — Ejects create-react-app configuration.

---

## Screenshots

Add screenshots of the main dashboards/pages in the respective placeholders above.

---

## License

[Specify license here, e.g., MIT, GPL, etc.]

---

**For any questions or contributions, please open an issue or pull request!**

