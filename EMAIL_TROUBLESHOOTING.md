# Email Sending Troubleshooting Guide

## Current Issue
Email sending is failing with message: "Signup successful! However, there was an issue sending your coupon email."

## Common Causes & Solutions

### 1. Check Resend API Key
**Issue**: Invalid or missing API key

**Solution**:
1. Go to https://resend.com/api-keys
2. Verify your API key is active
3. Check Vercel environment variables:
   ```bash
   vercel env ls | grep RESEND_API_KEY
   ```
4. If needed, update it:
   ```bash
   vercel env rm RESEND_API_KEY production
   vercel env add RESEND_API_KEY production
   ```

### 2. Check Email Format
**Issue**: Incorrect `from` email format

**Current format**: `TaskMan <onboarding@resend.dev>`

**Verify**:
- Format should be: `Name <email@domain.com>`
- For test domain: `TaskMan <onboarding@resend.dev>`
- No extra spaces or quotes

**Solution**: Check Vercel environment variable:
```bash
vercel env ls | grep RESEND_FROM_EMAIL
```

### 3. Check Resend Dashboard Logs
**Best way to see actual error**:

1. Go to https://resend.com/emails
2. Click on **Logs** tab
3. Look for failed email attempts
4. Check the error message - it will show the exact issue

### 4. Common Resend API Errors

#### "Invalid API Key"
- Solution: Regenerate API key in Resend dashboard

#### "Domain not verified"
- Solution: Use test domain `onboarding@resend.dev` or verify your domain

#### "Invalid from address"
- Solution: Check email format matches: `Name <email@domain.com>`

#### "Rate limit exceeded"
- Solution: Test domain has 100 emails/day limit. Wait or upgrade plan.

### 5. Check Vercel Logs
**View deployment logs**:

```bash
vercel logs https://radix-task-ten.vercel.app
```

Look for:
- `Email sending error:`
- `Email sending exception:`
- Any Resend API errors

### 6. Test Email Sending Directly

You can test the Resend API directly:

```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "TaskMan <onboarding@resend.dev>",
    "to": ["your-email@example.com"],
    "subject": "Test Email",
    "html": "<p>Test email content</p>"
  }'
```

## Quick Fixes to Try

### Fix 1: Verify Environment Variables
```bash
# Check current values
vercel env pull .env.vercel
cat .env.vercel | grep RESEND
```

### Fix 2: Update RESEND_FROM_EMAIL Format
Make sure it's exactly: `TaskMan <onboarding@resend.dev>`
- No quotes
- Space between name and email
- Email in angle brackets

### Fix 3: Check API Key Validity
1. Go to Resend dashboard
2. Check if API key is still active
3. Regenerate if needed
4. Update in Vercel

### Fix 4: Check Email Template
The HTML email template might have issues. Check:
- Valid HTML structure
- No special characters causing issues
- Template renders correctly

## Next Steps

1. ✅ Check Resend dashboard logs (most important!)
2. ✅ Verify API key is valid
3. ✅ Check email format in Vercel
4. ✅ View Vercel deployment logs
5. ✅ Test with a simple email first

## After Fixing

Once fixed, test again:
1. Visit https://redistask.shop
2. Enter your email
3. Submit form
4. Check inbox (and spam folder)
5. Verify in Resend logs that email was sent
