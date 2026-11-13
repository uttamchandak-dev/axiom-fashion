# AXIOM Fashion — Production Deployment Guide

This guide details how to deploy the **AXIOM Premium 3D Fashion Platform** to production across multiple cloud environments.

---

## 1. Deploying to Vercel (Recommended — Zero Config)

Vercel natively supports Next.js 15 App Router, React Three Fiber, and Prisma ORM.

### Steps:
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
3. Import your `axiom-fashion` repository.
4. Add the following **Environment Variables** in the Vercel project settings:
   - `DATABASE_URL`: Your hosted MySQL connection string (e.g. from PlanetScale, AWS RDS, or Railway).
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.com`
   - `STRIPE_SECRET_KEY`: `sk_live_...` (optional for real payments)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: `pk_live_...` (optional)
5. Click **Deploy**. Vercel will automatically build the standalone bundle and configure global CDN caching for all 3D assets and high-res images.

---

## 2. Deploying with Docker & Docker Compose (Self-Hosted / AWS / DigitalOcean / VPS)

The project includes a multi-stage `Dockerfile` and `docker-compose.yml` that orchestrates the Next.js frontend and a MySQL 8.0 database container.

### Steps:
1. Ensure Docker and Docker Compose are installed on your server.
2. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd axiom-fashion
   ```
3. Start the entire application and database in the background:
   ```bash
   docker compose up --build -d
   ```
4. Run database migrations and seed the initial catalog:
   ```bash
   docker compose exec app npx prisma db push
   docker compose exec app npx prisma db seed
   ```
5. Your application will be live at `http://YOUR_SERVER_IP:3000`.

---

## 3. Deploying to Railway

1. Click **"New Project"** on [Railway](https://railway.app).
2. Select **"Provision MySQL"** to create your database.
3. Select **"Deploy from GitHub repo"** and connect `axiom-fashion`.
4. In the app settings, set `DATABASE_URL` to `${{MySQL.DATABASE_URL}}`.
5. Railway will build and launch your application automatically with SSL enabled.

---

## 4. Local Production Test

To test the optimized production build locally on your machine:
```bash
npm run build
npm run start
```
Open **[http://localhost:3000](http://localhost:3000)** to verify production performance.
