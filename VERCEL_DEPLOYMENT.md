# Vercel Deployment Guide

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub repository connected (already done: https://github.com/SudarshanDhage/radix-task)

## Step 1: Login to Vercel CLI

```bash
vercel login
```

This will open a browser window for authentication.

## Step 2: Link Project to Vercel

```bash
vercel link
```

This will:
- Ask if you want to link to an existing project or create a new one
- Choose "Create a new project"
- Set project name (or use default: `radix-task`)
- Set up project settings

## Step 3: Set Environment Variables

You need to set these environment variables in Vercel:

### Option A: Via Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following:

```
DATABASE_URL = your_postgresql_connection_string
DIRECT_URL = your_postgresql_direct_connection_string
RESEND_API_KEY = your_resend_api_key
RESEND_FROM_EMAIL = TaskMan <noreply@yourdomain.com>
```

### Option B: Via CLI
```bash
vercel env add DATABASE_URL
vercel env add DIRECT_URL
vercel env add RESEND_API_KEY
vercel env add RESEND_FROM_EMAIL
```

## Step 4: Deploy

### For Preview Deployments
```bash
vercel
```

### For Production Deployment
```bash
vercel --prod
```

## Step 5: Run Database Migrations

After deployment, you need to run Prisma migrations:

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Or use migrations
npm run db:migrate

# Seed initial coupons
npm run db:seed
```

**Note**: You can run these commands locally pointing to your production database, or use Vercel's build command to run migrations during deployment.

## Alternative: Deploy via GitHub Integration

1. Go to https://vercel.com/new
2. Import your GitHub repository: `SudarshanDhage/radix-task`
3. Configure project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
4. Add environment variables (same as Step 3)
5. Click "Deploy"

## Post-Deployment Checklist

- [ ] Environment variables are set
- [ ] Database migrations are run
- [ ] Initial coupons are seeded
- [ ] Email service is configured
- [ ] Test signup flow works
- [ ] Test email delivery works

## Troubleshooting

### Build Fails
- Check environment variables are set
- Verify DATABASE_URL is accessible from Vercel
- Check build logs in Vercel dashboard

### Database Connection Issues
- Ensure DATABASE_URL uses connection pooling (port 6543 for Supabase)
- Check if your database allows connections from Vercel IPs
- Verify credentials are correct

### Email Not Sending
- Verify RESEND_API_KEY is correct
- Check RESEND_FROM_EMAIL format
- Verify domain is verified in Resend (if using custom domain)

## Vercel Project URL

After deployment, your project will be available at:
- Preview: `https://radix-task-[hash].vercel.app`
- Production: `https://radix-task.vercel.app` (or your custom domain)
