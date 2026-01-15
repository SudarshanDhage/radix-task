'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import toast from 'react-hot-toast';

interface SignupResponse {
  success: boolean;
  message?: string;
  error?: string;
  couponCode?: string | null;
}

export function useEmailForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: SignupResponse = await response.json();

      if (data.success) {
        toast.success(data.message || 'Signup successful! Check your email for your coupon code.');
        setEmail('');
        
        // If coupon code is provided, show it in a toast
        if (data.couponCode) {
          setTimeout(() => {
            toast.success(`Your coupon code: ${data.couponCode}`, {
              duration: 10000,
              icon: '🎉',
            });
          }, 1000);
        }
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Signup error:', error);
      }
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    isSubmitting,
    handleEmailChange,
    handleSubmit,
  };
}
