# Residence Monitor - Next.js Starter (Login + Dashboard)

This is a minimal Next.js (pages router) starter project with:
- Login & Register pages
- Protected Dashboard page
- Simple API routes (auth + residences) using a JSON file as storage (for demo)
- JWT authentication (stateless)

**IMPORTANT:** This starter uses a local JSON file (`/data/db.json`) for demonstration only.
Serverless platforms (Netlify) may not persist filesystem writes across invocations. For production use, replace storage with a proper DB (Supabase, Railway Postgres, or MongoDB Atlas).

## How to run locally
1. Install:
   ```
   npm install
   ```
2. Create `.env.local` in project root:
   ```
   JWT_SECRET=isi_rahasia_kamu
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
   ```
3. Start dev server:
   ```
   npm run dev
   ```
4. Open http://localhost:3000

## Deploy to Netlify (overview)
1. Push this repo to GitHub.
2. On Netlify, import project from GitHub.
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add env var on Netlify:
   - `JWT_SECRET` with same secret value.
6. Deploy.

See notes above regarding filesystem persistence for serverless. Use Supabase or Railway for persistent DB.

