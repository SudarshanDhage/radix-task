# TaskMan - Landing Page

A modern, animated landing page built with Next.js, featuring email signup functionality with coupon rewards.

## 🚀 Features

- **Animated Hero Section** - Interactive hero cards with smooth entrance animations
- **Benefits Showcase** - Sequential animations for benefit cards
- **Why Section** - Animated illustrations and compelling content
- **Email Signup** - Collect emails and send coupon codes via Resend
- **Responsive Design** - Fully responsive across all screen sizes
- **Database Integration** - PostgreSQL with Prisma ORM
- **Email Logging** - Track all email sends in the database

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Email Service**: Resend
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Supabase recommended)
- Resend account for email functionality

## 🔧 Setup

### 1. Clone the repository

```bash
git clone https://github.com/SudarshanDhage/radix-task.git
cd radix-task
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:

- `DATABASE_URL` - PostgreSQL connection string (Supabase pooling port 6543)
- `DIRECT_URL` - Direct PostgreSQL connection (port 5432 for migrations)
- `RESEND_API_KEY` - Your Resend API key from [resend.com/api-keys](https://resend.com/api-keys)
- `RESEND_FROM_EMAIL` - Email sender address (e.g., `TaskMan <noreply@yourdomain.com>`)

### 4. Database Setup

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Seed the database
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed the database

## 🌐 Deployment

### Vercel Deployment

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Environment Variables**
   - Add all variables from `.env.example` in Vercel dashboard
   - Settings → Environment Variables

3. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run db:generate && npm run build`
   - Install Command: `npm install`

4. **Deploy**
   - Vercel will automatically deploy on push to `main` branch
   - Or deploy manually via Vercel CLI: `vercel --prod`

### Resend Email Setup

1. **Create Account**
   - Sign up at [resend.com](https://resend.com)

2. **Verify Domain** (Required for production)
   - Go to [resend.com/domains](https://resend.com/domains)
   - Add your domain (e.g., `redistask.shop`)
   - Add DNS records as instructed
   - Wait for verification

3. **Get API Key**
   - Go to [resend.com/api-keys](https://resend.com/api-keys)
   - Create a new API key
   - Add to environment variables as `RESEND_API_KEY`

4. **Configure From Email**
   - Update `RESEND_FROM_EMAIL` to use your verified domain
   - Format: `TaskMan <noreply@yourdomain.com>`

## 📁 Project Structure

```
radix-task/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Database seed script
├── public/
│   └── assets/            # Static assets (SVGs, images)
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── api/           # API routes
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # React components
│   │   ├── Benefits/      # Benefits section
│   │   ├── EmailForm/     # Email signup form
│   │   ├── Header/        # Navigation header
│   │   ├── Hero/          # Hero section
│   │   ├── Logos/         # Company logos
│   │   ├── Signup/        # Signup section
│   │   └── Why/           # Why section
│   ├── constants/         # Constants and data
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   │   ├── coupons/       # Coupon logic
│   │   ├── db/            # Database client
│   │   └── email/         # Email service
│   └── utils/             # Utility functions
└── vercel.json            # Vercel configuration
```

## 🎨 Features Overview

### Animations
- Hero cards animate on page load
- Benefits icons, titles, and descriptions animate sequentially
- Why section shapes and illustrations animate in sequence
- Signup form slides up from bottom
- All animations trigger when sections enter viewport

### Email Functionality
- Validates email format
- Checks for duplicate signups
- Generates unique coupon codes
- Sends welcome email with coupon via Resend
- Logs all email attempts in database

## 🔒 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection (pooling) | `postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | Direct PostgreSQL connection | `postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres` |
| `RESEND_API_KEY` | Resend API key | `re_xxxxxxxxxxxxx` |
| `RESEND_FROM_EMAIL` | Email sender address | `TaskMan <noreply@redistask.shop>` |

## 📝 License

This project is private and proprietary.

## 👤 Author

Sudarshan Dhage

## 🔗 Links

- **Live Site**: [https://redistask.shop](https://redistask.shop)
- **Repository**: [https://github.com/SudarshanDhage/radix-task](https://github.com/SudarshanDhage/radix-task)
