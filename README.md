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

## Booking payment flow
The booking form creates a `PENDING` row in the existing MySQL `orders` table and redirects to `/booking/payment`. Set these server-only variables before enabling the payment button:

- `ZAAKPAY_PAYMENT_URL`: your Zaakpay payment initiation endpoint
- `ZAAKPAY_SECRET`: the secret used to verify the JSON callback at `/api/booking/verify`
- `ZAAKPAY_RETURN_URL`: public URL Zaakpay can POST to, ending in `/api/booking/callback`

The verified callback must send `responseCode`, `orderId`, `paymentId`, `bookingData`, and an HMAC-SHA256 `checksum`. A successful callback updates the order and redirects to `/booking/thank-you`, followed by `/booking/success` for the booking details. Failed verification goes to `/booking/payment-failed`.

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
