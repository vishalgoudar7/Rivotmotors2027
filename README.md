# RIVOT Motors Next.js Starter

## Stack
Next.js + React + TypeScript + PostgreSQL + Prisma.

## Start
1. `npm install`
2. Copy `.env.example` to `.env`
3. Set `DATABASE_URL`
4. `npx prisma generate`
5. `npx prisma migrate dev --name init`
6. `npm run dev`

Open http://localhost:3000

## Folders
- app/ = pages and API routes
- components/ = reusable UI
- lib/ = server utilities/database
- prisma/ = PostgreSQL schema
- public/images = RIVOT images
- public/videos = product videos
- public/icons = icons
- public/fonts = fonts

## Next
Replace placeholder vehicle visuals with your existing RIVOT assets, then connect bookings, payments, email, blog/forum and admin APIs.
