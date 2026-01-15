import { z } from 'zod';

export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .toLowerCase()
  .trim();

export function validateEmail(email: string): { valid: boolean; error?: string } {
  try {
    emailSchema.parse(email);
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return { valid: false, error: firstError?.message || 'Invalid email address' };
    }
    return { valid: false, error: 'Invalid email address' };
  }
}
