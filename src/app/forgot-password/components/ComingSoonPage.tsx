'use client';

import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

// Define component props interface
interface ComingSoonPageProps {
  /**
   * The main headline text
   */
  headline?: string;
  /**
   * The teaser text that appears below the headline
   */
  teaserText?: string;
  /**
   * The target launch date in ISO format
   */
  launchDate?: string;
  /**
   * Social media links
   */
  socialLinks?: {
    platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'github';
    url: string;
  }[];
  /**
   * List of features to expect
   */
  featuresTeaser?: string[];
  /**
   * The background gradient start color
   */
  gradientStart?: string;
  /**
   * The background gradient end color
   */
  gradientEnd?: string;
}

/**
 * A responsive "Coming Soon" page component with animations and user engagement features
 */
const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  headline = 'Something Awesome is Brewing',
  teaserText = 'Our revolutionary new platform is launching soon. Get ready!',
  launchDate,
  socialLinks = [],
  gradientStart = '#4F46E5',
  gradientEnd = '#7C3AED',
}) => {
  // State for email subscription form
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // State for countdown timer
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Calculate time remaining if launch date is provided
  useEffect(() => {
    if (!launchDate) return;

    const timer = setInterval(() => {
      const now = new Date();
      const launch = new Date(launchDate);
      const diff = launch.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  // Function to handle email submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      setErrorMessage('');

      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock API call - replace with actual implementation
      // await handleSubscriptionSubmit(email);

      setSubmitStatus('success');
      setEmail('');
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to subscribe. Please try again later.');
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Helper function to get social media icon
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'github':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            `linear-gradient(120deg, ${gradientStart}, ${gradientEnd})`,
            `linear-gradient(240deg, ${gradientStart}, ${gradientEnd})`,
            `linear-gradient(360deg, ${gradientStart}, ${gradientEnd})`,
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Content container */}
      <motion.div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16" variants={containerVariants} initial="hidden" animate="visible">
        {/* Headline */}
        <motion.h1 className="text-4xl sm:text-5xl md:text-6xl text-center font-extrabold text-white mb-4 sm:mb-6" variants={itemVariants}>
          {headline}
        </motion.h1>

        {/* Teaser text */}
        <motion.p className="text-xl sm:text-2xl text-center font-medium text-white/80 mb-8 sm:mb-12" variants={itemVariants}>
          {teaserText}
        </motion.p>

        {/* Countdown timer */}
        {launchDate && (
          <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12" variants={itemVariants}>
            <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <span className="text-3xl sm:text-4xl font-bold text-white">{timeRemaining.days}</span>
              <span className="text-sm text-white/80">Days</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <span className="text-3xl sm:text-4xl font-bold text-white">{timeRemaining.hours}</span>
              <span className="text-sm text-white/80">Hours</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <span className="text-3xl sm:text-4xl font-bold text-white">{timeRemaining.minutes}</span>
              <span className="text-sm text-white/80">Minutes</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <span className="text-3xl sm:text-4xl font-bold text-white">{timeRemaining.seconds}</span>
              <span className="text-sm text-white/80">Seconds</span>
            </div>
          </motion.div>
        )}

        {/* Subscription form */}
        <motion.div className="w-full max-w-md mx-auto mb-12" variants={itemVariants}>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="flex-grow">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isSubmitting}
                aria-label="Email address"
              />
              {submitStatus === 'error' && <p className="mt-1 text-sm text-red-200">{errorMessage}</p>}
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 cursor-pointer bg-white text-indigo-700 font-medium rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Subscribing...' : 'Notify Me'}
            </motion.button>
          </form>
          {submitStatus === 'success' && (
            <motion.p className="mt-2 text-center text-green-200" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              Thanks for subscribing! We`&apos`ll keep you updated.
            </motion.p>
          )}
        </motion.div>

        {/* Go Home button */}
        <motion.div className="w-full flex justify-center mb-8" variants={itemVariants}>
          <motion.button
            type="submit"
            onClick={() => (window.location.href = '/')}
            disabled={isSubmitting}
            className="w-[200px] px-6 py-3 cursor-pointer bg-white text-indigo-700 font-medium rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Go Home
          </motion.button>
        </motion.div>

        {/* Social links */}
        {socialLinks.length > 0 && (
          <motion.div className="flex justify-center space-x-6" variants={itemVariants}>
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Follow us on ${link.platform}`}
              >
                {getSocialIcon(link.platform)}
              </motion.a>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Footer */}
      <motion.div className="relative z-10 w-full py-4 mt-auto text-center text-white/60 text-sm" variants={itemVariants}>
        &copy; {new Date().getFullYear()} | All Rights Reserved
      </motion.div>
    </div>
  );
};

export default ComingSoonPage;
