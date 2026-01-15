# Coupon System Setup Guide (Prisma)

This guide will help you set up the coupon management and email distribution system using Prisma.

## Prerequisites

1. Node.js 18+ installed
2. A PostgreSQL database (options below)
3. A Resend account (free tier: 3,000 emails/month)

---

## Step 1: Set Up PostgreSQL Database

You have several options for PostgreSQL:

### Option A: Supabase (Recommended - Free Tier)

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in project details:
   - Name: `taskman-coupons` (or your preferred name)
   - Database Password: (save this securely)
   - Region: Choose closest to you
4. Wait for project to be created (~2 minutes)
5. Go to **Project Settings** → **Database**
6. Copy the connection strings:
   - **Connection Pooling** (port 6543) → `DATABASE_URL`
   - **Direct Connection** (port 5432) → `DIRECT_URL`
7. Update `.env.local` with both URLs:
   ```env
   # Connection Pooling (for application queries)
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
   
   # Direct Connection (for migrations)
   DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
   ```
   
   **Note**: Replace `[PROJECT-REF]`, `[PASSWORD]`, and `[REGION]` with your actual values.

### Option B: Railway (Free Tier Available)

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Provision PostgreSQL"
3. Copy the **DATABASE_URL** from the PostgreSQL service
4. Add to `.env.local`

### Option C: Neon (Free Tier Available)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the **Connection string**
4. Add to `.env.local`

### Option D: Local PostgreSQL

1. Install PostgreSQL locally
2. Create database: `createdb taskman`
3. Use connection string:
   ```
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taskman
   ```

---

## Step 2: Set Up Prisma

### 2.1 Generate Prisma Client

```bash
npm run db:generate
```

This reads `prisma/schema.prisma` and generates the Prisma Client.

### 2.2 Push Schema to Database

```bash
npm run db:push
```

This creates/updates the database tables based on your Prisma schema.

**Alternative: Use Migrations (Recommended for Production)**

```bash
npm run db:migrate
```

This creates a migration file and applies it to the database.

### 2.3 Seed Initial Coupons

```bash
npm run db:seed
```

This populates the database with initial coupon codes:
- `WELCOME10` - 10% off (1000 uses)
- `SAVE20` - 20% off (500 uses, expires in 90 days)
- `FIRST50` - $50 off (100 uses)

---

## Step 3: Set Up Resend Email Service

### 3.1 Create Resend Account

