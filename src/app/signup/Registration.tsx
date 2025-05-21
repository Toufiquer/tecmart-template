'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ContinuousSvgAnimation from './ContinuousSvgAnimationProps';
// import SignUpForm from './SignUpForm';
import GoogleAuthButton from '@/app/components/auth/GoogleAuthButton';

const RegistrationPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full">
      {/* Left Column - SVG/Art Section */}
      <motion.div
        className="w-full md:w-2/5 flex items-center justify-center border-r-1 border-slate-2--"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <ContinuousSvgAnimation />
      </motion.div>

      {/* Right Column - Sign-up Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Create an Account</h1>
            {/* <SignUpForm /> */}

            <GoogleAuthButton />
            {/* Sign In Link */}
            {/* <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </p>
            </div> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
