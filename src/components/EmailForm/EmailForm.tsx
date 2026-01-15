'use client';

import { useEmailForm } from '@/hooks/useEmailForm';
import styles from './EmailForm.module.css';

interface EmailFormProps {
  variant?: 'hero' | 'signup';
  className?: string;
}

export default function EmailForm({ variant = 'signup', className }: EmailFormProps) {
  const { email, isSubmitting, handleEmailChange, handleSubmit } = useEmailForm();

  const formClassName = [
    styles.ctaGroup,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <form 
      className={formClassName}
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        className={styles.emailInput}
        placeholder="Name@company.com"
        aria-label="Email address"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <button
        className={`${styles.tryForFreeButton} ${variant === 'hero' ? styles.buttonHero : styles.buttonSignup}`}
        type="submit"
        disabled={isSubmitting}
        aria-label="Try TaskMan for free"
      >
        <span className={styles.buttonText}>
          {isSubmitting ? 'Signing up...' : 'Try for free'}
        </span>
      </button>
    </form>
  );
}
