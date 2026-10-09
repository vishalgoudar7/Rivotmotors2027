# Test-ride requests

The `/test-ride` form saves each request in the MySQL `test_drive_requests` table, emails the admin team, and then sends an acknowledgment to the customer's submitted email address. A request is **not** a confirmed appointment; staff still need to contact the customer.

## Flow

```text
Customer submits /test-ride
  -> browser validates the form
  -> POST /api/test-ride
  -> API validates the fields and preferred date
  -> API inserts a row with status = new and email_sent = 0
  -> API attempts the admin notification email
       -> sent: email_sent becomes 1
          -> API sends a customer acknowledgment email
       -> failed: row remains saved with email_sent = 0
  -> page shows the saved-request confirmation
```

The form is implemented in [`app/test-ride/page.tsx`](app/test-ride/page.tsx), and the API is in [`app/api/test-ride/route.ts`](app/api/test-ride/route.ts). The API returns HTTP 201 with `success`, `requestId`, `emailSent` (admin notification), `confirmationEmailSent` (customer acknowledgment), and `message` when the row is saved. Invalid input returns HTTP 400. A database save failure returns HTTP 500 and the form keeps its values so the customer can retry.

| Form field | Database column |
| --- | --- |
| Full Name | `name` |
| Email Address | `email` |
| Phone Number (`mobile`) | `phone` |
| State | `state` |
| City | `city` |
| Preferred Date (`date`) | `test_ride_date` |
| Additional Message | `message` |

The database supplies `id`, `status`, `email_sent`, `created_at`, and `updated_at`. `admin_notes` remains empty until staff add notes. The Prisma model and migration are in [`prisma/schema.prisma`](prisma/schema.prisma) and [`prisma/migrations/20261008180000_test_drive_requests/migration.sql`](prisma/migrations/20261008180000_test_drive_requests/migration.sql). The migration uses `CREATE TABLE IF NOT EXISTS` because some installations already have this table.

## Email

[`lib/email.ts`](lib/email.ts) sends **New Test Ride Booking Request - RIVOT Motors** to the valid `settings.admin_email` database setting, or `ADMIN_EMAIL` if that setting is unavailable. The email lists the submitted details and request ID, includes the RIVOT logo, and sets the customer's email as `Reply-To`. It uses the server-only `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, and `SMTP_FROM` settings. `SMTP_FROM` must match `SMTP_USER`.

After the admin email succeeds, the customer receives **Test Ride Request Received – RIVOT Motors** at the email address entered in the form. Its message is:

> Dear Customer,
>
> Thank you for choosing RIVOT Motors.
>
> We have successfully received your test ride request. Our team will review your details and assist you with the next steps.
>
> You are also welcome to visit your nearest RIVOT showroom to explore our vehicles and experience a test ride at your convenience. Our showroom team will be happy to assist you and provide all the required information.
>
> For any questions or assistance, simply reply to this email or contact our support team.
>
> We look forward to welcoming you to the RIVOT experience.
>
> Warm regards,  
> RIVOT Motors Team  
> Ride a Cleaner, Brighter Tomorrow

The customer email includes the RIVOT logo and the message above, without a request-details table. Its footer says the appointment is not yet confirmed.

If the admin email fails, the request is still in MySQL with `email_sent = 0` and the customer acknowledgment is not sent. If only the customer email fails, the saved request and admin notification remain intact. The page shows the appropriate delay message, and the API logs the failure. Staff can inspect rows in phpMyAdmin; there is not yet a test-ride list in the site's admin dashboard or an automatic email retry.

## Verification

`npm run smtp:verify` checks SMTP authentication without sending an email. To test the entire flow, submit the form at `http://localhost:3000/test-ride`, then check `test_drive_requests`, the admin inbox, and the customer's inbox. This creates a real row and sends real emails.
