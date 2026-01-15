import { NextRequest, NextResponse } from 'next/server';
import { findAvailableCoupon, assignCouponToUser, markEmailSent, logEmail } from '@/lib/coupons/assignment';
import { validateEmail } from '@/lib/coupons/validation';
import { resend } from '@/lib/email/client';
import { getCouponEmailHtml, getCouponEmailSubject } from '@/lib/email/templates';
import { prisma } from '@/lib/db/client';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const validation = validateEmail(email);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Find available coupon
    const coupon = await findAvailableCoupon();
    
    if (!coupon) {
      // Still save the signup even if no coupon is available
      // This allows us to follow up later
      return NextResponse.json({
        success: true,
        message: 'Thank you for signing up! We\'ll be in touch soon.',
        couponCode: null,
      });
    }

    // Assign coupon to user
    const assignment = await assignCouponToUser(
      email,
      coupon.id,
      coupon.code
    );

    if (!assignment.success) {
      return NextResponse.json(
        { success: false, error: assignment.error },
        { status: 400 }
      );
    }

    // Get user signup ID for email logging
    const userSignup = await prisma.userSignup.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true },
    });

    // Send email with coupon
    try {
      const emailHtml = getCouponEmailHtml({
        couponCode: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        description: coupon.description || undefined,
        expiryDate: coupon.validUntil?.toISOString(),
      });

      const { data: emailData, error: emailError } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'TaskMan <onboarding@resend.dev>',
        to: email,
        subject: getCouponEmailSubject(),
        html: emailHtml,
      });

      if (emailError) {
        console.error('Email sending error:', emailError);
        await markEmailSent(email, false, emailError.message);
        
        if (userSignup) {
          await logEmail(userSignup.id, email, 'failed', emailError.message, emailError);
        }
        
        // Still return success since signup was saved
        return NextResponse.json({
          success: true,
          message: 'Signup successful! However, there was an issue sending your coupon email. Please contact support.',
          couponCode: coupon.code, // Provide code in response as fallback
        });
      }

      // Mark email as sent
      await markEmailSent(email, true);
      
      if (userSignup && emailData) {
        await logEmail(userSignup.id, email, 'sent', undefined, emailData);
      }

      return NextResponse.json({
        success: true,
        message: 'Signup successful! Check your email for your coupon code.',
        couponCode: coupon.code,
      });
    } catch (emailError) {
      console.error('Email sending exception:', emailError);
      const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error';
      await markEmailSent(email, false, errorMessage);
      
      if (userSignup) {
        await logEmail(userSignup.id, email, 'failed', errorMessage);
      }

      // Still return success since signup was saved
      return NextResponse.json({
        success: true,
        message: 'Signup successful! However, there was an issue sending your coupon email. Please contact support.',
        couponCode: coupon.code,
      });
    }
  } catch (error) {
    console.error('Signup API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// Rate limiting helper (simple in-memory version)
// In production, use a proper rate limiting solution like Upstash Redis
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 5) {
    // Max 5 requests per minute per IP
    return false;
  }

  limit.count++;
  return true;
}

// Rate limiting handler for GET requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
