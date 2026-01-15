# Domain Verification Guide for Resend

## Why You're Getting This Error

When using Resend's test domain (`onboarding@resend.dev`), you can **only send emails to your own verified email address** (sudarshandhage2017@gmail.com).

To send emails to **any recipient**, you must:
1. Verify your domain `redistask.shop` in Resend
2. Update the `from` email to use your verified domain

## Step-by-Step: Verify Your Domain in Resend

### Step 1: Add Domain in Resend

1. Go to https://resend.com/domains
2. Click **"Add Domain"** button
3. Enter your domain: `redistask.shop`
4. Click **"Add"**

### Step 2: Add DNS Records

Resend will show you DNS records to add. You need to add these to your domain's DNS settings:

#### Required Records:

1. **SPF Record** (Type: TXT)
   - Name: `@` or `redistask.shop`
   - Value: `v=spf1 include:resend.com ~all`
   - TTL: 3600 (or default)

2. **DKIM Record** (Type: TXT)
   - Name: `resend._domainkey` (or similar, Resend will provide exact name)
   - Value: (Resend will provide this - it's a long string)
   - TTL: 3600 (or default)

3. **DMARC Record** (Type: TXT) - Optional but recommended
   - Name: `_dmarc`
   - Value: `v=DMARC1; p=none; rua=mailto:dmarc@redistask.shop`
   - TTL: 3600 (or default)

### Step 3: Where to Add DNS Records

**If your domain is managed by:**
- **Vercel**: Go to Vercel Dashboard → Your Project → Settings → Domains → `redistask.shop` → DNS Records
- **Namecheap**: Go to Namecheap Dashboard → Domain List → `redistask.shop` → Advanced DNS
- **GoDaddy**: Go to GoDaddy Dashboard → My Products → DNS
- **Cloudflare**: Go to Cloudflare Dashboard → Select domain → DNS → Records

### Step 4: Wait for Verification

1. After adding DNS records, go back to Resend dashboard
2. Click **"Verify"** or wait for automatic verification
3. Verification usually takes 5-10 minutes, but can take up to 48 hours
4. Status will change from "Pending" to "Verified" ✅

### Step 5: Update Vercel Environment Variable

Once verified, update the `RESEND_FROM_EMAIL` in Vercel:

**Via Vercel Dashboard:**
1. Go to https://vercel.com/dashboard
2. Select project: `radix-task`
3. Go to **Settings** → **Environment Variables**
4. Find `RESEND_FROM_EMAIL`
5. Click **Edit**
6. Change to: `TaskMan <noreply@redistask.shop>`
7. Save

**Via CLI:**
```bash
vercel env rm RESEND_FROM_EMAIL production
vercel env add RESEND_FROM_EMAIL production
# Enter: TaskMan <noreply@redistask.shop>
```

### Step 6: Redeploy

After updating the environment variable, trigger a new deployment:

```bash
vercel --prod
```

Or it will auto-deploy on next git push.

## Current Status

- ❌ Using test domain: `TaskMan <onboarding@resend.dev>`
- ❌ Can only send to: sudarshandhage2017@gmail.com
- ✅ Need to verify: `redistask.shop`
- ✅ Then use: `TaskMan <noreply@redistask.shop>`

## After Verification

Once your domain is verified:
- ✅ Can send to **any email address**
- ✅ Better deliverability (won't go to spam)
- ✅ Professional email address
- ✅ No daily limit restrictions

## Troubleshooting

### DNS Records Not Working
- Wait 5-10 minutes after adding (DNS propagation takes time)
- Verify records are added correctly (check spelling, no extra spaces)
- Use DNS checker tools to verify records are live

### Domain Not Verifying
- Double-check DNS records match exactly what Resend shows
- Ensure TTL is set (don't leave blank)
- Wait up to 48 hours for full propagation
- Contact Resend support if still not working after 48 hours

### Still Getting Error After Verification
- Make sure you updated `RESEND_FROM_EMAIL` in Vercel
- Redeploy the application
- Check Resend dashboard shows domain as "Verified"

## Quick Checklist

- [ ] Domain `redistask.shop` added in Resend
- [ ] SPF record added to DNS
- [ ] DKIM record added to DNS
- [ ] DMARC record added (optional)
- [ ] Domain verified in Resend dashboard
- [ ] `RESEND_FROM_EMAIL` updated in Vercel to `TaskMan <noreply@redistask.shop>`
- [ ] Application redeployed
- [ ] Test email sending works
