import { prisma } from '@/lib/db/client';

interface AvailableCoupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  description: string | null;
  validUntil: Date | null;
  maxUses: number | null;
  currentUses: number;
}

export async function findAvailableCoupon(): Promise<AvailableCoupon | null> {
  const now = new Date();

  try {
    // Find an active coupon that:
    // 1. Is active
    // 2. Hasn't expired (validUntil is null or in the future)
    // 3. Hasn't reached max uses (maxUses is null or currentUses < maxUses)
    // 4. Is valid from now or earlier
    const coupons = await prisma.coupon.findMany({
      where: {
        isActive: true,
        validFrom: {
          lte: now,
        },
        OR: [
          { validUntil: null },
          { validUntil: { gte: now } },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Filter out coupons that have reached max uses
    // (Prisma doesn't support dynamic field comparison in WHERE clause)
    const availableCoupon = coupons.find((coupon) => {
      if (coupon.maxUses === null) {
        return true; // No limit
      }
      return coupon.currentUses < coupon.maxUses;
    });

    if (!availableCoupon) {
      return null;
    }

    return {
      id: availableCoupon.id,
      code: availableCoupon.code,
      discountType: availableCoupon.discountType as 'percentage' | 'fixed',
      discountValue: Number(availableCoupon.discountValue),
      description: availableCoupon.description,
      validUntil: availableCoupon.validUntil,
      maxUses: availableCoupon.maxUses,
      currentUses: availableCoupon.currentUses,
    };
  } catch (error) {
    console.error('Error finding available coupon:', error);
    return null;
  }
}

export async function assignCouponToUser(
  email: string,
  couponId: string,
  couponCode: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if email already exists
    const existingSignup = await prisma.userSignup.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (existingSignup) {
      return { success: false, error: 'Email already registered' };
    }

    // Use transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
      // Create user signup record
      await tx.userSignup.create({
        data: {
          email: email.toLowerCase(),
          couponId: couponId,
          couponCode: couponCode,
        },
      });

      // Increment coupon usage count
      await tx.coupon.update({
        where: { id: couponId },
        data: {
          currentUses: {
            increment: 1,
          },
        },
      });
    });

    return { success: true };
  } catch (error) {
    console.error('Error assigning coupon:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to assign coupon',
    };
  }
}

export async function markEmailSent(
  email: string,
  success: boolean,
  error?: string
): Promise<void> {
  try {
    await prisma.userSignup.update({
      where: {
        email: email.toLowerCase(),
      },
      data: {
        emailSent: success,
        emailSentAt: success ? new Date() : null,
        emailError: error || null,
      },
    });
  } catch (error) {
    console.error('Error marking email sent:', error);
  }
}

export async function logEmail(
  userSignupId: string,
  email: string,
  status: 'sent' | 'failed' | 'bounced',
  errorMessage?: string,
  providerResponse?: unknown
): Promise<void> {
  try {
    await prisma.emailLog.create({
      data: {
        userSignupId,
        email,
        status,
        errorMessage,
        providerResponse: providerResponse ? (providerResponse as object) : undefined,
      },
    });
  } catch (error) {
    console.error('Error logging email:', error);
  }
}