1. Go to [resend.com](https://resend.com) and sign up
2. Verify your email address

### 3.2 Get API Key

1. Go to **API Keys** section
2. Click **Create API Key**
3. Name it: `TaskMan Production` (or similar)
4. Copy the API key → `RESEND_API_KEY`

### 3.3 Verify Domain (Optional but Recommended)

For production, you should verify your domain:
1. Go to **Domains**
2. Click **Add Domain**
3. Follow DNS verification steps
4. Once verified, use: `TaskMan <noreply@yourdomain.com>`

For development/testing, you can use Resend's test domain:
- `RESEND_FROM_EMAIL=TaskMan <onboarding@resend.dev>`

---

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your environment variables in `.env.local`:
   ```env
   # Supabase Connection Pooling (for application queries)
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
   
   # Direct Connection (for migrations and Prisma Studio)
   DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
   
   RESEND_API_KEY=re_xxxxx
   RESEND_FROM_EMAIL=TaskMan <onboarding@resend.dev>
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
   
   **Quick Setup**: If you already have Supabase credentials, you can copy from `.env.local.example` and update the password.

3. **Important**: Never commit `.env.local` to git (it's already in `.gitignore`)

---

## Step 5: Test the Setup

### 5.1 Start Development Server

```bash
npm run dev
```

### 5.2 Test Signup Flow

1. Navigate to `http://localhost:3000`
2. Scroll to the signup section
3. Enter a test email address
4. Click "Try for free"
5. Check:
   - ✅ Success toast appears
   - ✅ Email received with coupon code
   - ✅ Database shows new signup record
   - ✅ Coupon usage count incremented

### 5.3 Verify Database

**Using Prisma Studio (Visual Database Browser):**
```bash
npm run db:studio
```

This opens a browser at `http://localhost:5555` where you can:
- View all tables
- See signup records
- Check coupon usage
- View email logs

**Or use your database client:**
- Connect to your PostgreSQL database
- Check `coupons` table
- Check `user_signups` table
- Check `email_logs` table

---

## Step 6: Production Deployment

### 6.1 Environment Variables

Add all environment variables to your hosting platform:

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add each variable from `.env.local`
3. Make sure to add `DATABASE_URL` with production database

**Other Platforms:**
- Follow platform-specific instructions for environment variables

### 6.2 Generate Prisma Client in Production

Add to your build script:
```json
{
  "scripts": {
    "build": "prisma generate && next build"
  }
}
```

### 6.3 Run Migrations

Before deploying, run migrations:
```bash
npm run db:migrate
```

Or use `prisma migrate deploy` in production (for CI/CD).

### 6.4 Update App URL

Change `NEXT_PUBLIC_APP_URL` to your production domain:
```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 6.5 Verify Domain in Resend

Make sure your domain is verified in Resend for production emails.

---

## Prisma Commands Reference

```bash
# Generate Prisma Client (after schema changes)
npm run db:generate

# Push schema changes to database (development)
npm run db:push

# Create and apply migration (recommended)
npm run db:migrate

# Open Prisma Studio (visual database browser)
npm run db:studio

# Seed database with initial data
npm run db:seed
```

---

## Troubleshooting

### Issue: "Can't reach database server"
**Solution**: 
- Check `DATABASE_URL` is correct
- Verify database is running
- Check network/firewall settings
- For Supabase: Check connection pooling settings

### Issue: "Prisma Client not generated"
**Solution**: Run `npm run db:generate`

### Issue: "Table does not exist"
**Solution**: Run `npm run db:push` or `npm run db:migrate`

### Issue: Email not sending
**Solution**: 
- Check Resend dashboard for errors
- Verify `RESEND_API_KEY` is correct
- Check `RESEND_FROM_EMAIL` format
- For development, use `onboarding@resend.dev`

### Issue: "Email already registered"
**Solution**: This is expected behavior. Each email can only sign up once.

### Issue: "No coupons available"
**Solution**: 
- Run `npm run db:seed` to create initial coupons
- Check `coupons` table has active coupons
- Verify `isActive = true`
- Check `maxUses` hasn't been reached
- Check `validUntil` hasn't passed

### Issue: Prisma Client errors
**Solution**:
- Run `npm run db:generate` after schema changes
- Restart your dev server
- Clear `.next` folder and rebuild

---

## Database Schema Overview

### `coupons` Table
- Stores all available coupon codes
- Tracks usage limits and expiration
- Supports percentage or fixed discounts

### `user_signups` Table
- Tracks user signups
- Links users to assigned coupons
- Records email delivery status

### `email_logs` Table
- Logs all email sending attempts
- Useful for debugging and analytics

---

## Security Notes

1. **Never expose `DATABASE_URL`** in client-side code
2. **Rate Limiting**: The API has basic rate limiting (5 requests/minute per IP)
3. **Email Validation**: Both client and server-side validation
4. **SQL Injection**: Prisma uses parameterized queries (safe)
5. **Connection Pooling**: Use connection pooling in production (Supabase/Neon provide this)

---

## Next Steps

- Monitor coupon usage in Prisma Studio
- Create admin dashboard to manage coupons
- Set up email analytics
- Add more coupon codes as needed
- Implement coupon expiry reminders
- Set up database backups

---

## Support

If you encounter issues:
1. Check Prisma logs in terminal
2. Check Resend logs in dashboard
3. Check browser console for errors
4. Use `npm run db:studio` to inspect database
5. Check Prisma documentation: https://www.prisma.io/docs
