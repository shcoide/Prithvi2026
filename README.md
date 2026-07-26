# Prithvi 2026

The official web application for **Prithvi**, the annual Earth Science symposium organized by the Department of Geology and Geophysics, **IIT Kharagpur**. It handles event listings, participant registration (with OTP-based auth and payment screenshot uploads), a QR-based attendance/hall system, participant profiles, and an admin panel for managing registrations.

Built with [Next.js](https://nextjs.org) (App Router), MongoDB, and Google Sheets/Uploadthing integrations.

> ## ⚠️ Deployment status
> This app was previously deployed on a **DigitalOcean Droplet**, provisioned under the **official DigitalOcean account of IIT Kharagpur**, and served behind Nginx with PM2 (see `deploy.sh`, `setup-server.sh`, `nginx.conf`, `ecosystem.config.js`).
>
> **The fest is now over and the backend server has been shut down**, so the site is **not live** anymore. The instructions below explain how to run the full application locally instead.

---

## Tech stack

- **Framework:** Next.js 16 (App Router) + React 19, TypeScript
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT (`jsonwebtoken`) + bcrypt, email OTP verification
- **Email:** Nodemailer via Brevo SMTP
- **File uploads:** Uploadthing (payment screenshots), with AWS S3 SDK also present
- **Spreadsheet sync:** Google Sheets API (service account) — registrations are mirrored to a sheet
- **QR / attendance:** `html5-qrcode`, `qrcode`
- **Process management (prod):** PM2 + Nginx reverse proxy

## Features

- Public pages: home, events, schedule, gallery, team, contact, sponsors
- Participant registration with email OTP and payment screenshot upload
- Participant profile / "my registrations" dashboard
- Event-specific registration flows
- Admin panel (`/addmin`) — login, view/export registrations, bulk hall assignment, attendance export
- QR-based check-in/attendance flow

## Running it locally

### 1. Prerequisites

- Node.js 20+
- A MongoDB instance — either a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or a local MongoDB server (`mongodb://localhost:27017/prithvi`)
- (Optional, only needed to exercise those features)
  - A [Brevo](https://www.brevo.com/) SMTP account, for sending OTP emails
  - A Google Cloud service account with access to a Google Sheet, for the registration-mirroring feature
  - An [Uploadthing](https://uploadthing.com/) app, for payment screenshot uploads

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/prithvi

# Auth
JWT_SECRET=some-long-random-string
ADMIN_JWT_SECRET=another-long-random-string
ADMIN_PASSWORD=choose-an-admin-password

# Feature flag
REGISTRATION_OPEN=true

# Email (OTP) — Brevo SMTP credentials
BREVO_SMTP_USER=your-brevo-smtp-user
BREVO_SMTP_KEY=your-brevo-smtp-key

# Google Sheets sync (optional — registration will still work without it,
# but sheet-mirroring code paths will throw if these are missing)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Uploadthing (payment screenshot uploads)
UPLOADTHING_TOKEN=your-uploadthing-token
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_URL=https://uploadthing.com
```

Notes:
- `MONGODB_URI` is the only variable strictly required to boot the app and hit the database.
- If you skip the Brevo, Google, or Uploadthing variables, only the features that depend on them (OTP emails, sheet sync, screenshot upload) will fail at runtime — the rest of the app still runs.
- `.env.local` is gitignored; never commit real secrets.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Other useful scripts

```bash
npm run build   # production build
npm run start   # run the production build locally
```

There are also a few standalone TypeScript utility/test scripts in the repo root (`test_db.ts`, `test_ut.ts`, `scripts/migrateusers.ts`, etc.) that can be run with `tsx` or `ts-node` for one-off DB/data checks — inspect them before running, as they act on real data.

## Project structure

```
app/            Next.js App Router pages & API routes (app/api/**)
  addmin/       Admin panel UI
  api/          Backend API routes (auth, registration, admin, events, uploads...)
lib/            Server-side helpers: db, auth, email, mongodb, sheets, storage, config
utils/          Client-side helpers (Uploadthing client)
data/           Local JSON data (gitignored — not shipped to production)
public/         Static assets
```

## Production deployment (historical reference)

The app was deployed as a Node process managed by PM2 behind Nginx on a DigitalOcean Droplet:

- `setup-server.sh` — one-time server provisioning (Node, PM2, Nginx, Certbot, firewall)
- `deploy.sh` — build locally, rsync to the droplet, restart PM2
- `ecosystem.config.js` — PM2 process definition
- `nginx.conf` — reverse proxy + static asset caching config

These scripts are kept for reference and are **not required** to run the app locally — they assume access to the (now decommissioned) Droplet.
