# 🛒 E-Commerce Store — Frontend

A full-featured online shopping storefront built with **React 19**, **TypeScript**, and **Vite**. Users can browse and search products, manage a shopping cart, choose delivery options, place orders, and track packages, all backed by a REST API.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?logo=vitest&logoColor=white)

> **Backend:** this app talks to the companion [E-Commerce Backend](../ecommerce-backend) (Node.js + Express). Start the backend before running the frontend.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Routes](#-routes)
- [How It Works](#-how-it-works)
- [Testing](#-testing)
- [Building for Production](#-building-for-production)
- [Acknowledgements](#-acknowledgements)

---

## ✨ Features

- **Product catalog**: responsive grid of products with images, star ratings, review counts, and prices.
- **Search**: search by product name or keyword from the header; results are reflected in the URL (`/?search=...`) so they can be bookmarked and shared.
- **Shopping cart**
  - Add 1–10 units of any product, with an "Added ✓" confirmation.
  - Live cart counter in the header.
  - Update quantities inline (press **Enter** to save, **Escape** to cancel) or remove items.
- **Checkout**
  - Choose a delivery option per item (free 7-day, $4.99 3-day, or $9.99 next-day) with estimated arrival dates.
  - Payment summary showing item cost, shipping, subtotal, 10% estimated tax, and order total.
- **Order history**: all past orders, newest first, with order date, total, and ID, plus a one-click **Buy again** button.
- **Package tracking**: per-item tracking page with a progress bar showing *Preparing → Shipped → Delivered*, based on order time and estimated delivery date.
- **404 page** for unknown routes.
- **Per-page titles and favicons** using React 19's native `<title>` / `<link>` support.
- **React Compiler** enabled through `babel-plugin-react-compiler` for automatic memoization.

---

## 🧰 Tech Stack

| Category        | Technology |
|-----------------|------------|
| UI library      | [React 19](https://react.dev/) |
| Language        | TypeScript + JSX |
| Build tool      | [Vite 6](https://vite.dev/) |
| Routing         | [React Router 7](https://reactrouter.com/) |
| HTTP client     | [Axios](https://axios-http.com/) |
| Dates           | [Day.js](https://day.js.org/) |
| Testing         | [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), jsdom |
| Linting         | ESLint 9 + typescript-eslint |
| Optimization    | React Compiler (`babel-plugin-react-compiler`) |

---

## 📸 Screenshots

> _Add your screenshots to a `docs/` folder and update the paths below._

| Home | Checkout |
|------|----------|
| ![Home page](docs/home.png) | ![Checkout page](docs/checkout.png) |

| Orders | Tracking |
|--------|----------|
| ![Orders page](docs/orders.png) | ![Tracking page](docs/tracking.png) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **v22 or later**
- npm (comes with Node.js)
- The **backend server** running on `http://localhost:3000`

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2. Start the backend

```bash
cd ecommerce-backend
npm install
npm run dev
```

The API will be available at `http://localhost:3000`.

### 3. Start the frontend

Open a second terminal:

```bash
cd ecommerce-project-ts
npm install
npm run dev
```

Open the URL shown in the terminal (usually **http://localhost:5173**).

> During development, Vite proxies every `/api` and `/images` request to `http://localhost:3000`, so no CORS setup or environment variables are needed.

---

## 📜 Available Scripts

| Command           | Description |
|-------------------|-------------|
| `npm run dev`     | Starts the Vite dev server with hot module replacement. |
| `npm run build`   | Type-checks with `tsc -b` and builds into `../ecommerce-backend/dist`. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint`    | Runs ESLint across the project. |
| `npx vitest`      | Runs the test suite in watch mode (use `npx vitest run` for a single run). |

---

## 🗂 Project Structure

```
ecommerce-project-ts/
├── public/                    # Static files (favicons, images)
├── src/
│   ├── assets/images/         # Logos and UI icons
│   ├── components/
│   │   └── Header.tsx         # Top nav: logo, search bar, orders & cart links
│   ├── pages/
│   │   ├── home/              # HomePage, ProductsGrid, Product (+ tests)
│   │   ├── checkout/          # CheckoutPage, CheckoutHeader, OrderSummary,
│   │   │                      # CartItemDetails, DeliveryOptions, DeliveryDate,
│   │   │                      # PaymentSummary (+ tests)
│   │   ├── orders/            # OrderPage, OrdersGrid
│   │   ├── tracking/          # TrackingPage
│   │   └── Error404Page.jsx
│   ├── utils/
│   │   └── money.ts           # formatMoney(cents) → "$12.34" (+ tests)
│   ├── App.tsx                # Route definitions & global cart state
│   └── main.tsx               # App entry point (BrowserRouter)
├── setupTests.js              # jest-dom matchers for Vitest
├── vite.config.ts             # Dev proxy, React Compiler, build output
├── vitest.config.js           # Test environment (jsdom)
└── package.json
```

---

## 🧭 Routes

| Path                              | Page          | Description |
|-----------------------------------|---------------|-------------|
| `/`                               | Home          | Product catalog; supports `?search=<term>` |
| `/checkout`                       | Checkout      | Review cart, pick delivery options, place order |
| `/orders`                         | Orders        | Order history with "Buy again" |
| `/tracking/:orderId/:productId`   | Tracking      | Delivery progress for one item |
| `*`                               | 404           | Page not found |

---

## ⚙️ How It Works

- **Global cart state** lives in `App.tsx`. A `loadCart()` function fetches `GET /api/cart-items?expand=product` and is passed down to pages, so any page that changes the cart (add, update, delete, order) refreshes the shared state.
- **Prices are handled in cents** throughout the app and formatted only for display with `formatMoney()`, which avoids floating-point rounding errors.
- **Payment summary** is recalculated by the server (`GET /api/payment-summary`) whenever the cart changes.
- **Tracking progress** is computed on the client:
  `progress = (now − orderTime) / (estimatedDelivery − orderTime)`
  - `< 33%` → Preparing
  - `33–99%` → Shipped
  - `≥ 100%` → Delivered

### API endpoints used

| Method | Endpoint | Used by |
|--------|----------|---------|
| `GET`    | `/api/products[?search=]` | Home page |
| `GET`    | `/api/cart-items?expand=product` | App (global cart) |
| `POST`   | `/api/cart-items` | Add to cart / Buy again |
| `PUT`    | `/api/cart-items/:productId` | Update quantity / delivery option |
| `DELETE` | `/api/cart-items/:productId` | Remove from cart |
| `GET`    | `/api/delivery-options?expand=estimatedDeliveryTime` | Checkout |
| `GET`    | `/api/payment-summary` | Checkout |
| `POST`   | `/api/orders` | Place order |
| `GET`    | `/api/orders?expand=products` | Orders page |
| `GET`    | `/api/orders/:orderId?expand=products` | Tracking page |

See the backend README for full request/response details.

---

## 🧪 Testing

Component and unit tests use **Vitest** and **React Testing Library**, with Axios mocked so tests run without a backend.

```bash
npx vitest run
```

Covered so far:

- `formatMoney` utility
- `Product` and `HomePage`: rendering, quantity selection, add to cart
- `CheckoutPage`, `CheckoutHeader`, `CartItemDetails` (update & delete), `DeliveryOptions`, `DeliveryDate`, `PaymentSummary` (place order)

> 💡 Tip: add `"test": "vitest"` to the `scripts` section of `package.json` so you can run `npm test`.

---

## 📦 Building for Production

```bash
npm run build
```

The build output goes straight into **`../ecommerce-backend/dist`**. The Express backend serves this folder as static files and falls back to `index.html` for client-side routes, so the **whole app can be deployed as one Node.js server**:

```bash
cd ../ecommerce-backend
npm start
# → http://localhost:3000
```

---

## 🙏 Acknowledgements

- Built while following the [SuperSimpleDev](https://github.com/SuperSimpleDev) React course and its [ecommerce-project](https://github.com/SuperSimpleDev/ecommerce-project).
- Product images and design assets come from the course materials.

---

## 📄 License

This project is for educational purposes. Add a license of your choice (for example, [MIT](https://choosealicense.com/licenses/mit/)) before distributing.
