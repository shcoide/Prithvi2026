# Prithvi 2026

The official web application for **Prithvi**, the annual Earth Science symposium organized by the Department of Geology and Geophysics, **IIT Kharagpur**. Built to handle the complete participant lifecycle — event browsing, registration with OTP-verified email and payment screenshot uploads, QR-based attendance tracking, and an admin panel for the fest organizers.

Built with [Next.js](https://nextjs.org) (App Router), MongoDB Atlas, and several third-party integrations (Brevo, Google Sheets, Uploadthing).

---

## Deployment Status

> **Prithvi 2026 has concluded.** The fest ran successfully, and the DigitalOcean Droplet provisioned for the event has been shut down — IIT Kharagpur's DigitalOcean subscription for this project is no longer active. The application has been migrated to **Vercel** for archival and development purposes; it isn't live as a public event platform anymore, but everything runs correctly and the deployment is maintained as a working reference.
>
> If you're here to understand how the live production system was architected, go to [Production Architecture (DigitalOcean)](#production-architecture-digitalocean). For the current state of the project, see [Current Deployment (Vercel)](#current-deployment-vercel).

---

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19, TypeScript
- **Database:** MongoDB (via Mongoose), hosted on MongoDB Atlas
- **Auth:** JWT (`jsonwebtoken`) + bcrypt, email OTP verification
- **Email:** Nodemailer via Brevo SMTP
- **File uploads:** Uploadthing (payment screenshots); AWS S3 SDK also present
- **Spreadsheet sync:** Google Sheets API (service account) — registrations mirrored in real time
- **QR / attendance:** `html5-qrcode` (scanning), `qrcode` (generation)
- **Original hosting:** PM2 + Nginx on DigitalOcean Droplet
- **Current hosting:** Vercel (serverless)

---

## Features

- Public-facing pages: home, events, schedule, gallery, team, contact, sponsors
- Participant registration with email OTP verification and payment screenshot upload
- Participant profile / "my registrations" dashboard
- Event-specific registration flows (each event has its own form and eligibility logic)
- Admin panel (`/addmin`) — login, view/export all registrations, bulk hall assignment, attendance export
- QR-based check-in and attendance tracking at venues

---

## Production Architecture (DigitalOcean)

This section documents how the application was deployed and how data moved through the system when the fest was live. The files referenced here (`deploy.sh`, `setup-server.sh`, `nginx.conf`, `ecosystem.config.js`) are kept in the repo exactly for this reason — they're the production record of how this was actually run.

### Server Setup

The Droplet was provisioned once using `setup-server.sh`, which automated the full server bootstrap:

- Installed Node.js 20, PM2, Nginx, and Certbot
- Configured UFW firewall — only ports 22 (SSH), 80 (HTTP), and 443 (HTTPS) open
- Generated and configured TLS certificates via Certbot for `prithvi2026.com`
- Set up Nginx as a reverse proxy pointing to the Next.js process on `localhost:3000`
- Registered the app with PM2 so it survived crashes and reboots automatically

The PM2 process definition lives in `ecosystem.config.js`. The full Nginx config (reverse proxy, TLS, static asset caching headers, HTTP→HTTPS redirect) is in `nginx.conf`.

### Deployment Workflow

Deployments were done from a local machine with `deploy.sh`. The script:

1. Ran `npm run build` locally to produce the Next.js production build
2. Rsynced the build output to the Droplet over SSH
3. Restarted the PM2 process on the server

This meant deployments were fast (just the diff), rollbacks were straightforward (re-rsync an older build), and the production process was always running the exact same built output that was tested locally.

### Data Flow

Here's how data moved through the system during the fest:

```
Participant's Browser
        │
        ▼
   Nginx (port 443)
   ├── TLS termination (Certbot certs)
   ├── HTTP → HTTPS redirect
   └── Static asset caching headers
        │
        ▼
   PM2 → Next.js Server (localhost:3000)
        │
        ├──────────────────────────────► MongoDB Atlas
        │                                (user accounts, registrations,
        │                                 events, attendance records,
        │                                 hall assignments)
        │
        ├──────────────────────────────► Uploadthing
        │                                (payment screenshot uploads —
        │                                 file goes browser → Uploadthing
        │                                 directly; Next.js only stores
        │                                 the returned URL in MongoDB)
        │
        ├──────────────────────────────► Brevo SMTP
        │                                (OTP emails for registration
        │                                 verification)
        │
        └──────────────────────────────► Google Sheets API
                                         (every new registration is
                                          mirrored to a shared sheet
                                          for the fest committee in
                                          real time)
```

**Registration flow:** A participant signs up with their email, receives an OTP, verifies it, fills in event details, uploads a payment screenshot, and submits. The screenshot goes directly from the browser to Uploadthing — the server never handles the file bytes, only the resulting URL. Everything else (user record, registration record, Google Sheet row) is written synchronously before the API responds.

**QR-based attendance:** On successful registration, participants received a unique QR code. At event venues, volunteers used the `/addmin` panel to scan QR codes — each scan hit an API route that marked attendance in MongoDB and recorded the hall/seat assignment. The admin panel also supported bulk assignment if needed.

**Admin access:** The admin panel (`/addmin`) is completely separate from the participant auth flow, uses its own JWT secret (`ADMIN_JWT_SECRET`), and is protected by `ADMIN_PASSWORD`. All registration data, payment screenshots (as Uploadthing URLs), and attendance records are visible and exportable from there.

### Why This Setup Made Sense for a Live Fest

Vercel was a viable option from day one given the app's architecture, but the Droplet was the right call for running a live event. A single persistent Node.js process meant we could tail logs in real time with `pm2 logs` as registrations came in, debug issues instantly without thinking about serverless cold starts or function timeouts, and keep the deployment model simple enough that anyone on the team could push a fix during the fest without needing to understand Vercel's deployment pipeline. For a 3–4 day event with intermittent bursts of traffic and people actively watching the system, that predictability was worth more than the cost savings.

---

## Current Deployment (Vercel)

After Prithvi 2026 concluded, the DigitalOcean subscription was not renewed. The app has been migrated to Vercel, where it runs in its current form as a development and archival deployment.

### Why the Migration Was Clean

The application was serverless-compatible by design — no local filesystem usage at runtime, no WebSockets, no background processes, no cron jobs. Every external dependency was already a managed service: MongoDB Atlas for data, Uploadthing for files, Brevo for email. Moving to Vercel required **zero code changes** — it was purely an infrastructure swap.

### What Changed

| Aspect | DigitalOcean (Fest) | Vercel (Now) |
|---|---|---|
| Deploy process | `deploy.sh` (rsync + SSH) | Git push → auto-deploy |
| TLS | Certbot + Nginx | Vercel-managed, automatic |
| Process management | PM2 (persistent Node.js) | Serverless functions |
| MongoDB access | Droplet static IP allowlisted | `0.0.0.0/0` (Vercel has no static IP) |
| Log access | `pm2 logs` over SSH | Vercel dashboard |
| HTTP → HTTPS | Nginx redirect | Vercel handles automatically |
| Cost | Paid Droplet | Free tier |

The only configuration change that actually mattered: **MongoDB Atlas Network Access** had to be opened to `0.0.0.0/0` because Vercel serverless functions don't have a static outbound IP. On the Droplet, we allowlisted a single IP. On Vercel, that model doesn't apply.

### Setting It Up on Vercel

1. Import the repo at [vercel.com/new](https://vercel.com/new). Next.js is auto-detected; the default build command (`next build`) works without any changes.
2. Add all environment variables in **Project Settings → Environment Variables** — see the full list in [Environment Variables](#environment-variables) below. Never put them in a committed file.
3. In **MongoDB Atlas → Network Access**, allow `0.0.0.0/0`. This is required because Vercel functions share a non-static IP range across deployments.
   - If security posture matters, use the [Vercel–MongoDB Atlas integration](https://vercel.com/integrations/mongodb) instead — it manages the connection credential at the Atlas level rather than opening up all IPs.
4. Point `prithvi2026.com` to Vercel under **Project Settings → Domains** and update DNS at the registrar. Vercel provisions and renews TLS automatically.

### Files That Are Now Obsolete (But Kept)

`deploy.sh`, `setup-server.sh`, `nginx.conf`, and `ecosystem.config.js` were written for the DigitalOcean + PM2 + Nginx setup. They don't do anything for the Vercel deployment, but they're kept in the repo intentionally — they're the complete record of how the production system was actually built and run during the fest. If you're reading this codebase to understand the project, they're worth looking at.

---

## Running Locally

### Prerequisites

- Node.js 20+
- MongoDB — either [MongoDB Atlas free tier](https://www.mongodb.com/atlas) or a local instance (`mongodb://localhost:27017/prithvi`)
- Optional, only if you need those specific features:
  - [Brevo](https://www.brevo.com/) SMTP account — for OTP emails
  - Google Cloud service account with Sheets access — for registration mirroring
  - [Uploadthing](https://uploadthing.com/) app — for payment screenshot uploads

### Install

```bash
npm install
```

### Environment Variables

Create `.env.local` in the project root. This file is gitignored — never commit it.

```bash
# Database — the only variable strictly required to boot the app
MONGODB_URI=mongodb://localhost:27017/prithvi

# Auth
JWT_SECRET=some-long-random-string
ADMIN_JWT_SECRET=another-long-random-string
ADMIN_PASSWORD=choose-an-admin-password

# Feature flag — set to false to disable new registrations
REGISTRATION_OPEN=true

# Email OTP — Brevo SMTP
BREVO_SMTP_USER=your-brevo-smtp-user
BREVO_SMTP_KEY=your-brevo-smtp-key

# Google Sheets sync (optional)
# Registration still works without these — sheet-mirroring paths will throw if missing
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Uploadthing (payment screenshot uploads)
UPLOADTHING_TOKEN=your-uploadthing-token
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_URL=https://uploadthing.com
```

`MONGODB_URI` is the only variable needed to boot the app and reach the database. Skip the rest if you don't need those features — they fail gracefully at runtime without taking down the whole app.

### Run

```bash
npm run dev    # dev server at localhost:3000
npm run build  # production build
npm run start  # serve the production build locally
```

There are standalone utility scripts in the repo root (`test_db.ts`, `test_ut.ts`, `scripts/migrateusers.ts`) that can be run with `tsx` or `ts-node` for one-off database checks. Inspect them before running — they operate on real data.

---

## Project Structure

```
app/            Next.js App Router pages & API routes
  addmin/       Admin panel UI
  api/          Backend API routes (auth, registration, admin, events, uploads...)
lib/            Server-side helpers: db, auth, email, mongodb, sheets, storage, config
utils/          Client-side helpers (Uploadthing client)
data/           Local JSON data (gitignored for new files — see housekeeping note)
public/         Static assets

# Production infrastructure (historical reference — DigitalOcean setup)
deploy.sh               Build and rsync to Droplet
setup-server.sh         One-time server bootstrap (Node, PM2, Nginx, Certbot, UFW)
nginx.conf              Reverse proxy config
ecosystem.config.js     PM2 process definition
```

---

## Housekeeping Notes

**Committed participant data — needs cleanup before making this repo public.**

`data/db.json` and one file under `data/uploads/payments/` are tracked in git and currently live in the repository's history on GitHub. They predate the `/data/` gitignore rule, which only stops new files from being tracked — it doesn't retroactively remove what was already committed.

`db.json` contains real participant data: names, emails, phone numbers, bcrypt password hashes, and references to payment screenshot uploads. The app no longer reads from this file (everything is in MongoDB + Uploadthing), but the data is in git history.

**Minimum fix:**
```bash
git rm --cached data/db.json data/uploads/payments/<filename>
# add a commit
git push
```

This removes the files from future commits but leaves the data in old commits. If that's acceptable (private repo, internal audience), this is enough.

**Full fix (if data privacy matters):**
```bash
# Use git-filter-repo or BFG Repo Cleaner to rewrite history
# Then force-push and have all collaborators re-clone
```

This scrubs the data from all commits. More disruptive, but the right call if the repo needs to be public-safe.