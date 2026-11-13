# Axiom Fashion — Full-Stack E-Commerce & Retail Management Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe)

A production-grade, full-stack e-commerce web platform engineered for luxury apparel brands. Combines a responsive, conversion-optimized storefront with secure Stripe checkout workflows, real-time inventory tracking, and a comprehensive custom administrative management dashboard.

---

## 🏗️ Architecture Overview

```
                                  [ Client Browser ]
                                          │
                                          ▼
                         [ Next.js 15 App Router & SSR ]
                                          │
                 ┌────────────────────────┼────────────────────────┐
                 ▼                        ▼                        ▼
       [ Storefront & Cart ]     [ Admin Dashboard ]      [ REST / Route APIs ]
       (Responsive Tailwind UI)  (Catalog/Orders/Stock)   (Next.js Route Handlers)
                 │                        │                        │
                 └────────────────────────┼────────────────────────┘
                                          │
                                          ▼
                            [ Prisma ORM (Type-Safe) ]
                                          │
                                          ▼
                                   [ MySQL Database ]
                                          ▲
                                          │ (Webhooks & Events)
                             [ Stripe Payment Gateway ]
```

---

## ✨ Key Capabilities

### 1. Storefront & Customer Experience
* **Responsive Product Catalog:** Dynamic categorization, multi-criteria filtering (category, color, size, price), and fuzzy search.
* **Interactive Cart & Drawer:** Frictionless client-side state management with sliding cart drawer, real-time quantity updates, and subtotal calculation.
* **Server-Side Rendering (SSR):** Optimized Core Web Vitals, dynamic OpenGraph metadata, and SEO-friendly routing for catalog pages.
* **Product Detail Views:** Multi-image galleries, material spec sheets, customer reviews, and integrated 3D model support.

### 2. Payments & Order Lifecycle
* **Stripe Checkout Integration:** Secure payment flow supporting major cards and local payment methods via Stripe Elements.
* **Idempotent Webhook Processing:** Dedicated webhook handler (`/api/webhooks/stripe`) for asynchronous payment verification, automated order status transition (`pending → paid`), and stock decrementing.
* **Customer Order Tracking:** Order confirmation and lookup by order number and customer session.

### 3. Custom Administrative Management Console
* **Product Management:** Dynamic product creation, variant configuration (colors, hex codes, sizing tiers), and tag assignment.
* **Order & Inventory Dashboard:** Real-time visibility into customer orders, fulfillment workflows, and low-stock alerts.
* **Role-Based Access:** Protected admin layout and middleware guarding management routes.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide React Icons
* **Backend:** Next.js Server Components, API Route Handlers, Node.js
* **ORM & Database:** Prisma ORM with MySQL (relational schema with indexes on foreign keys and slugs)
* **Payment Processing:** Stripe API & Stripe Webhooks
* **Deployment & Containerization:** Multi-stage production Dockerfile, Docker Compose, Vercel ready

---

## 📂 Project Structure

```
axiom-fashion/
├── prisma/
│   └── schema.prisma         # Relational schema (Products, Variants, Orders, Reviews)
├── public/
│   └── images/               # High-res collection assets and branding
├── src/
│   ├── app/
│   │   ├── admin/            # Custom Admin Console (Dashboard, Products, Orders)
│   │   ├── api/
│   │   │   ├── checkout/     # Stripe session creation
│   │   │   ├── orders/       # Order persistence & retrieval
│   │   │   └── webhooks/     # Async Stripe webhook listeners
│   │   ├── product/[slug]/   # Dynamic SSR product detail view
│   │   └── shop/             # Filterable product catalog
│   ├── components/
│   │   ├── cart/             # Slide-over cart drawer & state
│   │   ├── checkout/         # Stripe Payment element forms
│   │   ├── home/             # Hero, Featured Collections, Brand pillars
│   │   └── ui/               # Reusable primitives (Buttons, Modals, Drawers)
│   └── stores/               # Zustand / Context client state stores
├── Dockerfile                # Multi-stage production container build
└── docker-compose.yml        # Orchestrated web app + MySQL database
```

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18+ or Docker & Docker Compose
* MySQL 8.0+

### Option A: Running with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/uttamchandak-dev/axiom-fashion.git
cd axiom-fashion

# Spin up web app and database in one command
docker compose up -d --build
```
Access the application at `http://localhost:3000`.

### Option B: Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://root:password@localhost:3306/axiom_fashion"
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   ```

3. **Run database migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 👨‍💻 Author & Inquiries

**Uttam Chandak** — Independent Full-Stack Web Developer  
*Specializing in e-commerce, custom management dashboards, and modern web applications.*  
* **Email:** [uttamchandak5@gmail.com](mailto:uttamchandak5@gmail.com)  
* **GitHub:** [@uttamchandak-dev](https://github.com/uttamchandak-dev)
