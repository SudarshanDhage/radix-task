# Resend Email Setup Guide

## Current Status
✅ Resend is already integrated in the codebase
✅ Environment variables are configured in Vercel
⚠️ Need to verify domain or use test domain

## Step 1: Get Resend API Key

1. Go to [resend.com](https://resend.com) and sign in (or create account)
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Name it: `TaskMan Production`
5. Copy the API key (starts with `re_`)

## Step 2: Update Vercel Environment Variables

### Option A: Via Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Select your project: `radix-task`
3. Go to **Settings** → **Environment Variables**
4. Update `RESEND_API_KEY` with your actual API key
5. Update `RESEND_FROM_EMAIL` based on your setup (see Step 3)

### Option B: Via CLI
```bash
vercel env rm RESEND_API_KEY production
vercel env add RESEND_API_KEY production
# Paste your API key when prompted

vercel env rm RESEND_FROM_EMAIL production
vercel env add RESEND_FROM_EMAIL production
# Enter: TaskMan <onboarding@resend.dev> (for testing)
# Or: TaskMan <noreply@yourdomain.com> (for production with verified domain)
```

## Step 3: Choose Email Sender

### Option A: Use Resend Test Domain (Quick Setup - For Testing)
- **Email**: `TaskMan <onboarding@resend.dev>`
- **Pros**: Works immediately, no domain verification needed
- **Cons**: Limited to 100 emails/day, emails go to spam folder
- **Use for**: Development and testing

### Option B: Verify Your Domain (Production - Recommended)
1. Go to Resend Dashboard → **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `taskman.com`)
4. Add the DNS records Resend provides:
   - **SPF Record**: `v=spf1 include:resend.com ~all`
   - **DKIM Record**: (provided by Resend)
   - **DMARC Record**: (optional but recommended)
5. Wait for verification (usually 5-10 minutes)
6. Once verified, use: `TaskMan <noreply@yourdomain.com>`

## Step 4: Test Email Sending

### Test via Your Live Site
1. Visit your deployed site: https://radix-task-ten.vercel.app
2. Enter an email in the signup form
3. Submit the form
4. Check your email inbox (and spam folder)
5. You should receive a welcome email with coupon code

### Check Resend Dashboard
1. Go to Resend Dashboard → **Logs**
2. You'll see all email sending attempts
3. Check for any errors or issues

## Step 5: Monitor Email Delivery

### Resend Dashboard Features
- **Logs**: See all sent emails
- **Analytics**: Track delivery rates, opens, clicks
- **Webhooks**: Set up webhooks for bounce/complaint handling

## Current Configuration

### Email Template
- **Subject**: "🎉 Welcome to TaskMan! Your exclusive discount code inside"
- **Content**: HTML email with coupon code and "Get Started" button
- **Link**: Points to https://taskman.com

### Email Flow
1. User signs up with email
2. System assigns available coupon
3. Email is sent via Resend with coupon code
4. Email delivery is logged in database
5. User receives welcome email

## Troubleshooting

### Issue: "Missing env.RESEND_API_KEY"
**Solution**: Make sure `RESEND_API_KEY` is set in Vercel environment variables

### Issue: Emails not sending
**Solution**: 
- Check Resend dashboard logs for errors
- Verify API key is correct
- Check `RESEND_FROM_EMAIL` format: `Name <email@domain.com>`
- For test domain, use: `TaskMan <onboarding@resend.dev>`

### Issue: Emails going to spam
**Solution**:
- Verify your domain in Resend
- Set up SPF, DKIM, and DMARC records
- Use a verified domain instead of test domain

### Issue: "Domain not verified"
**Solution**:
- Complete domain verification in Resend dashboard
- Wait for DNS propagation (can take up to 48 hours)
- Use test domain `onboarding@resend.dev` for immediate testing

## Production Checklist

- [ ] Resend API key is set in Vercel
- [ ] Domain is verified in Resend (or using test domain)
- [ ] `RESEND_FROM_EMAIL` is correctly formatted
- [ ] Test email sending works
- [ ] Monitor Resend logs for any issues
- [ ] Set up webhooks for bounce handling (optional)

## Next Steps

1. ✅ Get Resend API key
2. ✅ Update environment variables in Vercel
3. ✅ Choose email sender (test domain or verified domain)
4. ✅ Test email sending on live site
5. ✅ Monitor email delivery in Resend dashboard
