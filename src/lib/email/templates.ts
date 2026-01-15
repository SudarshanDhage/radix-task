interface CouponEmailData {
  couponCode: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  description?: string;
  expiryDate?: string;
}

export function getCouponEmailHtml(data: CouponEmailData): string {
  const discountText = 
    data.discountType === 'percentage' 
      ? `${data.discountValue}% off`
      : `$${data.discountValue} off`;

  const description = data.description || discountText;
  const expiryText = data.expiryDate 
    ? `This coupon expires on ${new Date(data.expiryDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}.`
    : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; line-height: 1.6; color: #1E1C24; background-color: #f5f5f5; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #0634FF; font-size: 28px; margin: 0 0 10px 0;">Welcome to TaskMan!</h1>
      <p style="color: #666; font-size: 16px; margin: 0;">Thank you for signing up!</p>
    </div>
    
    <p style="color: #1E1C24; font-size: 16px; margin-bottom: 30px;">
      We're excited to have you join our community. As a welcome gift, here's your exclusive discount code:
    </p>
    
    <div style="background: #f8f9fa; border: 2px dashed #0634FF; border-radius: 12px; padding: 30px 20px; text-align: center; margin: 30px 0;">
      <p style="margin: 0 0 10px 0; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Your Coupon Code</p>
      <h2 style="color: #0634FF; font-size: 36px; margin: 15px 0; letter-spacing: 4px; font-weight: 700;">${data.couponCode}</h2>
      <p style="margin: 10px 0 0 0; font-size: 16px; color: #1E1C24; font-weight: 600;">${description}</p>
    </div>
    
    <div style="text-align: center; margin: 40px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'https://taskman.com'}" 
         style="background: #0634FF; color: #FFFFFF; padding: 14px 32px; text-decoration: none; border-radius: 100px; display: inline-block; font-weight: 500; font-size: 16px;">
        Get Started Now
      </a>
    </div>
    
    ${expiryText ? `<p style="font-size: 12px; color: #999; margin-top: 40px; text-align: center;">${expiryText}</p>` : ''}
    
    <hr style="border: none; border-top: 1px solid #EBEBEB; margin: 40px 0;">
    
    <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
      If you have any questions, feel free to reach out to our support team.
    </p>
  </div>
</body>
</html>
  `.trim();
}

export function getCouponEmailSubject(): string {
  return '🎉 Welcome to TaskMan! Your exclusive discount code inside';
}
