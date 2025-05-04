import React from 'react';
import SignInPage from './SignInUI';
import AuthChecker from '../components/AuthChecker';

const Page: React.FC = () => {
  return (
    <div className="w-full">
      <AuthChecker />
      <SignInPage />
    </div>
  );
};

export default Page;
